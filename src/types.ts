export type Category = 
  | 'All'
  | 'Wood-Pressed Oils'
  | 'Desi Ghee & Honey'
  | 'Organic Grains & Flours'
  | 'Natural Sweeteners'
  | 'Hand-Ground Spices'
  | 'Healthy Snacks';

export interface ProductVariant {
  size: string; // e.g., '500ml', '1000ml', '1 Kg'
  price: number;
  mrp: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: Category;
  description: string;
  shortTag: string; // e.g. "100% Wood-Pressed", "Zero Chemicals"
  extractionMethod?: string;
  benefits: string[];
  variants: ProductVariant[];
  selectedVariantIndex?: number;
  featured?: boolean;
  imageAccent: string; // CSS color / gradient for authentic packaging look
  tags: string[];
  nutritionalInfo?: Record<string, string>;
  videoCaption?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  hindiName?: string;
  size: string;
  price: number;
  mrp: number;
  quantity: number;
  category: Category;
  imageAccent: string;
}

export type OrderStatus = 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderHistoryItem {
  status: OrderStatus;
  time: string;
  note: string;
}

export interface Order {
  id: string; // e.g. "PS-7482"
  createdAt: string;
  status: OrderStatus;
  paymentMethod: 'Cash on Delivery (COD)';
  paymentStatus: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryType: 'Local Sirsa Express Delivery' | 'Standard Courier (Haryana/All India)' | 'Store Pickup (Sirsa)';
  city: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  specialInstructions?: string;
  history: OrderHistoryItem[];
}

export interface SentNotification {
  id: string;
  to: string;
  from: string;
  subject: string;
  timestamp: string;
  body: string;
}
