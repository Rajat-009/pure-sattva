import React, { useState } from 'react';
import { Play, Check, X, ShieldAlert, Award, Droplets, RotateCcw } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

interface KolhuExtractionProps {
  onOpenVideoModal: () => void;
}

export const KolhuExtractionSection: React.FC<KolhuExtractionProps> = ({ onOpenVideoModal }) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'comparison' | 'steps'>('benefits');

  return (
    <section id="extraction-process" className="py-16 bg-[#F5EFEB] border-b border-[#E3D7C9]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDD0] text-xs font-semibold text-[#5A381E]">
            <Droplets className="w-3.5 h-3.5 text-[#A06228]" />
            <span>Traditional Kachi Ghani (Kolhu) Method</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#3B2212]">
            Why Traditional Wood-Pressed Oils Are Better
          </h2>
          <p className="text-sm sm:text-base text-[#614937] leading-relaxed">
            In our Sirsa facility, we crush whole seeds using a dense wooden pestle (Kolhu) moving at slow speed. Unlike commercial metal expellers that heat oil beyond 180°C, our wood absorbs heat, keeping oil strictly below 38°C.
          </p>
        </div>

        {/* Highlight Showcase Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E0D4C3] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Video Reel Preview Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-xl overflow-hidden bg-[#2C180E] aspect-[4/3] flex flex-col items-center justify-center text-center p-6 border border-[#523A28] shadow-md group cursor-pointer"
                onClick={onOpenVideoModal}
              >
                {/* Background graphic motif */}
                <div className="absolute inset-0 bg-radial from-[#4A2E18]/80 to-[#1F1109] opacity-90" />

                {/* Animated Kolhu Pestle Visual */}
                <div className="relative z-10 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#E5A93C] text-[#2C180E] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <Play className="w-8 h-8 fill-current ml-1 text-[#2C180E]" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block bg-[#E5A93C]/20 text-[#FFDC8A] text-xs font-mono px-2.5 py-0.5 rounded-full border border-[#E5A93C]/40">
                      LIVE KOLHU REEL
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      Watch Traditional Wood-Pressing In Action
                    </h3>
                    <p className="text-xs text-[#E8D0BA] max-w-xs mx-auto">
                      Click to watch sesame & mustard seeds slowly crushed without any heat or chemicals
                    </p>
                  </div>
                </div>

                {/* Real-time Indicator tag */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-[#FFDC8A] bg-black/60 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-white/10 font-mono">
                  <span>TEMP: 32.4°C (SAFE COLD)</span>
                  <span>SPEED: 14 RPM SLOW CHURN</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Purity Metrics */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">
                  The Pure Sattva Standard
                </span>
                <h3 className="font-display text-2xl font-bold text-[#3B2212]">
                  Cold Extracted. Unrefined. Zero Additives.
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4535] leading-relaxed">
                  Most supermarket oils are refined with harsh chemical solvents like Hexane, neutralized with caustic soda, and bleached with clays. At Pure Sattva in Sirsa, we only use natural seed pressure and cotton cloth filtration.
                </p>
              </div>

              {/* 3 Key Pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#EBE1D5]">
                  <div className="w-8 h-8 rounded-lg bg-[#3B2212] text-[#F3ECE2] flex items-center justify-center shrink-0 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3B2212]">Wooden Mortar & Pestle (Lakdi)</h4>
                    <p className="text-xs text-[#6B513E] mt-0.5">
                      Wood naturally insulates against heat buildup, protecting sensitive Omega-3, 6, and 9 fatty acids.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#EBE1D5]">
                  <div className="w-8 h-8 rounded-lg bg-[#3B2212] text-[#F3ECE2] flex items-center justify-center shrink-0 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3B2212]">Zero Argemone & Zero Palm Blending</h4>
                    <p className="text-xs text-[#6B513E] mt-0.5">
                      100% single origin oil. Every batch is bottled in clear glass bottles so you can inspect its natural golden clarity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#EBE1D5]">
                  <div className="w-8 h-8 rounded-lg bg-[#3B2212] text-[#F3ECE2] flex items-center justify-center shrink-0 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3B2212]">Preserves Natural Antioxidants</h4>
                    <p className="text-xs text-[#6B513E] mt-0.5">
                      Packed with authentic Vitamin E, polyphenols, and original aroma that makes home cooking taste unforgettable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E0D4C3] shadow-xs">
          <div className="p-4 sm:p-6 bg-[#3B2212] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                Comparison: Pure Sattva Wood-Pressed vs Commercial Refined Oil
              </h3>
              <p className="text-xs text-[#EAD8C7] mt-0.5">
                Understand what goes into your family’s daily meals
              </p>
            </div>
            <button
              onClick={onOpenVideoModal}
              className="px-3.5 py-2 text-xs font-semibold text-[#2C180E] bg-[#D4A373] hover:bg-[#E5B586] rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              Watch Video Demonstration
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E8DEC8] bg-[#FAF8F5] text-[#5C4535]">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-[#3B2212] bg-[#F7F2EA]">
                    Pure Sattva (Wood-Pressed Kolhu)
                  </th>
                  <th className="py-3 px-4 font-semibold text-[#7D6B5D]">
                    Commercial Refined Oil
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC] text-[#3E2C1E]">
                <tr>
                  <td className="py-3 px-4 font-medium">Extraction Temperature</td>
                  <td className="py-3 px-4 text-[#2E7D32] font-semibold bg-[#F7F2EA]">
                    Below 38°C (Cold slow press)
                  </td>
                  <td className="py-3 px-4 text-[#C62828]">
                    180°C to 230°C (High heat destruction)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Chemical Solvents (Hexane)</td>
                  <td className="py-3 px-4 text-[#2E7D32] font-semibold bg-[#F7F2EA]">
                    Zero (None used, 100% mechanical)
                  </td>
                  <td className="py-3 px-4 text-[#C62828]">
                    Heavy petroleum solvents to maximize yield
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Nutritional Retention</td>
                  <td className="py-3 px-4 text-[#2E7D32] font-semibold bg-[#F7F2EA]">
                    100% Vitamin E, natural enzymes intact
                  </td>
                  <td className="py-3 px-4 text-[#7D6B5D]">
                    Nutrients stripped, synthetic vitamins added back
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Bleaching & Deodorization</td>
                  <td className="py-3 px-4 text-[#2E7D32] font-semibold bg-[#F7F2EA]">
                    Unrefined, natural color & original aroma
                  </td>
                  <td className="py-3 px-4 text-[#C62828]">
                    Chemical bleaching earths & synthetic deodorizers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Heart & Digestion Impact</td>
                  <td className="py-3 px-4 text-[#2E7D32] font-semibold bg-[#F7F2EA]">
                    Natural MUFA/PUFA, zero trans-fats
                  </td>
                  <td className="py-3 px-4 text-[#C62828]">
                    High trans-fat formation due to overheating
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
