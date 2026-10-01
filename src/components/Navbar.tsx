import React from 'react';
import { ShoppingBag, ShieldCheck, Phone, Instagram, MapPin } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTrack: () => void;
  onOpenAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTrack,
  onOpenAdmin,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DEC8]/60 transition-colors">
      {/* Micro Announcement Bar */}
      <div className="bg-[#3B2212] text-[#F3ECE2] text-xs py-1.5 px-4 text-center tracking-wide">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Store in Sirsa, Haryana · Same-Day Local Delivery Available</span>
          </div>
          <div className="mx-auto sm:mx-0 font-medium">
            100% Traditional Wood-Pressed (Lakdi Ghani) Oils & Natural Staples
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={STORE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4A373]" />
              <span>Call / WhatsApp: 8059048843</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Links) - Zone 3 (Actions) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onScrollToSection('hero')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#3B2212] group-hover:text-[#5C3A21] transition-colors">
              Pure Sattva
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5C3A21]">
          <button
            onClick={() => onScrollToSection('catalog')}
            className="hover:text-[#3B2212] transition-colors cursor-pointer py-1"
          >
            Shop Essentials
          </button>
          <button
            onClick={() => onScrollToSection('extraction-process')}
            className="hover:text-[#3B2212] transition-colors cursor-pointer py-1"
          >
            Kolhu Extraction
          </button>
          <button
            onClick={() => onScrollToSection('sirsa-store')}
            className="hover:text-[#3B2212] transition-colors cursor-pointer py-1"
          >
            Our Sirsa Store
          </button>
          <button
            onClick={onOpenTrack}
            className="hover:text-[#3B2212] transition-colors cursor-pointer py-1"
          >
            Track Order
          </button>
          <a
            href={STORE_DETAILS.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[#8B5A2B] hover:text-[#3B2212] transition-colors py-1"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@puresattva_</span>
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Owner Portal / Admin Access */}
          <button
            onClick={onOpenAdmin}
            title="Owner Dashboard & Order Manager"
            className="px-3 py-2 text-xs font-medium text-[#4A2E18] bg-[#F2E8DC] hover:bg-[#E8DCCF] border border-[#D9C4B0] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span className="hidden sm:inline">Owner Portal</span>
            <span className="sm:hidden">Admin</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative px-3.5 py-2 text-xs font-semibold text-white bg-[#3B2212] hover:bg-[#4E2E1A] rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#EAD8C7]" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#D4A373] text-[#241308] font-bold text-xs px-1.5 py-0.5 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
