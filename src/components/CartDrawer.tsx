import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, MapPin, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_DETAILS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: (deliveryType: string, deliveryFee: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<
    'Local Sirsa Express Delivery' | 'Standard Courier (Haryana/All India)' | 'Store Pickup (Sirsa)'
  >('Local Sirsa Express Delivery');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery fee logic:
  // Sirsa Local: Free if subtotal >= 500, else 30
  // Courier: 60
  // Store Pickup: 0
  let deliveryFee = 0;
  if (deliveryType === 'Local Sirsa Express Delivery') {
    deliveryFee = subtotal >= 500 || items.length === 0 ? 0 : 30;
  } else if (deliveryType === 'Standard Courier (Haryana/All India)') {
    deliveryFee = 60;
  } else {
    deliveryFee = 0;
  }

  const grandTotal = subtotal + deliveryFee;

  // WhatsApp order link
  const generateWhatsAppMessage = () => {
    let text = `*New Order Inquiry for Pure Sattva, Sirsa*\n`;
    text += `---------------------------------\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.productName} (${item.size}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    text += `---------------------------------\n`;
    text += `*Subtotal:* ₹${subtotal}\n`;
    text += `*Delivery Option:* ${deliveryType} (₹${deliveryFee})\n`;
    text += `*Total COD Payable:* ₹${grandTotal}\n\n`;
    text += `Please confirm my order. I would like to pay via Cash on Delivery.`;
    return `https://wa.me/918059048843?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E5DACD]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE0D5] bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8B5A2B]" />
              <h2 className="font-display text-lg font-bold text-[#2C1810]">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono bg-[#EFE7DE] text-[#4A3222] px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, it) => acc + it.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#EAE0D5] hover:bg-[#D9C8B5] text-[#3B2212] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#9E826C]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display text-base font-bold text-[#3B2212]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#705847] max-w-xs">
                  Add fresh wood-pressed yellow mustard oil, groundnut oil, Desi cow ghee, or stone-ground spices to get started!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-xl transition-colors cursor-pointer"
                >
                  Explore Pure Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EBE1D5]"
                >
                  {/* Visual Accent Thumbnail */}
                  <div
                    className="w-12 h-14 rounded-lg flex items-center justify-center text-[9px] font-mono text-white font-bold p-1 text-center shrink-0 shadow-xs"
                    style={{ backgroundColor: item.imageAccent || '#8B5A2B' }}
                  >
                    <span>{item.size}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#2C1810] truncate">
                      {item.productName}
                    </h4>
                    <span className="text-[11px] text-[#7A6150] block">
                      Size: {item.size}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono text-xs font-bold text-[#3B2212] tabular-nums">
                        ₹{item.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-[#8C7462] font-mono">
                        (₹{item.price} each)
                      </span>
                    </div>
                  </div>

                  {/* Stepper & Remove */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.productId, item.size)}
                      className="text-[#A84534] hover:text-[#7F2618] p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-[#D9C9B8] rounded-md overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.size, -1)}
                        className="w-6 h-6 flex items-center justify-center text-[#5C4535] hover:bg-[#EAE0D5] text-xs font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-bold text-[#3B2212] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.size, 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#5C4535] hover:bg-[#EAE0D5] text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="border-t border-[#EAE0D5] p-5 bg-[#FAF8F5] space-y-4">
              {/* Delivery Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3B2212] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Choose Delivery Method:</span>
                </label>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <label className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                    deliveryType === 'Local Sirsa Express Delivery'
                      ? 'bg-white border-[#3B2212] text-[#3B2212] font-semibold'
                      : 'bg-[#F2ECE3] border-transparent text-[#614A38]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryType === 'Local Sirsa Express Delivery'}
                        onChange={() => setDeliveryType('Local Sirsa Express Delivery')}
                        className="accent-[#3B2212]"
                      />
                      <span>Sirsa Local Express (Same / Next Day)</span>
                    </div>
                    <span className="font-mono text-xs">
                      {subtotal >= 500 ? 'FREE' : '₹30'}
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                    deliveryType === 'Standard Courier (Haryana/All India)'
                      ? 'bg-white border-[#3B2212] text-[#3B2212] font-semibold'
                      : 'bg-[#F2ECE3] border-transparent text-[#614A38]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryType === 'Standard Courier (Haryana/All India)'}
                        onChange={() => setDeliveryType('Standard Courier (Haryana/All India)')}
                        className="accent-[#3B2212]"
                      />
                      <span>Standard Courier (Pan India)</span>
                    </div>
                    <span className="font-mono text-xs">₹60</span>
                  </label>

                  <label className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                    deliveryType === 'Store Pickup (Sirsa)'
                      ? 'bg-white border-[#3B2212] text-[#3B2212] font-semibold'
                      : 'bg-[#F2ECE3] border-transparent text-[#614A38]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryType === 'Store Pickup (Sirsa)'}
                        onChange={() => setDeliveryType('Store Pickup (Sirsa)')}
                        className="accent-[#3B2212]"
                      />
                      <span>Store Pickup (Barnala Road, Sirsa)</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#2E7D32]">FREE</span>
                  </label>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 pt-2 border-t border-[#EAE0D5] text-xs">
                <div className="flex justify-between text-[#6B5342]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-semibold tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#6B5342]">
                  <span>Delivery Charges:</span>
                  <span className="font-mono font-semibold tabular-nums">
                    {deliveryFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2C1810] pt-1 border-t border-[#EAE0D5]">
                  <span>Cash on Delivery Total:</span>
                  <span className="font-mono text-base text-[#3B2212] tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Primary: Proceed to Cash on Delivery Checkout */}
                <button
                  onClick={() => onProceedToCheckout(deliveryType, deliveryFee)}
                  className="w-full py-3.5 px-4 text-xs font-bold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Cash on Delivery Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#F4C430]" />
                </button>

                {/* Secondary: Quick WhatsApp Order */}
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#1F5C24] bg-[#E8F5E9] hover:bg-[#DCF0DE] border border-[#C5E1A5] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
                  <span>Quick Order via WhatsApp (+91 8059048843)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
