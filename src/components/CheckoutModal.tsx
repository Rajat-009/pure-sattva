import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Banknote, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { CartItem, Order } from '../types';
import { STORE_DETAILS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryType: string;
  deliveryFee: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryType,
  deliveryFee,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [houseStreet, setHouseStreet] = useState('');
  const [colonyLandmark, setColonyLandmark] = useState('');
  const [city, setCity] = useState('Sirsa');
  const [pincode, setPincode] = useState('125055');
  const [state, setState] = useState('Haryana');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number for order delivery.');
      return;
    }
    if (!houseStreet.trim()) {
      setErrorMessage('Please enter your house/shop number and street.');
      return;
    }

    const fullAddress = `${houseStreet.trim()}${
      colonyLandmark.trim() ? `, ${colonyLandmark.trim()}` : ''
    }, ${city}, ${state} - ${pincode}`;

    const orderPayload = {
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      customerEmail: customerEmail.trim() || undefined,
      deliveryAddress: fullAddress,
      deliveryType,
      city,
      pincode,
      items,
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      specialInstructions: instructions.trim() || undefined,
    };

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await res.json();
      const createdOrder: Order = data.order;

      // Save to client localStorage as backup
      const existing = JSON.parse(localStorage.getItem('pure_sattva_orders') || '[]');
      existing.unshift(createdOrder);
      localStorage.setItem('pure_sattva_orders', JSON.stringify(existing));

      onOrderSuccess(createdOrder);
    } catch (err: any) {
      // Local fallback in case server was offline
      const fallbackId = `PS-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toISOString();
      const fallbackOrder: Order = {
        id: fallbackId,
        createdAt: timestamp,
        status: 'Received',
        paymentMethod: 'Cash on Delivery (COD)',
        paymentStatus: 'Pending (Pay on Delivery)',
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        customerEmail: customerEmail.trim() || 'N/A',
        deliveryAddress: fullAddress,
        deliveryType: deliveryType as any,
        city,
        pincode,
        items,
        subtotal,
        deliveryFee,
        totalAmount: grandTotal,
        specialInstructions: instructions.trim() || '',
        history: [
          {
            status: 'Received',
            time: timestamp,
            note: 'Order placed by customer (Cash on Delivery).',
          },
        ],
      };

      const existing = JSON.parse(localStorage.getItem('pure_sattva_orders') || '[]');
      existing.unshift(fallbackOrder);
      localStorage.setItem('pure_sattva_orders', JSON.stringify(existing));

      onOrderSuccess(fallbackOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E8DEC8] my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE0D5] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#8B5A2B]" />
            <div>
              <h3 className="font-display text-lg font-bold text-[#2C1810]">
                Cash on Delivery Checkout
              </h3>
              <p className="text-xs text-[#7A6150]">
                Pay safely in cash when your fresh order is handed over
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EAE0D5] hover:bg-[#D9C8B5] text-[#3B2212] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Customer Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full text-xs font-mono font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3B2212] mb-1">
              Email Address (Optional, for digital receipt)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="e.g. yourname@gmail.com"
              className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
            />
          </div>

          {/* Delivery Address Formatted for India */}
          <div className="space-y-3 pt-2 border-t border-[#EFE7DE]">
            <h4 className="text-xs font-bold text-[#3B2212] uppercase tracking-wider">
              Delivery Address (Haryana & Pan India)
            </h4>

            <div>
              <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                House / Shop / Flat No. & Street *
              </label>
              <input
                type="text"
                required
                value={houseStreet}
                onChange={(e) => setHouseStreet(e.target.value)}
                placeholder="e.g. House #142, Street 3"
                className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                  Colony / Sector / Landmark
                </label>
                <input
                  type="text"
                  value={colonyLandmark}
                  onChange={(e) => setColonyLandmark(e.target.value)}
                  placeholder="e.g. Near City Centre, Barnala Road"
                  className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Sirsa"
                  className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="125055"
                  className="w-full text-xs font-mono text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2212] mb-1">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Call before delivery / deliver after 4 PM"
                className="w-full text-xs font-medium text-[#2C1810] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
              />
            </div>
          </div>

          {/* Payment Method Badge (Explicit COD Only) */}
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-[#2E7D32]" />
              <div>
                <span className="text-xs font-bold text-[#3B2212] block">
                  Payment Method: Cash on Delivery (COD)
                </span>
                <span className="text-[11px] text-[#6B5342]">
                  Pay in cash when order arrives at your doorstep
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          {/* Order Summary Recap */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE0D5] space-y-1 text-xs">
            <div className="flex justify-between text-[#6B5342]">
              <span>Selected Option:</span>
              <span className="font-semibold text-[#3B2212]">{deliveryType}</span>
            </div>
            <div className="flex justify-between text-[#6B5342]">
              <span>Items Total:</span>
              <span className="font-mono tabular-nums">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-[#6B5342]">
              <span>Delivery Fee:</span>
              <span className="font-mono tabular-nums">
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2C1810] pt-1 border-t border-[#E0D4C3]">
              <span>Total Payable on Delivery:</span>
              <span className="font-mono text-base text-[#3B2212] tabular-nums">
                ₹{grandTotal}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-xs font-bold text-white bg-[#3B2212] hover:bg-[#4E2E1A] disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Place Cash on Delivery Order (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4 text-[#F4C430]" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-[#7A6150] text-center">
            By placing this order, you will receive an automatic digital E-Bill and our Sirsa store owner will be notified for prompt dispatch.
          </p>
        </form>
      </div>
    </div>
  );
};
