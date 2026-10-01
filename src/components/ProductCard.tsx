import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, ChevronDown, Sparkles, Zap } from 'lucide-react';
import { Product, ProductVariant } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onQuickBuy: (product: Product, variant: ProductVariant) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickBuy,
  onViewDetails,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const discountPercent = Math.round(
    ((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, currentVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleQuickBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickBuy(product, currentVariant);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-white rounded-2xl border border-[#EBE1D5] hover:border-[#C4A482] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div>
        {/* Top Tag & Category Row (Unboxed metadata as per zero-pill constitution) */}
        <div className="flex items-center justify-between text-xs text-[#70543E] mb-3">
          <span className="font-medium tracking-wide uppercase text-[11px] text-[#8B5A2B]">
            {product.category}
          </span>
          <span className="text-[11px] font-semibold text-[#5A381E] bg-[#F5EFEB] px-2 py-0.5 rounded">
            {product.shortTag}
          </span>
        </div>

        {/* Product Visual Container */}
        <div className="relative aspect-[4/3] rounded-xl bg-[#FAF7F2] border border-[#EFE7DE] flex items-center justify-center overflow-hidden mb-4 p-4 group-hover:bg-[#F7F2EA] transition-colors">
          {/* Authentic Packaging Visual Mockup */}
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            {product.category === 'Wood-Pressed Oils' ? (
              // Glass Oil Bottle Representation
              <div className="relative flex flex-col items-center">
                {/* Cap & neck */}
                <div className="w-5 h-4 bg-[#F4C430] rounded-t-xs border border-amber-600/40 shadow-xs" />
                <div className="w-3.5 h-2 bg-[#EAD8C7] border-x border-[#C4B5A5]" />
                {/* Bottle Body with golden oil tone */}
                <div
                  className="w-20 sm:w-24 h-28 sm:h-32 rounded-lg shadow-md border border-white/60 relative overflow-hidden flex flex-col justify-between p-1.5"
                  style={{
                    backgroundColor: product.imageAccent || '#E5A93C',
                    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.15) 100%)',
                  }}
                >
                  <div className="text-[8px] font-mono text-white/80 font-bold text-center tracking-tighter">
                    COLD PRESSED
                  </div>
                  {/* Label */}
                  <div className="bg-[#2C180E] text-[#F5EDE4] p-1 rounded text-center shadow-xs">
                    <div className="text-[8px] font-extrabold text-[#E5A93C] uppercase tracking-tight leading-tight">
                      PURE SATTVA
                    </div>
                    <div className="text-[7px] text-white/90 truncate font-medium">
                      {product.name.replace('Wood-Pressed ', '')}
                    </div>
                  </div>
                  <div className="text-[8px] font-bold text-[#2C180E] bg-white/90 text-center rounded py-0.5 shadow-2xs">
                    {currentVariant.size}
                  </div>
                </div>
              </div>
            ) : product.category === 'Desi Ghee & Honey' ? (
              // Glass Jar Representation
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-3 bg-[#D4A373] rounded-t-sm border border-[#A06228]" />
                <div
                  className="w-24 sm:w-28 h-24 sm:h-26 rounded-b-xl shadow-md border border-white/60 relative overflow-hidden flex flex-col justify-between p-2"
                  style={{
                    backgroundColor: product.imageAccent || '#E6A728',
                    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.1) 100%)',
                  }}
                >
                  <div className="bg-[#241308] text-[#F3ECE2] p-1 rounded text-center">
                    <div className="text-[8px] font-bold text-[#E5A93C]">PURE SATTVA</div>
                    <div className="text-[7px] text-white truncate">{product.name}</div>
                  </div>
                  <div className="text-[8px] font-bold text-[#3B2212] bg-white/90 text-center rounded py-0.5">
                    {currentVariant.size}
                  </div>
                </div>
              </div>
            ) : (
              // Eco Kraft Paper Pouch Representation
              <div className="relative flex flex-col items-center">
                <div className="w-24 h-2 bg-[#8C5D35] rounded-t-xs" />
                <div
                  className="w-24 sm:w-26 h-28 sm:h-30 rounded-b-md shadow-md border border-[#8C5D35] relative overflow-hidden flex flex-col justify-between p-2"
                  style={{
                    backgroundColor: '#C8A27A',
                    backgroundImage: 'linear-gradient(180deg, #D9B792 0%, #B88E63 100%)',
                  }}
                >
                  <div className="w-full h-1 bg-[#8C5D35]/30 rounded-full" />
                  <div className="bg-[#241308] text-[#F3ECE2] p-1 rounded-full text-center mx-auto w-16 h-16 flex flex-col items-center justify-center border border-[#E5A93C]/40">
                    <span className="text-[6px] text-[#E5A93C] font-bold">PURE SATTVA</span>
                    <span className="text-[7px] font-semibold text-white leading-tight">
                      {product.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-[8px] font-bold text-[#2C180E] bg-white/90 text-center rounded py-0.5">
                    {currentVariant.size}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick inspect button hover */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-7 h-7 rounded-full bg-white/90 text-[#3B2212] flex items-center justify-center shadow-xs">
              <Eye className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Savings Badge */}
          {discountPercent > 0 && (
            <div className="absolute bottom-2 left-2 bg-[#2E7D32] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              SAVE {discountPercent}%
            </div>
          )}
        </div>

        {/* Title & Hindi Subtitle */}
        <div className="space-y-1 mb-2">
          <h3 className="font-display text-base font-bold text-[#2C1810] group-hover:text-[#4A2E18] transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs text-[#8B6E58] font-medium truncate">
              {product.hindiName}
            </p>
          )}
        </div>

        {/* Short description */}
        <p className="text-xs text-[#6B5342] line-clamp-2 leading-relaxed mb-3">
          {product.description}
        </p>

        {/* Variant Dropdown Selector */}
        {product.variants.length > 1 && (
          <div className="mb-3" onClick={(e) => e.stopPropagation()}>
            <label className="block text-[11px] font-medium text-[#7D6451] mb-1">
              Select Quantity / Size:
            </label>
            <div className="relative">
              <select
                value={selectedVariantIndex}
                onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                className="w-full text-xs font-semibold text-[#3B2212] bg-[#FAF8F5] border border-[#D9C9B8] rounded-lg py-1.5 pl-2.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B] appearance-none cursor-pointer"
              >
                {product.variants.map((v, i) => (
                  <option key={v.size} value={i}>
                    {v.size} — ₹{v.price} (MRP ₹{v.mrp})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8B5A2B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Pricing and Action Buttons */}
      <div className="pt-2 border-t border-[#F0E8DC]">
        {/* Price Row (Tabular nums) */}
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-[#3B2212] tabular-nums">
              ₹{currentVariant.price}
            </span>
            {currentVariant.mrp > currentVariant.price && (
              <span className="font-mono text-xs text-[#9C8270] line-through tabular-nums">
                ₹{currentVariant.mrp}
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#2E7D32] font-semibold">
            In Stock (Fresh Batch)
          </span>
        </div>

        {/* Actions: Add to Cart + Quick Buy COD */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAdd}
            className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              addedAnimation
                ? 'bg-[#2E7D32] text-white'
                : 'bg-[#F2ECE3] hover:bg-[#E7DED2] text-[#3B2212] border border-[#D9C4B0]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            onClick={handleQuickBuyClick}
            className="py-2 px-2 text-xs font-semibold rounded-lg bg-[#3B2212] hover:bg-[#4E2E1A] text-white transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-[#F4C430]" />
            <span>Buy COD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
