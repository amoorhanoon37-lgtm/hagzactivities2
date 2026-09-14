import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, AlertTriangle, Check } from 'lucide-react';

interface LoyaltyRedemptionCardProps {
  availablePoints: number;
  redeemedPoints: number;
  onApplyPoints: (points: number) => void;
  onRemovePoints: () => void;
}

export const LoyaltyRedemptionCard: React.FC<LoyaltyRedemptionCardProps> = ({
  availablePoints,
  redeemedPoints,
  onApplyPoints,
  onRemovePoints
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputPoints, setInputPoints] = useState<string>(
    redeemedPoints > 0 ? redeemedPoints.toString() : availablePoints >= 1000 ? '1000' : '0'
  );
  const [activePreset, setActivePreset] = useState<number | null>(
    redeemedPoints > 0 ? Math.round((redeemedPoints / availablePoints) * 100) : null
  );
  const [errorNotice, setErrorNotice] = useState<string>('');

  // 4 Presets based on available balance (25%, 50%, 75%, 100%)
  const presets = [
    { pct: 25, pts: Math.floor((availablePoints * 0.25) / 100) * 100 },
    { pct: 50, pts: Math.floor((availablePoints * 0.50) / 100) * 100 },
    { pct: 75, pts: Math.floor((availablePoints * 0.75) / 100) * 100 },
    { pct: 100, pts: Math.floor(availablePoints / 100) * 100 }
  ];

  const handleSelectPreset = (pts: number, pct: number) => {
    setActivePreset(pct);
    setInputPoints(pts.toString());
    setErrorNotice('');
  };

  const handleInputChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    setInputPoints(clean);
    setActivePreset(null);
    setErrorNotice('');
  };

  const handleRedeem = () => {
    const pts = parseInt(inputPoints, 10) || 0;

    if (pts > availablePoints) {
      setErrorNotice(`You only have ${availablePoints.toLocaleString()} points available.`);
      return;
    }

    if (pts < 1000) {
      setErrorNotice('Minimum redemption is 1,000 points (10 EGP minimum discount).');
      return;
    }

    onApplyPoints(pts);
    setErrorNotice('');
  };

  const discountEGP = Math.floor(redeemedPoints / 100);

  return (
    <div className="card-surface p-5 mb-5 border border-[#71564A] shadow-xl overflow-hidden animate-fade-in">
      {/* Accordion Toggle Header (Matching Reference Header) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] text-[#F96A24]">
            <Star size={18} className="fill-[#F96A24]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Did you have points to redeem?
            </h3>
            <p className="text-[11px] text-[#BEBAB9]">
              Every 100 points = 1 EGP discount
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-[#F96A24] bg-[#F96A24]/10 px-2.5 py-1 rounded-full border border-[#F96A24]/30">
            <Star size={11} className="fill-[#F96A24]" />
            {availablePoints.toLocaleString()} Points
          </span>
          <button className="text-[#BEBAB9] hover:text-white">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-[#71564A]/40 space-y-4">
          {/* Rule Warning Notice Banner (Identical to Reference Notice) */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
            <AlertTriangle size={14} className="shrink-0 text-amber-400" />
            <span>Use points or a promo code — not both</span>
          </div>

          {redeemedPoints > 0 ? (
            /* Applied State */
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {redeemedPoints.toLocaleString()} Points Applied
                  </span>
                  <span className="text-[11px] font-semibold text-[#F0F66E]">
                    -{discountEGP} EGP discount applied to total
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onRemovePoints}
                className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded-lg border border-red-500/30"
              >
                Remove
              </button>
            </div>
          ) : (
            /* Unapplied Redemption Controls */
            <>
              {/* Preset Percentage Chip Buttons (Grid of 4 Columns matching Reference) */}
              <div className="grid grid-cols-4 gap-2">
                {presets.map((preset) => {
                  const isSelected = activePreset === preset.pct;
                  return (
                    <button
                      key={preset.pct}
                      type="button"
                      onClick={() => handleSelectPreset(preset.pts, preset.pct)}
                      className={`py-2.5 px-1 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#F96A24] border-transparent text-white shadow-lg shadow-[#F96A24]/30 scale-[1.02]'
                          : 'bg-[#0F0503] border-[#71564A] text-white hover:border-[#F96A24]/60'
                      }`}
                    >
                      <strong className="block text-xs font-bold font-display">
                        {preset.pts}
                      </strong>
                      <span className={`block text-[10px] ${isSelected ? 'text-white/90' : 'text-[#BEBAB9]'}`}>
                        {preset.pct}%
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Points to Redeem Input Container (Matching Reference Form Field) */}
              <div className="relative rounded-2xl border border-[#71564A] bg-[#0F0503] px-3.5 pt-2 pb-2.5 focus-within:border-[#F96A24] transition-colors">
                <span className="block text-[10px] font-semibold uppercase text-[#BEBAB9]">
                  Points to redeem
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <input
                    type="text"
                    value={inputPoints}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Enter points..."
                    className="w-full bg-transparent text-white text-base font-bold focus:outline-none"
                  />
                  <span className="text-xs font-bold text-[#BEBAB9] uppercase pl-2">
                    pts
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#BEBAB9] px-1">
                <span>Available {availablePoints.toLocaleString()} points</span>
                <span className="text-[#F0F66E] font-medium">Min 1,000 pts (10 EGP)</span>
              </div>

              {errorNotice && (
                <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded-xl border border-red-500/30">
                  {errorNotice}
                </p>
              )}

              {/* Redeem Button (Pill Button Matching Reference) */}
              <button
                type="button"
                onClick={handleRedeem}
                disabled={availablePoints < 1000}
                className="w-full py-3.5 rounded-full bg-[#F96A24] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F96A24]/30 transition-all"
              >
                Redeem {parseInt(inputPoints, 10) ? `${parseInt(inputPoints, 10).toLocaleString()} points` : 'Points'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
