import React, { useState } from 'react';
import { 
  ArrowLeft, Star, MapPin, Clock, ShieldCheck, Heart, Share2, 
  Wifi, Car, Coffee, Sparkles, AlertCircle, ChevronRight, Check, Users
} from 'lucide-react';
import { Venue, Activity } from '../types';

interface VenueDetailScreenProps {
  venue: Venue;
  onBack: () => void;
  onProceedToCheckout: (
    venue: Venue,
    activity: Activity,
    unit: string,
    date: string,
    time: string,
    players: number
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (venueId: string) => void;
}

export const VenueDetailScreen: React.FC<VenueDetailScreenProps> = ({
  venue,
  onBack,
  onProceedToCheckout,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const selectedActivity: Activity = venue.activities[selectedActivityIndex] || venue.activities[0];
  
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>('07:00 PM');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [players, setPlayers] = useState<number>(
    selectedActivity ? Math.min(2, selectedActivity.maxPeople) : 2
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generate next 7 days in Cairo EET
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = i === 0 ? 'TODAY' : i === 1 ? 'TOMORROW' : d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const isoDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return { dayName, dateStr, isoDate };
  });

  // Time slots in 30-min intervals
  const timeSlots = [
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true },
    { time: '05:00 PM', available: false },
    { time: '05:30 PM', available: true },
    { time: '06:00 PM', available: true },
    { time: '06:30 PM', available: true },
    { time: '07:00 PM', available: true, popular: true },
    { time: '07:30 PM', available: true, popular: true },
    { time: '08:00 PM', available: true, popular: true },
    { time: '08:30 PM', available: false },
    { time: '09:00 PM', available: true },
    { time: '09:30 PM', available: true },
    { time: '10:00 PM', available: true },
    { time: '10:30 PM', available: true },
    { time: '11:00 PM', available: true },
    { time: '11:30 PM', available: false },
  ];

