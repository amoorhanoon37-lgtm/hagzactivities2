import React, { useState } from 'react';
import { 
  User, Award, Star, Heart, Phone, MessageSquare, MapPin, 
  ChevronRight, Shield, Bell, Globe, PlusCircle, RefreshCw, CheckCircle
} from 'lucide-react';
import { Venue } from '../types';

interface ProfileScreenProps {
  loyaltyPoints: number;
  favoriteVenues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onOpenSuggestModal: () => void;
  onResetData: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  loyaltyPoints,
  favoriteVenues,
  onSelectVenue,
  onOpenSuggestModal,
  onResetData,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [preferredDistrict, setPreferredDistrict] = useState('New Cairo');
  const [resetSuccess, setResetSuccess] = useState(false);

  const pointsValueEgp = (loyaltyPoints / 100).toFixed(2);
  const nextTierPoints = 2000;
  const progressPercent = Math.min(100, Math.round((loyaltyPoints / nextTierPoints) * 100));

  const handleReset = () => {
    onResetData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0F0503] text-white pb-32">
      {/* Top Header */}
      <div className="bg-[#29211F]/80 backdrop-blur-xl border-b border-[#71564A]/40 px-4 pt-8 pb-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F96A24] to-[#F0F66E] p-0.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-[#0F0503] flex items-center justify-center">
                <User className="w-8 h-8 text-[#F96A24]" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#F0F66E] text-[#0F0503] p-1 rounded-full text-[10px] font-black">
              ★
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-anton text-2xl uppercase tracking-wide text-white">
                Omar Al-Masry
              </h1>
              <span className="bg-[#F96A24]/20 text-[#F96A24] border border-[#F96A24]/40 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                Gold Member
              </span>
            </div>
            <p className="text-xs text-[#BEBAB9] mt-0.5">
              +20 102 345 6789 • Cairo, Egypt
            </p>
            <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
              Member since Jan 2025 • 8 bookings completed
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* LOYALTY POINTS WALLET CARD */}
        <div className="bg-gradient-to-br from-[#29211F] via-[#29211F] to-[#71564A]/40 rounded-3xl border-2 border-[#F96A24]/60 p-5 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow Behind Points */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F96A24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F96A24] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                Hagz Rewards Club
              </div>
              <div className="font-anton text-4xl text-white mt-1 tracking-wide">
                {loyaltyPoints.toLocaleString()}{' '}
                <span className="text-lg text-[#F0F66E] font-sans font-bold">PTS</span>
              </div>
              <div className="text-xs text-[#BEBAB9] mt-1">
                Equivalent Cash Value:{' '}
                <span className="text-emerald-400 font-black text-sm">{pointsValueEgp} EGP</span>
              </div>
            </div>

            <div className="text-right">
              <span className="bg-[#F0F66E] text-[#0F0503] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Reward Rules Breakdown Banner */}
          <div className="mt-4 bg-[#0F0503]/80 rounded-2xl p-3 border border-[#71564A]/60 text-xs text-[#BEBAB9] space-y-1 relative z-10">
            <div className="flex items-center justify-between text-white font-bold">
              <span>Earning Rate:</span>
              <span className="text-[#F0F66E]">Pay 50 EGP → Earn 100 Points</span>
            </div>
            <div className="flex items-center justify-between text-white font-bold">
              <span>Redemption Rate:</span>
              <span className="text-emerald-400">100 Points = 1.00 EGP Discount</span>
            </div>
            <div className="text-[10px] text-[#BEBAB9]/80 pt-1 border-t border-[#71564A]/30">
              * Minimum discount redeemable at checkout is 10 EGP (1,000 pts).
            </div>
          </div>

          {/* Tier Progress Bar */}
          <div className="mt-4 space-y-1.5 relative z-10">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#BEBAB9]">Gold Tier</span>
              <span className="text-[#F0F66E]">
                {loyaltyPoints} / {nextTierPoints} PTS to Platinum
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#0F0503] rounded-full overflow-hidden p-0.5 border border-[#71564A]/40">
              <div
                className="h-full bg-gradient-to-r from-[#F96A24] to-[#F0F66E] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Suggest a Place Banner Entry Point */}
        <div className="bg-[#29211F] p-4 rounded-3xl border border-[#71564A]/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F96A24]/10 border border-[#F96A24]/30 flex items-center justify-center shrink-0">
              <PlusCircle className="w-5 h-5 text-[#F96A24]" />
            </div>
            <div>
              <h4 className="font-anton text-base uppercase text-white">
                Suggest a Missing Place
              </h4>
              <p className="text-xs text-[#BEBAB9]">
                Are you a venue owner or know a great local spot?
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSuggestModal}
            className="py-2 px-4 rounded-xl bg-[#F96A24] text-[#0F0503] font-anton text-xs uppercase tracking-wider hover:bg-[#ff7733] transition-colors shrink-0"
          >
            Add Spot
          </button>
        </div>

        {/* Saved Favorites Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              Favorite Places ({favoriteVenues.length})
            </h3>
          </div>

          {favoriteVenues.length === 0 ? (
            <div className="bg-[#29211F]/50 p-4 rounded-2xl border border-[#71564A]/30 text-center text-xs text-[#BEBAB9]">
              No favorites saved yet. Tap the heart icon on any venue to save it here!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favoriteVenues.map((venue) => (
                <div
                  key={venue.id}
                  onClick={() => onSelectVenue(venue)}
                  className="bg-[#29211F] p-3 rounded-2xl border border-[#71564A]/40 flex items-center gap-3 hover:border-[#F96A24] cursor-pointer transition-colors"
                >
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-anton text-sm text-white uppercase truncate">
                      {venue.name}
                    </h4>
                    <p className="text-xs text-[#BEBAB9] truncate">{venue.area}</p>
                    <p className="text-xs text-emerald-400 font-bold">
                      {venue.activities[0]?.basePriceEGP || 200} EGP/hr
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferences & Settings */}
        <div className="bg-[#29211F] p-5 rounded-3xl border border-[#71564A]/40 space-y-4">
          <h3 className="font-anton text-base uppercase tracking-wider text-white">
            Booking Preferences
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-[#71564A]/30 text-xs">
            <div className="flex items-center gap-2 text-[#BEBAB9]">
              <MapPin className="w-4 h-4 text-[#F96A24]" />
              <span>Default Cairo District</span>
            </div>
            <select
              value={preferredDistrict}
              onChange={(e) => setPreferredDistrict(e.target.value)}
              className="bg-[#0F0503] text-white border border-[#71564A]/60 px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-[#F96A24]"
            >
              <option value="New Cairo">New Cairo</option>
              <option value="Sheikh Zayed">Sheikh Zayed</option>
              <option value="Maadi">Maadi</option>
              <option value="Nasr City">Nasr City</option>
              <option value="Heliopolis">Heliopolis</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#71564A]/30 text-xs">
            <div className="flex items-center gap-2 text-[#BEBAB9]">
              <Bell className="w-4 h-4 text-[#F96A24]" />
              <span>SMS & WhatsApp Confirmations</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notificationsEnabled ? 'bg-[#F96A24]' : 'bg-[#0F0503]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 text-xs">
            <div className="flex items-center gap-2 text-[#BEBAB9]">
              <Globe className="w-4 h-4 text-[#F96A24]" />
              <span>Language / اللغة</span>
            </div>
            <span className="text-xs font-bold text-white bg-[#0F0503] px-3 py-1 rounded-xl border border-[#71564A]/40">
              English (Cairo EET)
            </span>
          </div>
        </div>

        {/* Egyptian Customer Support Section */}
        <div className="bg-[#29211F] p-5 rounded-3xl border border-[#71564A]/40 space-y-3">
          <h3 className="font-anton text-base uppercase tracking-wider text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Direct Egyptian Support
          </h3>
          <p className="text-xs text-[#BEBAB9]">
            Have an issue with a venue or need to modify your booking? Our Cairo-based team is on standby 24/7.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-[#0F0503] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-2 text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Help
            </a>
            <a
              href="tel:19724"
              className="p-3 rounded-2xl bg-[#0F0503] border border-[#F96A24]/40 text-[#F96A24] hover:bg-[#F96A24]/10 transition-colors flex items-center justify-center gap-2 text-xs font-bold"
            >
              <Phone className="w-4 h-4" />
              Hotline 19724
            </a>
          </div>
        </div>

        {/* Demo Reset Simulation Button */}
        <div className="pt-2 text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-xs text-[#BEBAB9]/70 hover:text-red-400 transition-colors p-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Demo Data & Points
          </button>
          {resetSuccess && (
            <div className="text-xs text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Reset to defaults successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
