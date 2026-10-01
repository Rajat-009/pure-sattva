import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Package,
  Mail,
  SlidersHorizontal,
  Download,
  Phone,
  MessageCircle,
  Printer,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Order, OrderStatus, Product } from '../types';
import { STORE_DETAILS } from '../data/products';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductStock: (productId: string, inStock: boolean) => void;
  onViewBill: (order: Order) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductStock,
  onViewBill,
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identifier, setIdentifier] = useState('brajat707@gmail.com');
  const [password, setPassword] = useState('sattva2026');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'emails' | 'stock'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');

  // Load orders and emails
  const loadData = async () => {
    try {
      const ordersRes = await fetch('/api/orders');
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data.orders || []);
      } else {
        const localOrders = JSON.parse(localStorage.getItem('pure_sattva_orders') || '[]');
        setOrders(localOrders);
      }

      const emailsRes = await fetch('/api/notifications');
      if (emailsRes.ok) {
        const emailData = await emailsRes.json();
        setEmailLogs(emailData.emails || []);
      }
    } catch {
      const localOrders = JSON.parse(localStorage.getItem('pure_sattva_orders') || '[]');
      setOrders(localOrders);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone: identifier.trim(), password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        // Fallback check
        if (
          (identifier.trim() === 'brajat707@gmail.com' ||
            identifier.trim() === '8059048843') &&
          password === 'sattva2026'
        ) {
          setIsAuthenticated(true);
        } else {
          setLoginError('Invalid credentials. Password set for your email is sattva2026');
        }
      }
    } catch {
      if (
        (identifier.trim() === 'brajat707@gmail.com' ||
          identifier.trim() === '8059048843') &&
        password === 'sattva2026'
      ) {
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid credentials. Password is sattva2026');
      }
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: statusUpdateNote || `Status changed to ${newStatus} by store owner.`,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    // Update local state and storage
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          history: [
            {
              status: newStatus,
              time: new Date().toISOString(),
              note: statusUpdateNote || `Status changed to ${newStatus} by owner.`,
            },
            ...o.history,
          ],
        };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem('pure_sattva_orders', JSON.stringify(updated));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(updated.find((o) => o.id === orderId) || null);
    }
    setStatusUpdateNote('');
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      'Order ID',
      'Date',
      'Status',
      'Customer Name',
      'Customer Phone',
      'Address',
      'City',
      'PIN',
      'Total Amount (COD)',
      'Items',
    ];

    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString('en-IN'),
      o.status,
      `"${o.customerName}"`,
      o.customerPhone,
      `"${o.deliveryAddress}"`,
      o.city,
      o.pincode,
      o.totalAmount,
      `"${o.items.map((it) => `${it.productName} (${it.size}) x${it.quantity}`).join('; ')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pure_sattva_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingCount = orders.filter(
    (o) => o.status === 'Received' || o.status === 'Preparing' || o.status === 'Out for Delivery'
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E0D4C3] my-4 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#3B2212] text-white border-b border-[#523A28]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#E5A93C]" />
            <div>
              <h2 className="font-display text-lg font-bold">
                Pure Sattva · Store Owner Admin Portal
              </h2>
              <p className="text-xs text-[#EAD8C7]">
                Live Orders, Customer Details & Owner Email Alerts (Sirsa, Haryana)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <span className="hidden sm:inline text-xs font-mono text-[#D4A373] bg-[#2C180E] px-2.5 py-1 rounded">
                Owner: brajat707@gmail.com
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#EAD8C7] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Login Form */
          <div className="p-8 max-w-md mx-auto my-8 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-display text-xl font-bold text-[#3B2212]">
                Store Owner Sign In
              </h3>
              <p className="text-xs text-[#7A6150]">
                Access incoming orders, customer contacts & dispatch controls
              </p>
            </div>

            {/* Hint Banner with user credentials as requested */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DEC8] text-xs space-y-1 text-[#5C4535]">
              <span className="font-bold text-[#3B2212] block">
                Pre-configured Store Owner Credentials:
              </span>
              <div>
                <strong>Email:</strong> brajat707@gmail.com
              </div>
              <div>
                <strong>Phone:</strong> 8059048843
              </div>
              <div>
                <strong>Password:</strong> sattva2026
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                  Registered Email or Phone
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                  Owner Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs font-mono text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-xl transition-all shadow-md cursor-pointer"
              >
                Log Into Store Owner Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs & Metrics Bar */}
            <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#EAE0D5] flex flex-wrap items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'bg-[#3B2212] text-white'
                      : 'bg-[#F2ECE3] text-[#5C4535] hover:text-[#3B2212]'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Orders ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('emails')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'emails'
                      ? 'bg-[#3B2212] text-white'
                      : 'bg-[#F2ECE3] text-[#5C4535] hover:text-[#3B2212]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Sent Email Alerts ({emailLogs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('stock')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'stock'
                      ? 'bg-[#3B2212] text-white'
                      : 'bg-[#F2ECE3] text-[#5C4535] hover:text-[#3B2212]'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Stock & Products ({products.length})</span>
                </button>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-3 text-xs">
                <div className="px-3 py-1 rounded bg-white border border-[#D9C4B0] font-mono">
                  <span className="text-[#7A6150]">COD Total: </span>
                  <strong className="text-[#2E7D32]">₹{totalRevenue}</strong>
                </div>
                <div className="px-3 py-1 rounded bg-white border border-[#D9C4B0] font-mono">
                  <span className="text-[#7A6150]">Pending Dispatch: </span>
                  <strong className="text-[#A06228]">{pendingCount}</strong>
                </div>
                <button
                  onClick={exportOrdersCSV}
                  className="px-3 py-1 bg-[#FAF4ED] hover:bg-[#EFE5D8] border border-[#D9C4B0] rounded text-xs font-semibold text-[#3B2212] flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Orders View */}
            {activeTab === 'orders' && (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Orders List Column */}
                <div className="w-full md:w-7/12 border-r border-[#EAE0D5] flex flex-col overflow-hidden">
                  {/* Search and Filters */}
                  <div className="p-3 border-b border-[#EAE0D5] bg-[#FAF8F5] flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search order ID, customer name, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs font-medium bg-white border border-[#D9C9B8] rounded-lg py-1.5 pl-8 pr-2 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-xs bg-white border border-[#D9C9B8] rounded-lg px-2 py-1.5 font-semibold text-[#3B2212]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Received">Received</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Order Table / List */}
                  <div className="flex-1 overflow-y-auto divide-y divide-[#EFE7DE]">
                    {filteredOrders.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[#7A6150]">
                        No orders found. Once a customer places an order, it will appear here in real time.
                      </div>
                    ) : (
                      filteredOrders.map((o) => (
                        <div
                          key={o.id}
                          onClick={() => setSelectedOrder(o)}
                          className={`p-4 transition-colors cursor-pointer hover:bg-[#FAF7F2] ${
                            selectedOrder?.id === o.id ? 'bg-[#FAF4ED] border-l-4 border-[#3B2212]' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-mono font-bold text-[#3B2212]">
                              #{o.id}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                o.status === 'Delivered'
                                  ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                  : o.status === 'Out for Delivery'
                                  ? 'bg-[#FFF8E1] text-[#A06228]'
                                  : o.status === 'Preparing'
                                  ? 'bg-[#E1F5FE] text-[#0277BD]'
                                  : 'bg-[#F2ECE3] text-[#5C4535]'
                              }`}
                            >
                              {o.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#2C1810]">
                              {o.customerName}
                            </span>
                            <span className="font-mono font-bold text-[#2E7D32] tabular-nums">
                              ₹{o.totalAmount} (COD)
                            </span>
                          </div>

                          <div className="text-[11px] text-[#7A6150] flex items-center justify-between mt-1">
                            <span>Phone: {o.customerPhone}</span>
                            <span>
                              {new Date(o.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Selected Order Detail Pane */}
                <div className="w-full md:w-5/12 p-5 overflow-y-auto bg-white flex flex-col justify-between">
                  {selectedOrder ? (
                    <div className="space-y-4">
                      {/* Top Action Row */}
                      <div className="flex items-center justify-between border-b border-[#EAE0D5] pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#3B2212]">
                            Order Details: #{selectedOrder.id}
                          </span>
                          <p className="text-[11px] text-[#7A6150]">
                            {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>

                        <button
                          onClick={() => onViewBill(selectedOrder)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#3B2212] bg-[#F2ECE3] hover:bg-[#E8DCCF] border border-[#D9C4B0] rounded-md flex items-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3 h-3" />
                          <span>View E-Bill</span>
                        </button>
                      </div>

                      {/* Customer Contact Card */}
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE1D5] text-xs space-y-1">
                        <span className="font-bold text-[#3B2212] uppercase text-[10px] block">
                          Customer & Delivery Info
                        </span>
                        <p className="font-semibold text-sm text-[#2C1810]">
                          {selectedOrder.customerName}
                        </p>
                        <p className="text-[#5C4535]">
                          Phone: <strong>{selectedOrder.customerPhone}</strong>
                        </p>
                        <p className="text-[#5C4535] leading-relaxed">
                          Address: {selectedOrder.deliveryAddress}
                        </p>
                        <p className="text-[#8B5A2B] font-medium">
                          Method: {selectedOrder.deliveryType}
                        </p>
                        {selectedOrder.specialInstructions && (
                          <p className="text-amber-800 text-[11px] italic">
                            Note: "{selectedOrder.specialInstructions}"
                          </p>
                        )}

                        {/* Quick Contact Buttons for Owner */}
                        <div className="flex gap-2 pt-2">
                          <a
                            href={`tel:${selectedOrder.customerPhone}`}
                            className="px-2.5 py-1 text-xs font-medium text-[#3B2212] bg-white border border-[#D9C4B0] rounded-lg flex items-center gap-1 hover:bg-[#F2ECE3]"
                          >
                            <Phone className="w-3 h-3 text-[#8B5A2B]" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`https://wa.me/91${selectedOrder.customerPhone}?text=${encodeURIComponent(
                              `Hello ${selectedOrder.customerName}, this is Pure Sattva Store Sirsa regarding your Order #${selectedOrder.id}. We are preparing your fresh wood-pressed items for delivery.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 text-xs font-medium text-[#2E7D32] bg-[#E8F5E9] border border-[#C5E1A5] rounded-lg flex items-center gap-1 hover:bg-[#DCF0DE]"
                          >
                            <MessageCircle className="w-3 h-3 text-[#2E7D32]" />
                            <span>WhatsApp Customer</span>
                          </a>
                        </div>
                      </div>

                      {/* Change Order Status Dropdown */}
                      <div className="p-3 bg-[#FAF4ED] rounded-xl border border-[#E8DEC8] text-xs space-y-2">
                        <span className="font-bold text-[#3B2212] block">
                          Update Order Status:
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                          {(['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'] as OrderStatus[]).map(
                            (st) => (
                              <button
                                key={st}
                                onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                                  selectedOrder.status === st
                                    ? 'bg-[#3B2212] text-white shadow-xs'
                                    : 'bg-white border border-[#D9C9B8] text-[#5C4535] hover:border-[#3B2212]'
                                }`}
                              >
                                {st}
                              </button>
                            )
                          )}
                        </div>

                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="Add tracking note (e.g. Rider dispatched on Barnala Rd)..."
                            value={statusUpdateNote}
                            onChange={(e) => setStatusUpdateNote(e.target.value)}
                            className="w-full text-xs bg-white border border-[#D9C9B8] rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                          />
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-1.5 text-xs">
                        <span className="font-bold text-[#3B2212] block">
                          Ordered Items:
                        </span>
                        <div className="space-y-1 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE1D5]">
                          {selectedOrder.items.map((it, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center py-1 text-xs border-b border-[#EFE7DE] last:border-none"
                            >
                              <span className="font-medium text-[#2C1810]">
                                {it.productName} ({it.size}) × {it.quantity}
                              </span>
                              <span className="font-mono font-bold text-[#3B2212]">
                                ₹{it.price * it.quantity}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between items-center pt-2 font-bold text-sm text-[#3B2212]">
                            <span>Total Cash to Collect:</span>
                            <span className="font-mono text-base text-[#2E7D32]">
                              ₹{selectedOrder.totalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-xs text-[#7A6150] space-y-2">
                      <Package className="w-10 h-10 text-[#C4B5A5]" />
                      <p>Select any order from the left to view customer contact, print bill, and change delivery status.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Owner Email Dispatches Log */}
            {activeTab === 'emails' && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#3B2212]">
                      Automated Order Emails Sent to brajat707@gmail.com
                    </h3>
                    <p className="text-xs text-[#7A6150]">
                      Every time an order is placed on the website, an email payload is dispatched to the store owner
                    </p>
                  </div>
                  <button
                    onClick={loadData}
                    className="px-3 py-1.5 text-xs font-semibold text-[#3B2212] bg-[#F2ECE3] hover:bg-[#E8DCCF] border border-[#D9C4B0] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Refresh Logs</span>
                  </button>
                </div>

                {emailLogs.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#7A6150] bg-[#FAF8F5] rounded-xl border border-[#EAE0D5]">
                    No email dispatches recorded yet. Place a test order to see the full email notification payload!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {emailLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE1D5] text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#3B2212] font-mono">
                            To: {log.to}
                          </span>
                          <span className="text-[11px] text-[#7A6150]">
                            {new Date(log.timestamp).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="font-semibold text-sm text-[#2C1810]">
                          {log.subject}
                        </div>
                        <pre className="p-3 bg-white rounded-lg border border-[#E8DEC8] font-mono text-[11px] text-[#4A3222] whitespace-pre-wrap overflow-x-auto">
                          {log.body}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Stock & Product Controls */}
            {activeTab === 'stock' && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <h3 className="font-display text-base font-bold text-[#3B2212]">
                    Product Catalog & Stock Availability
                  </h3>
                  <p className="text-xs text-[#7A6150]">
                    Toggle in-stock status or review current pricing for all Pure Sattva items
                  </p>
                </div>

                <div className="overflow-x-auto border border-[#EAE0D5] rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#EAE0D5] text-[#3B2212]">
                        <th className="py-2.5 px-4 font-bold">Product</th>
                        <th className="py-2.5 px-4 font-bold">Category</th>
                        <th className="py-2.5 px-4 font-bold">Sizes & Rates</th>
                        <th className="py-2.5 px-4 font-bold text-center">Stock Status</th>
                        <th className="py-2.5 px-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE7DE] text-[#2C1810]">
                      {products.map((p) => {
                        const inStock = p.variants.some((v) => v.inStock);
                        return (
                          <tr key={p.id} className="hover:bg-[#FAF7F2]">
                            <td className="py-3 px-4">
                              <span className="font-bold text-[#3B2212] block">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-[#7A6150]">
                                {p.hindiName}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#7A6150]">{p.category}</td>
                            <td className="py-3 px-4 font-mono text-[11px]">
                              {p.variants.map((v) => `${v.size}: ₹${v.price}`).join(' | ')}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  inStock
                                    ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                    : 'bg-[#FFEBEE] text-[#C62828]'
                                }`}
                              >
                                {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => onUpdateProductStock(p.id, !inStock)}
                                className="px-2.5 py-1 text-xs font-semibold rounded bg-[#F2ECE3] hover:bg-[#E8DCCF] border border-[#D9C4B0] text-[#3B2212] cursor-pointer"
                              >
                                Toggle {inStock ? 'Out of Stock' : 'In Stock'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