  const currentPrice = selectedActivity ? selectedActivity.basePriceEGP : 300;
  const unitLabel = selectedActivity ? selectedActivity.unitLabel : 'Unit';
  const unitName = `${unitLabel} #${selectedUnitNumber}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${venue.name} - HagzActivities`,
        text: `Book ${selectedActivity?.title || 'activities'} at ${venue.name} in ${venue.area}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleBookNow = () => {
    if (!selectedActivity) return;
    onProceedToCheckout(
      venue,
      selectedActivity,
      unitName,
      dates[selectedDateIndex].isoDate,
      selectedSlot,
      players
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0503] text-white pb-36">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#F96A24] text-[#0F0503] font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-sm animate-bounce">
          <Sparkles className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Top Floating Controls */}
      <div className="fixed top-4 left-0 right-0 z-40 max-w-2xl mx-auto px-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto p-3 rounded-full bg-[#0F0503]/80 backdrop-blur-md border border-[#71564A]/40 text-white hover:text-[#F96A24] transition-colors shadow-lg"
          aria-label="Back to explore"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => onToggleFavorite(venue.id)}
            className={`p-3 rounded-full bg-[#0F0503]/80 backdrop-blur-md border border-[#71564A]/40 transition-colors shadow-lg ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-400'
            }`}
            aria-label="Save to favorites"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-[#0F0503]/80 backdrop-blur-md border border-[#71564A]/40 text-white hover:text-[#F96A24] transition-colors shadow-lg"
            aria-label="Share venue"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        <img
          src={venue.images[0] || 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1200&auto=format&fit=crop&q=80'}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0503] via-[#0F0503]/40 to-transparent" />
        
        {/* Status Pills */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-[#29211F]/90 backdrop-blur-md border border-[#71564A]/60 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Availability
            </span>
            <span className="bg-[#F0F66E] text-[#0F0503] px-2.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase">
              Instant Confirm
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#0F0503]/90 px-3 py-1.5 rounded-full border border-[#71564A]/40 text-xs font-bold text-[#F96A24]">
            <Star className="w-3.5 h-3.5 fill-[#F96A24]" />
            {venue.rating.toFixed(1)} ({venue.reviewCount})
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-6">
        {/* Title & Location Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#BEBAB9] uppercase tracking-wider mb-1">
            <span>{venue.area}</span>
            <span>•</span>
            <span>{venue.activities.map(a => a.title).join(' & ')}</span>
          </div>
          <h1 className="font-anton text-3xl sm:text-4xl text-white tracking-wide uppercase">
            {venue.name}
          </h1>
          <p className="text-sm text-[#BEBAB9] mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#F96A24] shrink-0" />
            <span>{venue.address}</span>
          </p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>Open today until 02:00 AM EET</span>
          </p>
        </div>

        {/* Multi-Activity Switcher */}
        {venue.activities.length > 1 && (
          <div className="bg-[#29211F] p-3 rounded-2xl border border-[#71564A]/40 space-y-2">
            <div className="text-xs text-[#BEBAB9] font-bold uppercase tracking-wider">
              Select Activity
            </div>
            <div className="flex gap-2">
              {venue.activities.map((act, idx) => (
                <button
                  key={act.id}
                  onClick={() => {
                    setSelectedActivityIndex(idx);
                    setPlayers(Math.min(2, act.maxPeople));
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedActivityIndex === idx
                      ? 'bg-[#F96A24] text-[#0F0503] shadow-md shadow-[#F96A24]/20'
                      : 'bg-[#0F0503]/60 text-white hover:bg-[#0F0503]'
                  }`}
                >
                  {act.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Activity Description */}
        {selectedActivity && (
          <div className="bg-[#29211F]/60 p-4 rounded-2xl border border-[#71564A]/30">
            <h3 className="font-anton text-base uppercase text-white tracking-wide">
              {selectedActivity.title}
            </h3>
            <p className="text-xs text-[#BEBAB9] mt-1 leading-relaxed">
              {selectedActivity.description}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-[#F0F66E] font-bold">
              <span>Capacity: {selectedActivity.minPeople} - {selectedActivity.maxPeople} Players</span>
              <span>•</span>
              <span>{selectedActivity.durationMinutes} Min Sessions</span>
            </div>
          </div>
        )}

        {/* Step 1: Select Date Rail */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-anton text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F96A24] text-[#0F0503] text-xs font-black flex items-center justify-center">1</span>
              Choose Date
            </h2>
            <span className="text-xs text-[#BEBAB9]">Cairo EET</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((d, index) => {
              const isSelected = selectedDateIndex === index;
              return (
                <button
                  key={d.isoDate}
                  onClick={() => setSelectedDateIndex(index)}
                  className={`flex flex-col items-center min-w-[76px] py-3 px-2 rounded-2xl border transition-all text-center ${
                    isSelected
                      ? 'bg-[#F96A24] border-[#F96A24] text-[#0F0503] shadow-lg shadow-[#F96A24]/20 scale-105'
                      : 'bg-[#29211F] border-[#71564A]/40 text-[#BEBAB9] hover:border-[#71564A]'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-[#0F0503]' : 'text-[#BEBAB9]'}`}>
                    {d.dayName}
                  </span>
                  <span className={`text-sm font-black mt-1 ${isSelected ? 'text-[#0F0503]' : 'text-white'}`}>
                    {d.dateStr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Unit / Station */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-anton text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F96A24] text-[#0F0503] text-xs font-black flex items-center justify-center">2</span>
              Select {unitLabel}
            </h2>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Instant Assignment
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Array.from({ length: Math.min(6, selectedActivity?.totalUnits || 4) }, (_, i) => i + 1).map((unitNum) => {
              const isSelected = selectedUnitNumber === unitNum;
              return (
                <button
                  key={unitNum}
                  onClick={() => setSelectedUnitNumber(unitNum)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#29211F] border-[#F0F66E] ring-1 ring-[#F0F66E]'
                      : 'bg-[#29211F]/60 border-[#71564A]/40 hover:border-[#71564A]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {unitLabel} #{unitNum}
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#F0F66E]" />}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">
                      Available
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Select Time Slot & Player Count */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-anton text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F96A24] text-[#0F0503] text-xs font-black flex items-center justify-center">3</span>
              Select Start Time & Players
            </h2>
          </div>

          {/* Players Stepper */}
          <div className="flex items-center justify-between bg-[#29211F] p-3 rounded-2xl border border-[#71564A]/40">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Users className="w-4 h-4 text-[#F96A24]" />
              <span>Party Size</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPlayers(Math.max(selectedActivity?.minPeople || 1, players - 1))}
                className="w-8 h-8 rounded-xl bg-[#0F0503] text-white font-bold flex items-center justify-center border border-[#71564A]/60"
              >
                -
              </button>
              <span className="font-anton text-base text-white">{players} Players</span>
              <button
                onClick={() => setPlayers(Math.min(selectedActivity?.maxPeople || 6, players + 1))}
                className="w-8 h-8 rounded-xl bg-[#0F0503] text-white font-bold flex items-center justify-center border border-[#71564A]/60"
              >
                +
              </button>
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`py-3 px-2 rounded-xl text-center border font-bold text-xs relative transition-all ${
                    !slot.available
                      ? 'bg-[#0F0503]/40 border-transparent text-[#BEBAB9]/30 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-[#F0F66E] border-[#F0F66E] text-[#0F0503] font-black shadow-md shadow-[#F0F66E]/20 scale-105'
                      : 'bg-[#29211F] border-[#71564A]/40 text-white hover:border-[#F96A24]'
                  }`}
                >
                  {slot.time}
                  {slot.popular && slot.available && !isSelected && (
                    <span className="absolute -top-1.5 -right-1 bg-[#F96A24] text-[9px] text-[#0F0503] font-black px-1 rounded-full">
                      HOT
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Venue Amenities */}
        <div className="bg-[#29211F] p-4 rounded-2xl border border-[#71564A]/40 space-y-3">
          <h3 className="font-anton text-sm uppercase tracking-wider text-white">
            Venue Amenities & Features
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#BEBAB9]">
            {venue.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#F0F66E]" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tiered Cancellation Policy Notice */}
        <div className="bg-[#0F0503] p-4 rounded-2xl border border-[#71564A]/60 space-y-2">
          <div className="flex items-center gap-2 text-[#F96A24] text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            Tiered Cancellation & Refund Policy
          </div>
          <div className="space-y-1.5 text-xs text-[#BEBAB9]">
            <p className="flex items-center justify-between">
              <span>More than 24 hours before start:</span>
              <span className="font-bold text-emerald-400">100% Instant Refund</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Between 4 and 24 hours before:</span>
              <span className="font-bold text-amber-400">50% Refund</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Less than 4 hours before:</span>
              <span className="font-bold text-red-400">Non-refundable</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0503]/95 backdrop-blur-xl border-t border-[#71564A]/60 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-[#BEBAB9] uppercase font-bold tracking-wider">
              {dates[selectedDateIndex].dayName} • {selectedSlot} • {unitName}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-anton text-2xl text-white">
                {currentPrice} EGP
              </span>
              <span className="text-xs text-[#BEBAB9]">
                ({selectedActivity?.durationMinutes || 60} min)
              </span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              + Earn {Math.floor((currentPrice / 50) * 100)} Points
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="flex-1 max-w-xs py-3.5 px-6 rounded-2xl bg-[#F96A24] hover:bg-[#ff7733] text-[#0F0503] font-anton text-base uppercase tracking-wider shadow-lg shadow-[#F96A24]/30 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <span>Lock Slot</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
