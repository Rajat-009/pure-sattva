import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Instagram, MapPin, CheckCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

interface KolhuVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KolhuVideoModal: React.FC<KolhuVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [selectedSeed, setSelectedSeed] = useState<'mustard' | 'sesame' | 'groundnut'>('mustard');

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 150);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#22150D] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#523A28]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#3D2617] bg-[#2C180E]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse" />
            <h3 className="font-display text-base sm:text-lg font-bold text-[#F4ECE3]">
              Pure Sattva · Traditional Kolhu (Kachi Ghani) Video Demonstration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#EAD8C7] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Simulator Screen */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Simulated Kolhu Basin with Rotating Pestle */}
          <div className="absolute inset-0 bg-radial from-[#3B2212] via-[#1A0E08] to-black flex items-center justify-center">
            {/* Outer Stainless Steel Vat */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-[#7A6E65] bg-[#332218] flex items-center justify-center shadow-inner overflow-hidden">
              {/* Seed Bed Texture */}
              <div
                className={`absolute inset-0 opacity-80 transition-colors duration-500 ${
                  selectedSeed === 'mustard'
                    ? 'bg-amber-600'
                    : selectedSeed === 'sesame'
                    ? 'bg-stone-800'
                    : 'bg-amber-700'
                }`}
                style={{
                  backgroundImage: `radial-gradient(circle, ${
                    selectedSeed === 'sesame' ? '#111' : '#8B5A2B'
                  } 2px, transparent 2px)`,
                  backgroundSize: '8px 8px',
                }}
              />

              {/* Central Wooden Pestle with Churn Animation */}
              <div
                className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#4A2E18] border-4 border-[#8B5A2B] shadow-2xl flex items-center justify-center transition-transform"
                style={{
                  transform: isPlaying ? `rotate(${progress * 7.2}deg)` : 'rotate(0deg)',
                  transition: 'transform 0.1s linear',
                }}
              >
                {/* Wood Grain Core */}
                <div className="w-16 h-16 rounded-full bg-[#2C180E] border border-[#A06228]/50 flex items-center justify-center text-center">
                  <span className="text-[10px] font-mono text-[#D4A373] font-bold">
                    LAKDI KOLHU
                  </span>
                </div>
                {/* Friction arm indicator */}
                <div className="absolute top-0 right-0 w-3 h-8 bg-[#8B5A2B] rounded-full" />
              </div>

              {/* Oil Ring Droplets */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#F4C430]/60 pointer-events-none animate-spin"
                style={{ animationDuration: '18s' }}
              />
            </div>
          </div>

          {/* Reel Overlays */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
            <span className="bg-black/60 backdrop-blur-xs text-[#E5A93C] text-[11px] font-mono px-2 py-0.5 rounded border border-[#E5A93C]/30">
              ● SIRSA STORE LIVE PROCESS
            </span>
            <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2 py-0.5 rounded">
              Cold Churn: &lt; 38°C (No heat loss)
            </span>
          </div>

          {/* Center Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 w-14 h-14 rounded-full bg-[#E5A93C] hover:bg-[#F3C363] text-[#2C180E] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-20">
            <div
              className="h-full bg-[#E5A93C] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Video Controls & Context */}
        <div className="p-5 space-y-4 bg-[#2C180E]">
          {/* Seed Selector */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-[#D9C4B0]">
              <span className="font-semibold text-white">Select Batch:</span>
              <button
                onClick={() => setSelectedSeed('mustard')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedSeed === 'mustard'
                    ? 'bg-[#E5A93C] text-[#2C180E] font-bold'
                    : 'bg-[#3D2617] text-[#D9C4B0] hover:text-white'
                }`}
              >
                Yellow Mustard (Sarson)
              </button>
              <button
                onClick={() => setSelectedSeed('sesame')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedSeed === 'sesame'
                    ? 'bg-[#E5A93C] text-[#2C180E] font-bold'
                    : 'bg-[#3D2617] text-[#D9C4B0] hover:text-white'
                }`}
              >
                Black Sesame (Kala Til)
              </button>
              <button
                onClick={() => setSelectedSeed('groundnut')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedSeed === 'groundnut'
                    ? 'bg-[#E5A93C] text-[#2C180E] font-bold'
                    : 'bg-[#3D2617] text-[#D9C4B0] hover:text-white'
                }`}
              >
                Groundnut (Moongphali)
              </button>
            </div>

            <a
              href={STORE_DETAILS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#E5A93C] hover:underline flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Watch full reels on @puresattva_</span>
            </a>
          </div>

          {/* Description */}
          <div className="text-xs text-[#D9C4B0] leading-relaxed bg-[#22150D] p-3 rounded-xl border border-[#3D2617]">
            <p>
              <strong className="text-white">The Kolhu Advantage:</strong> Unlike high-speed iron expellers that crush seeds at 200°C and burn essential oils, Pure Sattva’s wooden mortar crushes at a gentle 14 rotations per minute. This keeps natural Vitamin E, aroma, and omega fatty acids 100% active.
            </p>
          </div>

          {/* Sirsa Store Invitation */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-2 text-[#EAD8C7]">
              <MapPin className="w-4 h-4 text-[#E5A93C]" />
              <span>You can visit our Sirsa store and watch your oil pressed live in front of you!</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#5C3A21] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
