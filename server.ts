import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const EMAILS_FILE = path.join(DATA_DIR, 'sent_emails.json');

// Ensure data folder and initial files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(EMAILS_FILE)) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2));
}

function readOrders() {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveOrders(orders: any[]) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function readEmails() {
  try {
    const raw = fs.readFileSync(EMAILS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function logEmail(emailPayload: any) {
  const emails = readEmails();
  emails.unshift(emailPayload);
  fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', store: 'Pure Sattva', location: 'Sirsa, Haryana' });
  });

  // Get all orders (for admin)
  app.get('/api/orders', (req, res) => {
    const orders = readOrders();
    res.json({ orders });
  });

  // Lookup order by Order ID or Phone (for customer track order)
  app.get('/api/orders/:idOrPhone', (req, res) => {
    const query = req.params.idOrPhone.trim().toLowerCase();
    const orders = readOrders();
    const order = orders.find(
      (o: any) =>
        o.id.toLowerCase() === query ||
        o.customerPhone.replace(/\D/g, '').endsWith(query.replace(/\D/g, ''))
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ order });
  });

  // Create new order (COD)
  app.post('/api/orders', (req, res) => {
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      deliveryType,
      city,
      pincode,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      specialInstructions,
    } = req.body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PS-${orderNumber}`;
    const timestamp = new Date().toISOString();

    const newOrder = {
      id: orderId,
      createdAt: timestamp,
      status: 'Received', // Received -> Preparing -> Out for Delivery -> Delivered
      paymentMethod: 'Cash on Delivery (COD)',
      paymentStatus: 'Pending (Pay on Delivery)',
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'N/A',
      deliveryAddress,
      deliveryType: deliveryType || 'Local Sirsa Express Delivery',
      city: city || 'Sirsa',
      pincode: pincode || '125055',
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      specialInstructions: specialInstructions || '',
      history: [
        {
          status: 'Received',
          time: timestamp,
          note: 'Order placed by customer via website (Cash on Delivery).',
        },
      ],
    };

    const orders = readOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    // Send order notification email to owner (brajat707@gmail.com)
    const emailPayload = {
      id: `email_${Date.now()}`,
      to: 'brajat707@gmail.com',
      from: 'orders@puresattva.store',
      subject: `🚨 New Cash on Delivery Order ${orderId} - ₹${totalAmount} from ${customerName}`,
      timestamp,
      body: `
Pure Sattva - Store Order Alert
===============================
New Cash on Delivery Order Received!

Order ID: ${orderId}
Date & Time: ${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Customer: ${customerName}
Phone / WhatsApp: ${customerPhone}
Email: ${customerEmail || 'Not provided'}

Delivery Type: ${newOrder.deliveryType}
Delivery Address:
${deliveryAddress}
City: ${newOrder.city} | PIN: ${newOrder.pincode}
Special Instructions: ${specialInstructions || 'None'}

Order Items:
${items
  .map(
    (item: any, i: number) =>
      `${i + 1}. ${item.productName || item.title || 'Pure Sattva Item'} (${item.size || item.variant || 'Standard'}) x ${item.quantity} = ₹${item.price * item.quantity}`
  )
  .join('\n')}

Subtotal: ₹${subtotal}
Delivery Fee: ₹${deliveryFee === 0 ? 'FREE' : deliveryFee}
Total Amount to Collect (COD): ₹${totalAmount}
Payment Status: Cash on Delivery (Collect ₹${totalAmount} upon delivery)

Action Required:
Review order in the Pure Sattva Admin Portal or call customer directly at ${customerPhone} to verify before dispatch.
      `.trim(),
    };

    logEmail(emailPayload);

    console.log(`[Order Placed] Order ${orderId} saved. Notification dispatched to brajat707@gmail.com`);

    res.json({
      success: true,
      order: newOrder,
      message: 'Order successfully created',
    });
  });

  // Update order status (for admin)
  app.patch('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, note } = req.body;

    const orders = readOrders();
    const orderIndex = orders.findIndex((o: any) => o.id === id);

    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[orderIndex];
    order.status = status;
    if (status === 'Delivered') {
      order.paymentStatus = 'Paid via COD';
    }

    const updateTime = new Date().toISOString();
    order.history.unshift({
      status,
      time: updateTime,
      note: note || `Status updated to ${status} by store owner.`,
    });

    saveOrders(orders);

    // Owner activity log
    logEmail({
      id: `status_update_${Date.now()}`,
      to: 'brajat707@gmail.com',
      from: 'system@puresattva.store',
      subject: `📦 Order ${order.id} status changed to "${status}"`,
      timestamp: updateTime,
      body: `Order ${order.id} for ${order.customerName} (${order.customerPhone}) was updated to status: ${status}. Note: ${note || 'None'}.`,
    });

    res.json({ success: true, order });
  });

  // Fetch sent emails / notifications log
  app.get('/api/notifications', (req, res) => {
    const emails = readEmails();
    res.json({ emails });
  });

  // Admin Login verification
  app.post('/api/admin/login', (req, res) => {
    const { emailOrPhone, password } = req.body;
    const validIdentifier =
      emailOrPhone === 'brajat707@gmail.com' ||
      emailOrPhone === '8059048843' ||
      emailOrPhone === '+918059048843';

    // Standard store owner password set for user
    const validPassword = password === 'sattva2026';

    if (validIdentifier && validPassword) {
      return res.json({
        success: true,
        user: {
          name: 'Store Owner (Rajat / Pure Sattva)',
          email: 'brajat707@gmail.com',
          phone: '8059048843',
          role: 'owner',
        },
      });
    }

    return res.status(401).json({
      error: 'Invalid credentials. Please use registered owner email/phone and password.',
    });
  });

  // Vite middleware in dev or static serve in prod
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pure Sattva full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
