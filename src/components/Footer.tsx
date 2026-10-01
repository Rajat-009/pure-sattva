import React from 'react';
import { Instagram, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenTrack: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenTrack,
  onScrollToSection,
}) => {
  return (
    <footer className="bg-[#2C180E] text-[#EAD8C7] border-t border-[#3D2517] pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-[#F5EDE4]">
              {STORE_DETAILS.name}
            </span>
            <p className="text-xs text-[#D9C4B0] leading-relaxed max-w-sm">
              Local organic & natural food store based in Sirsa, Haryana. Specializing in traditional wooden Kolhu cold-pressed oils, pure A2 Gir Cow bilona ghee, and 100% chemical-free natural grocery products.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_DETAILS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STORE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Chat on WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${STORE_DETAILS.email}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Email Store Owner"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Explore Store
            </h4>
            <ul className="space-y-2 text-[#D9C4B0]">
              <li>
                <button
                  onClick={() => onScrollToSection('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wood-Pressed Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  A2 Desi Cow Ghee & Honey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('extraction-process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kolhu (Kachi Ghani) Method
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('sirsa-store')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Physical Store in Sirsa
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrack}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Existing Order
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Owner Info */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Sirsa Store Contact
            </h4>
            <div className="space-y-2 text-[#D9C4B0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>{STORE_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>Phone / WhatsApp: {STORE_DETAILS.phoneFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>Owner Email: {STORE_DETAILS.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5EDE4] text-xs font-medium transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Store Owner Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#3D2517] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A8917D]">
          <div>
            © {new Date().getFullYear()} Pure Sattva, Sirsa (Haryana). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Payment: Cash on Delivery (COD)</span>
            <span>·</span>
            <span>100% Traditional Lakdi Ghani</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
