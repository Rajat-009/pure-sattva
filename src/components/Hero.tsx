import React from 'react';
import { Sparkles, Play, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onWatchVideoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onWatchVideoClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-14 sm:pb-20 border-b border-[#EAE0D5]/70">
      {/* Subtle organic ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EBDBC9] rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F3E7D8] rounded-full blur-2xl -z-10" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E0D2C0] text-xs font-semibold text-[#5A381E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C4823F]" />
              <span>Sirsa’s Authentic Wood-Pressed (Lakdi Ghani) Store</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#3B2212] leading-[1.18] text-balance">
              Zero Chemicals. <br className="hidden sm:inline" />
              100% Pure Organic Goodness.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4535] leading-relaxed max-w-xl">
              Freshly extracted on traditional wooden Kolhu without friction heat, chemical solvents, or argemone blending. Experience pure Mustard, Groundnut, Coconut, and Sesame oils alongside Vedic A2 Desi Cow Ghee and stone-grinded staples — directly from our store in Sirsa, Haryana.
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm text-[#4A3222] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Wood-Pressed &lt; 38°C</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Sirsa Express Delivery</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Fresh Oils & Staples</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWatchVideoClick}
                className="px-5 py-3.5 text-sm font-semibold text-[#3B2212] bg-[#F4EFEA] hover:bg-[#EAE0D5] border border-[#D9C8B5] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#3B2212] text-[#F3ECE2] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Kolhu Process</span>
              </button>

              <a
                href={STORE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 text-sm font-medium text-[#2F4F2F] hover:text-[#1E361E] bg-[#E8F0E8] hover:bg-[#DDE9DD] border border-[#C5DDC5] rounded-xl transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase in Brown & White */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-[#E8DEC8]/80">
              {/* Badge */}
              <div className="absolute -top-3 left-6 bg-[#3B2212] text-[#F4ECE3] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Pure Sattva · Sirsa Certified</span>
              </div>

              {/* Showcase Visual Card */}
              <div className="bg-[#F8F5F0] rounded-xl overflow-hidden p-6 border border-[#E6DDD0]">
                {/* Visual Representation of Bottles & Kolhu */}
                <div className="flex items-center justify-center gap-3 py-6">
                  {/* Yellow Mustard Oil Bottle */}
                  <div className="w-20 sm:w-24 bg-gradient-to-b from-[#F9DE85] via-[#E2A62C] to-[#C98A17] rounded-lg p-2 flex flex-col justify-between items-center text-center shadow-md border border-[#B8861B]/30 h-44 sm:h-52 relative group">
                    <div className="w-6 h-3 bg-[#EAB308] rounded-t-sm border border-yellow-700/30" />
                    <div className="w-full bg-[#2C180E] text-[#F5EDE4] py-1.5 px-1 rounded text-[9px] font-bold tracking-tight">
                      PURE SATTVA
                      <span className="block text-[8px] font-medium text-[#F4C430]">MUSTARD</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#3E220D] bg-white/80 px-1 py-0.5 rounded shadow-xs">
                      ₹190 / 500ml
                    </div>
                  </div>

                  {/* Coconut Oil Bottle */}
                  <div className="w-20 sm:w-24 bg-gradient-to-b from-white via-[#F5F2EB] to-[#E3DDD1] rounded-lg p-2 flex flex-col justify-between items-center text-center shadow-md border border-[#D1C7BA] h-48 sm:h-56 relative group">
                    <div className="w-6 h-3 bg-[#E5E0D5] rounded-t-sm border border-[#A89E8F]" />
                    <div className="w-full bg-[#1F2F20] text-[#E7EFE6] py-1.5 px-1 rounded text-[9px] font-bold tracking-tight">
                      PURE SATTVA
                      <span className="block text-[8px] font-medium text-[#88C057]">COCONUT</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#2A3B2B] bg-white/90 px-1 py-0.5 rounded shadow-xs">
                      100% PURE
                    </div>
                  </div>

                  {/* Groundnut Oil Bottle */}
                  <div className="w-20 sm:w-24 bg-gradient-to-b from-[#FCE59F] via-[#E9B949] to-[#C9921E] rounded-lg p-2 flex flex-col justify-between items-center text-center shadow-md border border-[#B8861B]/30 h-44 sm:h-52 relative group">
                    <div className="w-6 h-3 bg-[#EAB308] rounded-t-sm border border-yellow-700/30" />
                    <div className="w-full bg-[#2C180E] text-[#F5EDE4] py-1.5 px-1 rounded text-[9px] font-bold tracking-tight">
                      PURE SATTVA
                      <span className="block text-[8px] font-medium text-[#FFD700]">GROUNDNUT</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#3E220D] bg-white/80 px-1 py-0.5 rounded shadow-xs">
                      ₹200 / 500ml
                    </div>
                  </div>
                </div>

                {/* Subtitle Card */}
                <div className="mt-4 pt-3 border-t border-[#E0D4C3] flex items-center justify-between text-xs text-[#523A28]">
                  <span className="font-semibold">Single Filtered · Unrefined</span>
                  <span className="font-mono text-[#8B5A2B] font-bold">100% Kachi Ghani</span>
                </div>
              </div>

              {/* Bottom Quick Info */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EADFCF]">
                  <span className="block text-[#70543E] text-[11px]">Direct Store Address</span>
                  <span className="font-semibold text-[#3B2212]">Barnala Road, Sirsa</span>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EADFCF]">
                  <span className="block text-[#70543E] text-[11px]">Direct Helpline</span>
                  <span className="font-semibold text-[#3B2212]">+91 8059048843</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
