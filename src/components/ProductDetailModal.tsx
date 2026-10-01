import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Heart, Droplet, MessageCircle, ChevronRight } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { STORE_DETAILS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onQuickBuy: (product: Product, variant: ProductVariant) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onQuickBuy,
}) => {
  if (!isOpen || !product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'benefits' | 'nutrition'>('details');
  const [justAdded, setJustAdded] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAdd = () => {
    onAddToCart(product, currentVariant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleBuyNow = () => {
    onQuickBuy(product, currentVariant);
    onClose();
  };

  const whatsappInquiryUrl = `https://wa.me/918059048843?text=${encodeURIComponent(
    `Hello Pure Sattva! I am interested in ordering ${product.name} (${currentVariant.size}) from your Sirsa store. Please confirm availability.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E8DEC8] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE0D5] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8B5A2B]">
              {product.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs font-medium text-[#4A3222] bg-[#EFE7DE] px-2 py-0.5 rounded">
              {product.shortTag}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EAE0D5] hover:bg-[#D9C8B5] text-[#3B2212] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Product Visual Presentation */}
            <div className="md:col-span-5 bg-[#FAF8F5] rounded-xl p-6 border border-[#EADFCF] flex flex-col items-center justify-center text-center">
              <div
                className="w-32 h-44 rounded-lg shadow-lg flex flex-col justify-between p-3 border border-white relative overflow-hidden"
                style={{
                  backgroundColor: product.imageAccent || '#E5A93C',
                  backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.15) 100%)',
                }}
              >
                <div className="text-[9px] font-mono text-white/90 font-bold uppercase">
                  Sirsa Fresh Batch
                </div>
                <div className="bg-[#2C180E] text-[#F5EDE4] p-1.5 rounded text-center">
                  <div className="text-[10px] font-black text-[#E5A93C] uppercase tracking-wide">
                    PURE SATTVA
                  </div>
                  <div className="text-[9px] text-white truncate font-medium">
                    {product.name}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-[#2C180E] bg-white/90 rounded py-0.5 shadow-2xs">
                  {currentVariant.size}
                </div>
              </div>

              <div className="mt-4 text-xs text-[#6B5342]">
                <p className="font-semibold text-[#3B2212]">{STORE_DETAILS.name}, Sirsa</p>
                <p>100% Unrefined & Chemical-Free</p>
              </div>
            </div>

            {/* Right: Info & Controls */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#2C1810]">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-sm font-medium text-[#7D5A42] mt-0.5">
                    {product.hindiName}
                  </p>
                )}
              </div>

              {/* Price & MRP */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-[#3B2212] tabular-nums">
                  ₹{currentVariant.price}
                </span>
                {currentVariant.mrp > currentVariant.price && (
                  <span className="font-mono text-sm text-[#947A67] line-through tabular-nums">
                    MRP ₹{currentVariant.mrp}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
                  Cash on Delivery Available
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5C4535] leading-relaxed">
                {product.description}
              </p>

              {/* Size / Variant Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3B2212]">
                  Available Sizes / Quantities:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        selectedVariantIndex === idx
                          ? 'bg-[#3B2212] text-white border-[#3B2212] shadow-sm'
                          : 'bg-[#FAF8F5] text-[#5C4535] border-[#D9C9B8] hover:border-[#8B5A2B]'
                      }`}
                    >
                      {v.size} · ₹{v.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-bold text-[#3B2212]">Quantity:</span>
                <div className="flex items-center border border-[#D9C9B8] rounded-lg overflow-hidden bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#5C4535] hover:bg-[#EAE0D5] font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-xs text-[#3B2212] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#5C4535] hover:bg-[#EAE0D5] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className={`py-3 px-3 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    justAdded
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#F2ECE3] hover:bg-[#E8DCCF] text-[#3B2212] border border-[#D9C4B0]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#8B5A2B]" />
                      <span>Add {quantity} to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-3 text-xs font-semibold rounded-xl bg-[#3B2212] hover:bg-[#4E2E1A] text-white transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Quick COD Checkout</span>
                  <ChevronRight className="w-4 h-4 text-[#F4C430]" />
                </button>
              </div>

              {/* WhatsApp direct inquiry */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-xs font-medium text-[#2E7D32] bg-[#E8F5E9] hover:bg-[#D4EED6] border border-[#C5E1A5] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask Store on WhatsApp (+91 8059048843)</span>
              </a>
            </div>
          </div>

          {/* Deep Tabs: Benefits, Extraction, Nutrition */}
          <div className="border-t border-[#EAE0D5] pt-4">
            <div className="flex items-center gap-2 border-b border-[#EAE0D5] pb-2 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1 px-1 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#3B2212] text-[#3B2212]'
                    : 'text-[#846E5E] hover:text-[#3B2212]'
                }`}
              >
                Extraction & Purity Guarantee
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-1 px-1 transition-colors cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'border-b-2 border-[#3B2212] text-[#3B2212]'
                    : 'text-[#846E5E] hover:text-[#3B2212]'
                }`}
              >
                Key Health Benefits
              </button>
              {product.nutritionalInfo && (
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-1 px-1 transition-colors cursor-pointer ${
                    activeTab === 'nutrition'
                      ? 'border-b-2 border-[#3B2212] text-[#3B2212]'
                      : 'text-[#846E5E] hover:text-[#3B2212]'
                  }`}
                >
                  Nutritional Profile
                </button>
              )}
            </div>

            <div className="pt-3 text-xs text-[#5C4535]">
              {activeTab === 'details' && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-[#FAF7F2] p-3 rounded-lg border border-[#EBE1D5]">
                    <ShieldCheck className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#3B2212] block">Extraction Methodology:</strong>
                      <span>{product.extractionMethod || 'Traditional stone/wooden cold press method.'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 bg-[#FAF7F2] rounded border border-[#EBE1D5]">
                      <span className="font-bold text-[#3B2212] block">Zero Heat Loss:</span>
                      <span>Extracted under 38°C to retain all vital nutrients.</span>
                    </div>
                    <div className="p-2 bg-[#FAF7F2] rounded border border-[#EBE1D5]">
                      <span className="font-bold text-[#3B2212] block">Natural Filter:</span>
                      <span>Gravity & cotton cloth filtered; no chemical bleaching.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'benefits' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'nutrition' && product.nutritionalInfo && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                    <div key={key} className="bg-[#FAF7F2] p-2 rounded border border-[#EBE1D5]">
                      <span className="block text-[10px] text-[#7D6451] uppercase font-bold">{key}</span>
                      <span className="font-mono text-xs font-semibold text-[#3B2212]">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
