import React from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, ShieldCheck, Heart, Star, Navigation, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

export const StoreInfoSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sunita Sharma',
      location: 'Barnala Road, Sirsa',
      review: 'I stopped buying packaged refined mustard oil after trying Pure Sattva’s Lakdi Ghani Sarson oil. The natural aroma in tadka reminds me of my grandmother’s kitchen in Haryana. Pure and honest quality.',
      rating: 5,
      product: 'Wood-Pressed Yellow Mustard Oil',
    },
    {
      name: 'Dr. Rajesh Chhabra',
      location: 'Civil Lines, Sirsa',
      review: 'Being a doctor, I always advise patients with cardiovascular concerns to switch to cold-pressed groundnut or mustard oil. Pure Sattva extracts it right in front of your eyes with zero chemicals. Exceptional purity.',
      rating: 5,
      product: 'Wood-Pressed Groundnut Oil',
    },
    {
      name: 'Pooja Verma',
      location: 'Begu Road, Sirsa',
      review: 'The Desi Sahiwal cow bilona ghee is genuinely golden and granular (daanedaar). It smells divine on hot phulkas! Same-day home delivery in Sirsa is so convenient.',
      rating: 5,
      product: 'Desi Gir/Sahiwal Cow A2 Ghee',
    },
  ];

  return (
    <section id="sirsa-store" className="py-16 bg-[#FAF8F5] border-b border-[#E8DEC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* About Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E0D2C0] text-xs font-semibold text-[#5A381E]">
              <MapPin className="w-3.5 h-3.5 text-[#C4823F]" />
              <span>Sirsa Roots · Local Farm Sourcing</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3B2212] leading-tight">
              Rooted in Sirsa, Dedicated to Pure Natural Nutrition.
            </h2>

            <p className="text-sm sm:text-base text-[#5C4535] leading-relaxed">
              Pure Sattva was founded in Sirsa, Haryana with a straightforward mission: restore honest, traditional food to Indian households. We believe that what goes into your family’s meals should be completely free of industrial hexanes, bleaching clays, and synthetic preservatives.
            </p>

            <p className="text-xs sm:text-sm text-[#5C4535] leading-relaxed">
              We source non-GMO seeds directly from trusted local farmers across Haryana and Rajasthan. Our traditional wooden Kolhus (Lakdi Ghani) extract pure oils at ambient room temperatures, preserving every drop of life-giving vitamin E and natural aroma.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#EBE1D5] shadow-xs">
                <span className="font-bold text-xs text-[#3B2212] block">100% Zero Chemicals</span>
                <span className="text-[11px] text-[#7A6150] mt-0.5 block">No preservatives, argemone, or solvents.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#EBE1D5] shadow-xs">
                <span className="font-bold text-xs text-[#3B2212] block">Sirsa Same-Day Delivery</span>
                <span className="text-[11px] text-[#7A6150] mt-0.5 block">Fast local dispatch across all Sirsa sectors.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#EBE1D5] shadow-xs">
                <span className="font-bold text-xs text-[#3B2212] block">Vedic Traditions</span>
                <span className="text-[11px] text-[#7A6150] mt-0.5 block">Kolhu wood churn & A2 Bilona cow ghee.</span>
              </div>
            </div>
          </div>

          {/* Store Location & Timings Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-md border border-[#E0D4C3] space-y-5">
            <div>
              <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">
                Visit Our Physical Store
              </span>
              <h3 className="font-display text-xl font-bold text-[#3B2212] mt-0.5">
                {STORE_DETAILS.name} Store
              </h3>
              <p className="text-xs text-[#5C4535] mt-1">
                Near City Centre / Barnala Road, Sirsa, Haryana 125055
              </p>
            </div>

            {/* Operating Hours */}
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EBE1D5] space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-[#3B2212] font-semibold">
                <Clock className="w-4 h-4 text-[#8B5A2B]" />
                <span>Store Opening Hours</span>
              </div>
              <div className="flex justify-between text-[#5C4535] pt-1 border-t border-[#EFE7DE]">
                <span>Monday – Saturday:</span>
                <span className="font-medium text-[#2C1810]">9:00 AM – 8:30 PM</span>
              </div>
              <div className="flex justify-between text-[#5C4535]">
                <span>Sunday:</span>
                <span className="font-medium text-[#2C1810]">10:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-2 text-xs">
              <a
                href={STORE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-[#E8F5E9] hover:bg-[#DCF0DE] border border-[#C5E1A5] text-[#1F5C24] font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
                <span>Chat on WhatsApp (+91 8059048843)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${STORE_DETAILS.phone}`}
                  className="py-2 px-3 bg-[#FAF4ED] hover:bg-[#EFE5D8] border border-[#D9C4B0] text-[#3B2212] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Call Store</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Sirsa Haryana India')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 bg-[#FAF4ED] hover:bg-[#EFE5D8] border border-[#D9C4B0] text-[#3B2212] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Instagram Follow */}
            <div className="pt-2 border-t border-[#EAE0D5] flex items-center justify-between text-xs">
              <span className="text-[#7A6150]">Follow our daily extraction:</span>
              <a
                href={STORE_DETAILS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#8B5A2B] hover:text-[#3B2212] flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@puresattva_</span>
              </a>
            </div>
          </div>
        </div>

        {/* Customer Testimonials & Reviews */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">
              Trusted by Sirsa Families
            </span>
            <h3 className="font-display text-2xl font-bold text-[#3B2212]">
              Real Feedback from Our Regular Patrons
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#EBE1D5] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-[#F4C430]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5C4535] leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE7DE] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#2C1810] block">{t.name}</span>
                    <span className="text-[11px] text-[#7A6150]">{t.location}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#8B5A2B] bg-[#FAF7F2] px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
