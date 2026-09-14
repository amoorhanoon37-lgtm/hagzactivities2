import React from 'react';
import { PlusCircle, Sparkles, MapPin } from 'lucide-react';
import { CairoDistrict } from '../types';

interface HeaderProps {
  currentArea: CairoDistrict | string;
  onOpenAreaDrawer: () => void;
  onOpenSuggestModal: () => void;
  pointsBalance: number;
  onOpenProfile: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentArea,
  onOpenAreaDrawer,
  onOpenSuggestModal,
  pointsBalance,
  onOpenProfile,
  onLogoClick
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0F0503]/90 backdrop-blur-md px-4 py-3 border-b border-[#71564A]/40 flex items-center justify-between gap-2">
      {/* Brand Logo & Area Selector */}
      <div className="flex items-center gap-2.5">
        <button 
          onClick={onLogoClick}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#F96A24] to-[#f98244] font-display text-lg text-white shadow-[0_4px_16px_rgba(249,106,36,0.3)] hover:scale-105 transition-transform"
        >
          H
        </button>
        <div>
          <button 
            onClick={onLogoClick}
            className="font-display text-sm tracking-wider text-white flex items-center gap-1 text-left"
          >
            HAGZ<span className="text-[#F96A24]">ACTIVITIES</span>
          </button>
          <button 
            onClick={onOpenAreaDrawer}
            className="flex items-center gap-1 text-[11px] font-medium text-[#BEBAB9] hover:text-white transition-colors"
          >
            <MapPin size={10} className="text-[#F96A24]" />
            <span>{currentArea}</span>
            <span className="text-[9px] text-[#71564A]">▾</span>
          </button>
        </div>
      </div>

      {/* Action Buttons: Suggest a Place & Points Wallet */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSuggestModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] text-white text-[11px] font-semibold hover:border-[#F96A24] transition-all"
          title="Suggest a new recreation venue in Egypt"
        >
          <PlusCircle size={13} className="text-[#F96A24]" />
          <span>Suggest a Place</span>
        </button>

        <button
          onClick={onOpenProfile}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F96A24]/15 border border-[#F96A24]/60 text-[#F96A24] text-[11px] font-bold hover:bg-[#F96A24]/25 transition-all shadow-[0_2px_10px_rgba(249,106,36,0.2)]"
          title="View Loyalty Points & Profile"
        >
          <Sparkles size={12} className="text-[#F0F66E] fill-[#F0F66E]" />
          <span>{pointsBalance.toLocaleString()} pts</span>
        </button>
      </div>
    </header>
  );
};
