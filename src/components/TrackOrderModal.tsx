import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, PackageCheck, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { STORE_DETAILS } from '../data/products';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  onViewBill: (order: Order) => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
  onViewBill,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearchWith(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearchWith = async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // 1. Try server fetch
      const res = await fetch(`/api/orders/${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
        setIsLoading(false);
        return;
      }
    } catch {
      // Fall through to local storage
    }

    // 2. Check local storage
    const localOrders: Order[] = JSON.parse(localStorage.getItem('pure_sattva_orders') || '[]');
    const found = localOrders.find(
      (o) =>
        o.id.toLowerCase() === q.toLowerCase() ||
        o.customerPhone.includes(q.replace(/\D/g, ''))
    );

    setOrder(found || null);
    setIsLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchWith(query);
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    {
      status: 'Received',
      label: 'Order Received',
      desc: 'Order placed via website for Cash on Delivery.',
    },
    {
      status: 'Preparing',
      label: 'Preparing & Packing',
      desc: 'Freshly bottled from Kolhu batch & sanitized packaging.',
    },
    {
      status: 'Out for Delivery',
      label: 'Out for Delivery',
      desc: 'Dispatched with Sirsa local rider or courier.',
    },
    {
      status: 'Delivered',
      label: 'Delivered',
      desc: 'Safely delivered and payment collected.',
    },
  ];

  const getStepState = (stepStatus: OrderStatus) => {
    if (!order) return 'upcoming';
    const statusOrder: OrderStatus[] = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (order.status === 'Cancelled') {
      return stepStatus === 'Received' ? 'completed' : 'cancelled';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E8DEC8] my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE0D5] bg-[#FAF8F5]">
          <div>
            <h3 className="font-display text-lg font-bold text-[#2C1810]">
              Track Your Pure Sattva Order
            </h3>
            <p className="text-xs text-[#7A6150]">
              Real-time dispatch & delivery updates from our Sirsa store
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EAE0D5] hover:bg-[#D9C8B5] text-[#3B2212] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. PS-1042) or Phone Number"
                className="w-full text-xs font-mono font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-xl py-3 pl-3.5 pr-9 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-3 text-xs font-bold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Results */}
          {isLoading ? (
            <div className="py-12 text-center text-xs text-[#7A6150]">
              Checking Sirsa dispatch records...
            </div>
          ) : order ? (
            <div className="space-y-6">
              {/* Order Meta Box */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE1D5] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono text-xs font-bold text-[#3B2212] bg-white border border-[#D9C4B0] px-2 py-0.5 rounded">
                    Order #{order.id}
                  </span>
                  <p className="font-semibold text-[#2C1810] mt-1">{order.customerName}</p>
                  <p className="text-[11px] text-[#7A6150]">{order.deliveryType}</p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
                    COD: ₹{order.totalAmount}
                  </span>
                  <p className="text-[11px] text-[#7A6150] mt-1">
                    Placed:{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAE0D5]">
                {steps.map((step) => {
                  const state = getStepState(step.status);
                  return (
                    <div key={step.status} className="relative flex items-start gap-3">
                      {/* Marker */}
                      <div
                        className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          state === 'completed'
                            ? 'bg-[#2E7D32] border-[#2E7D32] text-white'
                            : state === 'current'
                            ? 'bg-[#E5A93C] border-[#3B2212] text-[#2C180E] ring-4 ring-[#E5A93C]/20'
                            : 'bg-white border-[#D9C9B8] text-transparent'
                        }`}
                      >
                        {state === 'completed' && '✓'}
                        {state === 'current' && '●'}
                      </div>

                      <div className="text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              state === 'current'
                                ? 'text-[#3B2212]'
                                : state === 'completed'
                                ? 'text-[#2E7D32]'
                                : 'text-[#8C7564]'
                            }`}
                          >
                            {step.label}
                          </span>
                          {state === 'current' && (
                            <span className="text-[10px] font-mono uppercase bg-[#FAF0E1] text-[#9E6523] px-1.5 py-0.2 rounded font-bold">
                              Current Status
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#7A6150] mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Items in this order */}
              <div className="pt-2 border-t border-[#EAE0D5] text-xs">
                <span className="font-bold text-[#3B2212] block mb-2">
                  Items in this Order ({order.items.length}):
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {order.items.map((it, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-1 px-2.5 rounded bg-[#FAF8F5] text-xs"
                    >
                      <span className="text-[#3B2212]">
                        {it.productName} ({it.size}) × {it.quantity}
                      </span>
                      <span className="font-mono font-semibold text-[#5C4535]">
                        ₹{it.price * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions: View E-Bill / WhatsApp Store */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EAE0D5]">
                <button
                  onClick={() => onViewBill(order)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#3B2212] bg-[#FAF4ED] hover:bg-[#EFE5D8] border border-[#D9C4B0] rounded-lg transition-colors cursor-pointer"
                >
                  View / Print Full E-Bill
                </button>

                <a
                  href={`https://wa.me/918059048843?text=${encodeURIComponent(
                    `Hello Pure Sattva, I am inquiring about Order #${order.id} for ${order.customerName}. Please provide an update.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#2E7D32] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask Store on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="py-8 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-700 mx-auto" />
              <p className="text-xs font-bold text-[#3B2212]">No order found matching "{query}"</p>
              <p className="text-[11px] text-[#7A6150] max-w-sm mx-auto">
                Please verify the Order ID (e.g. PS-1042) or 10-digit mobile number entered during checkout. You can also call our Sirsa store at 8059048843.
              </p>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-[#7A6150]">
              <p>Enter the Order ID from your receipt or your 10-digit mobile number above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
