import React from 'react';
import { X, Printer, CheckCircle, MessageCircle, MapPin, Phone, ShieldCheck, Download, Share2 } from 'lucide-react';
import { Order } from '../types';
import { STORE_DETAILS } from '../data/products';

interface EBillModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const EBillModal: React.FC<EBillModalProps> = ({
  order,
  isOpen,
  onClose,
  onTrackOrder,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const whatsappMessage = `*Pure Sattva Order Confirmation*\n` +
    `---------------------------------\n` +
    `*Order ID:* ${order.id}\n` +
    `*Customer:* ${order.customerName}\n` +
    `*Phone:* ${order.customerPhone}\n` +
    `*Address:* ${order.deliveryAddress}\n` +
    `---------------------------------\n` +
    `*Items:*\n` +
    order.items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.productName} (${it.size}) x ${it.quantity} = ₹${it.price * it.quantity}`
      )
      .join('\n') +
    `\n---------------------------------\n` +
    `*Delivery:* ${order.deliveryType} (₹${order.deliveryFee})\n` +
    `*Total COD Payable:* ₹${order.totalAmount}\n` +
    `*Payment Mode:* Cash on Delivery\n\n` +
    `Thank you! Please process and dispatch my order.`;

  const whatsappUrl = `https://wa.me/918059048843?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E0D4C3] my-8 flex flex-col">
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-[#3B2212] text-white border-b border-[#523A28]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#88C057]" />
            <div>
              <h3 className="font-display text-base font-bold">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-[#EAD8C7]">
                Official Cash on Delivery E-Bill Generated
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-[#2C180E] bg-[#D4A373] hover:bg-[#E5B586] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bill</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#EAD8C7] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable E-Bill Document */}
        <div id="printable-bill" className="p-6 sm:p-8 bg-white space-y-6 text-[#2C1810]">
          {/* Header Lockup */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-[#EAE0D5] pb-5">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#3B2212]">
                {STORE_DETAILS.name}
              </span>
              <p className="text-xs text-[#7A6150] font-medium mt-0.5">
                {STORE_DETAILS.tagline}
              </p>
              <p className="text-xs text-[#523C2D] mt-1 max-w-sm">
                {STORE_DETAILS.address}
              </p>
              <p className="text-xs text-[#523C2D]">
                Phone / WhatsApp: {STORE_DETAILS.phoneFormatted} · Email: {STORE_DETAILS.email}
              </p>
            </div>

            {/* Bill Meta */}
            <div className="text-left sm:text-right space-y-1">
              <div className="inline-block bg-[#FAF4ED] border border-[#E8DEC8] px-3 py-1 rounded text-xs font-mono font-bold text-[#3B2212]">
                E-BILL #{order.id}
              </div>
              <p className="text-xs text-[#6B5342]">
                <strong>Date:</strong> {formattedDate}
              </p>
              <p className="text-xs text-[#6B5342]">
                <strong>Payment:</strong>{' '}
                <span className="text-[#2E7D32] font-semibold">Cash on Delivery (COD)</span>
              </p>
              <p className="text-xs text-[#6B5342]">
                <strong>Status:</strong>{' '}
                <span className="font-semibold text-[#8B5A2B]">{order.status}</span>
              </p>
            </div>
          </div>

          {/* Customer & Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE1D5] text-xs">
            <div>
              <h4 className="font-bold text-[#3B2212] uppercase tracking-wider text-[11px] mb-1">
                Billed To (Customer):
              </h4>
              <p className="font-semibold text-sm text-[#2C1810]">{order.customerName}</p>
              <p className="text-[#5C4535]">Phone: {order.customerPhone}</p>
              {order.customerEmail && order.customerEmail !== 'N/A' && (
                <p className="text-[#5C4535]">Email: {order.customerEmail}</p>
              )}
            </div>

            <div>
              <h4 className="font-bold text-[#3B2212] uppercase tracking-wider text-[11px] mb-1">
                Delivery Address:
              </h4>
              <p className="text-[#3B2212] font-medium leading-relaxed">
                {order.deliveryAddress}
              </p>
              <p className="text-[#5C4535] mt-0.5">
                <strong>Method:</strong> {order.deliveryType}
              </p>
              {order.specialInstructions && (
                <p className="text-[#8B5A2B] mt-0.5 italic">
                  Note: "{order.specialInstructions}"
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#3B2212] bg-[#FAF8F5] text-[#3B2212]">
                  <th className="py-2.5 px-3 font-bold">#</th>
                  <th className="py-2.5 px-3 font-bold">Item Description</th>
                  <th className="py-2.5 px-3 font-bold">Size</th>
                  <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                  <th className="py-2.5 px-3 font-bold text-right">Price</th>
                  <th className="py-2.5 px-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DE] text-[#332216]">
                {order.items.map((item, index) => (
                  <tr key={`${item.productId}-${item.size}`}>
                    <td className="py-2.5 px-3 font-mono">{index + 1}</td>
                    <td className="py-2.5 px-3 font-medium">
                      {item.productName}
                      <span className="block text-[10px] text-[#7A6150]">
                        100% Pure · Chemical-Free
                      </span>
                    </td>
                    <td className="py-2.5 px-3">{item.size}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-semibold">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      ₹{item.price}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold tabular-nums">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Notes */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2 border-t border-[#EAE0D5]">
            <div className="text-xs text-[#6B5342] max-w-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Pure Sattva Purity & Quality Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Thank you for choosing pure, chemical-free staples! Keep exact cash of ₹{order.totalAmount} ready upon delivery.
              </p>
              <p className="text-[11px] font-mono text-[#8B5A2B]">
                Track online: enter order ID <strong>{order.id}</strong> on our website.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B5342]">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold tabular-nums">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#6B5342]">
                <span>Delivery Charges:</span>
                <span className="font-mono font-semibold tabular-nums">
                  {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3B2212] pt-2 border-t-2 border-[#3B2212]">
                <span>Total Due (COD):</span>
                <span className="font-mono text-base text-[#3B2212] tabular-nums">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Store Stamp / Sign */}
          <div className="pt-4 flex items-center justify-between text-[11px] text-[#7A6150] border-t border-[#EFE7DE]">
            <div>
              <span>Store Dispatch: Barnala Road, Sirsa (Haryana)</span>
            </div>
            <div className="text-right">
              <span className="font-serif italic font-bold text-[#3B2212] block">
                Pure Sattva Store
              </span>
              <span>Authorized Signature</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions (hidden in print) */}
        <div className="no-print p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#EAE0D5] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* WhatsApp notification button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-[#1F5C24] bg-[#E8F5E9] hover:bg-[#DCF0DE] border border-[#C5E1A5] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
              <span>Confirm on WhatsApp (8059048843)</span>
            </a>

            <button
              onClick={() => onTrackOrder(order.id)}
              className="px-4 py-2.5 text-xs font-semibold text-[#3B2212] bg-[#EAE0D5] hover:bg-[#DFD0BE] rounded-xl transition-colors cursor-pointer"
            >
              Track Order Status
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-xl transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
