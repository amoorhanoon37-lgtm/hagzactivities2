import React, { useState } from 'react';
import { QrCode, MapPin, XCircle, Star, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { Booking, Review } from '../types';

interface BookingsHubScreenProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string, refundEGP: number, pointsToRefund: number) => void;
  onSubmitReview: (review: Review) => void;
  onExplore: () => void;
}

export const BookingsHubScreen: React.FC<BookingsHubScreenProps> = ({
  bookings,
  onSelectBooking,
  onCancelBooking,
  onSubmitReview,
  onExplore
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  
  // Cancellation Modal State
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  // Review Modal State
  const [reviewingBooking, setReviewingBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [cleanliness, setCleanliness] = useState<number>(5);
  const [equipment, setEquipment] = useState<number>(5);
  const [staff, setStaff] = useState<number>(5);
  const [value, setValue] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  const filteredBookings = bookings.filter(b => b.status === activeTab);

  // Cancellation tier calculation
  const calculateRefund = (booking: Booking) => {
    const hoursUntilSlot = (booking.slotTimestamp - Date.now()) / (1000 * 3600);
    let refundPct = 0;
    if (hoursUntilSlot > 24) {
      refundPct = 1.0; // 100%
    } else if (hoursUntilSlot >= 4) {
      refundPct = 0.5; // 50%
    } else {
      refundPct = 0.0; // non-refundable
    }
    const refundAmount = Math.round(booking.totalAmountEGP * refundPct);
    const fee = booking.totalAmountEGP - refundAmount;
    return {
      pct: refundPct * 100,
      refundAmount,
      fee,
      hoursUntilSlot: Math.max(0, Math.round(hoursUntilSlot)),
      pointsRefunded: booking.pointsRedeemed
    };
  };

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    const { refundAmount, pointsRefunded } = calculateRefund(cancellingBooking);
    onCancelBooking(cancellingBooking.id, refundAmount, pointsRefunded);
    setCancellingBooking(null);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingBooking) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      venueId: reviewingBooking.venueId,
      bookingId: reviewingBooking.id,
      userName: 'Amr',
      rating: reviewRating,
      cleanliness,
      equipment,
      staff,
      value,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    };

    onSubmitReview(newRev);
    setReviewingBooking(null);
    setReviewComment('');
  };

  return (
    <div className="min-h-screen px-4 pb-28 pt-4 text-white animate-fade-in">
      {/* Screen Header */}
      <div className="mb-5">
        <p className="font-display text-[10px] uppercase text-[#F96A24] tracking-widest">
          Flexora Passbook
        </p>
        <h1 className="font-display text-3xl text-white mt-0.5">
          MY BOOKINGS
        </h1>
        <p className="text-xs text-[#BEBAB9]">
          Manage your upcoming passes, reviews, and cancellations.
        </p>
      </div>

      {/* Segmented Filter Tabs (Flexora Pill Buttons) */}
      <div className="flex gap-2 p-1.5 rounded-full bg-[#29211F] border border-[#71564A] mb-5">
        {(['upcoming', 'past', 'cancelled'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const count = bookings.filter(b => b.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-[#F96A24] text-white shadow-md shadow-[#F96A24]/30'
                  : 'text-[#BEBAB9] hover:text-white'
              }`}
            >
              <span>{tab}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-[#BEBAB9]'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="card-surface p-8 text-center border border-[#71564A] my-8">
          <p className="font-display text-lg text-white mb-1">
            NO {activeTab.toUpperCase()} BOOKINGS
          </p>
          <p className="text-xs text-[#BEBAB9] max-w-[260px] mx-auto mb-4">
            {activeTab === 'upcoming' 
              ? 'Discover exciting activities around Cairo and book your first session instantly.'
              : 'You have no past sessions in this category.'}
          </p>
          <button
            onClick={onExplore}
            className="py-2.5 px-6 rounded-full bg-[#F96A24] text-white font-bold text-xs uppercase shadow-lg shadow-[#F96A24]/30"
          >
            Explore Activities ↗
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="card-surface p-4 border border-[#71564A] hover:border-[#F96A24]/60 transition-all shadow-xl"
            >
              {/* Card Top Row */}
              <div className="flex items-start justify-between border-b border-[#71564A]/40 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#F96A24] tracking-wider">
                    {b.activityCategory.replace('_', ' ')}
                  </span>
                  <h3 className="font-display text-xl text-white mt-0.5">
                    {b.venueName}
                  </h3>
                  <p className="text-xs text-[#BEBAB9] mt-0.5">
                    {b.activityTitle} • <span className="text-white font-semibold">{b.unitAssigned}</span>
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  b.status === 'upcoming'
                    ? 'bg-[#F0F66E]/15 text-[#F0F66E] border border-[#F0F66E]/30'
                    : b.status === 'completed'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-red-500/15 text-red-400'
                }`}>
                  {b.status === 'upcoming' ? '🟢 Confirmed' : b.status}
                </span>
              </div>

              {/* Time & Players */}
              <div className="grid grid-cols-2 gap-2 py-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#BEBAB9] uppercase block">Scheduled</span>
                  <strong className="text-white">{b.date} • {b.time}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#BEBAB9] uppercase block">Party</span>
                  <strong className="text-white">{b.players} Players</strong>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                {b.status === 'upcoming' ? (
                  <>
                    <button
                      onClick={() => onSelectBooking(b)}
                      className="py-2 px-3.5 rounded-full bg-[#F96A24] text-white font-bold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-[#F96A24]/20"
                    >
                      <QrCode size={14} />
                      <span>View Pass</span>
                    </button>

                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.venueAddress)}`, '_blank')}
                      className="py-2 px-3 rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <MapPin size={12} />
                      <span>Directions</span>
                    </button>

                    <button
                      onClick={() => setCancellingBooking(b)}
                      className="text-xs text-[#BEBAB9] hover:text-red-400 py-2 px-2 transition-colors ml-auto"
                    >
                      Cancel
                    </button>
                  </>
                ) : b.status === 'completed' ? (
                  <>
                    <button
                      onClick={() => setReviewingBooking(b)}
                      className="py-2 px-4 rounded-full bg-[#F96A24] text-white font-bold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-[#F96A24]/20"
                    >
                      <Star size={13} className="fill-white" />
                      <span>Rate Experience ↗</span>
                    </button>
                    <span className="text-xs text-[#BEBAB9] ml-auto">
                      Paid {b.totalAmountEGP} EGP
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-red-400 italic">
                    Booking was cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transparent Cancellation & Tiered Refund Modal */}
      {cancellingBooking && (() => {
        const { pct, refundAmount, fee, hoursUntilSlot, pointsRefunded } = calculateRefund(cancellingBooking);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-[#0F0503] border border-[#71564A] rounded-[28px] p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center gap-2.5 text-red-400">
                <AlertTriangle size={24} />
                <h2 className="font-display text-2xl text-white">
                  CANCEL BOOKING?
                </h2>
              </div>

              <p className="text-xs text-[#BEBAB9]">
                Review the transparent Egyptian cancellation tiers for <strong className="text-white">{cancellingBooking.venueName}</strong>:
              </p>

              {/* Policy Tiers Table */}
              <div className="card-surface p-3.5 border border-[#71564A] space-y-2 text-xs">
                <div className={`flex justify-between items-center ${hoursUntilSlot > 24 ? 'text-[#F0F66E] font-bold' : 'text-[#BEBAB9]'}`}>
                  <span>&gt; 24h before slot:</span>
                  <span>100% Full Refund</span>
                </div>
                <div className={`flex justify-between items-center ${hoursUntilSlot >= 4 && hoursUntilSlot <= 24 ? 'text-[#F0F66E] font-bold' : 'text-[#BEBAB9]'}`}>
                  <span>4 to 24h before slot:</span>
                  <span>50% Partial Refund</span>
                </div>
                <div className={`flex justify-between items-center ${hoursUntilSlot < 4 ? 'text-red-400 font-bold' : 'text-[#BEBAB9]'}`}>
                  <span>&lt; 4h before slot:</span>
                  <span>Non-refundable (0%)</span>
                </div>
              </div>

              {/* Live Refund Calculation */}
              <div className="card-surface p-4 border border-[#71564A] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#BEBAB9]">
                  <span>Time until start:</span>
                  <span className="text-white font-medium">{hoursUntilSlot} hours</span>
                </div>
                <div className="flex justify-between text-[#BEBAB9]">
                  <span>Total Paid:</span>
                  <span className="text-white font-medium">{cancellingBooking.totalAmountEGP} EGP</span>
                </div>
                <div className="flex justify-between text-[#BEBAB9]">
                  <span>Cancellation Fee:</span>
                  <span className="text-white font-medium">{fee} EGP</span>
                </div>
                {pointsRefunded > 0 && (
                  <div className="flex justify-between text-[#F0F66E] font-semibold">
                    <span>Points Reversal:</span>
                    <span>+{pointsRefunded.toLocaleString()} pts returned to wallet</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-bold">
                  <span className="text-white uppercase font-display">Calculated Refund:</span>
                  <span className="text-xl font-display text-[#F0F66E]">
                    {refundAmount} EGP ({pct}%)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setCancellingBooking(null)}
                  className="w-full py-3.5 rounded-full bg-[#29211F] border border-[#71564A] text-white font-bold text-xs uppercase hover:border-[#F96A24]"
                >
                  Keep My Booking
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="w-full py-3.5 rounded-full bg-red-950/60 border border-red-500 text-red-400 font-bold text-xs uppercase hover:bg-red-500 hover:text-white transition-all"
                >
                  Confirm Cancellation ↗
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Verified 5-Star Review Modal */}
      {reviewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#0F0503] border border-[#71564A] rounded-[28px] p-6 text-white shadow-2xl space-y-4">
            <div>
              <p className="font-display text-[10px] text-[#F96A24] uppercase tracking-wider">
                Verified Customer Review
              </p>
              <h2 className="font-display text-2xl text-white mt-0.5">
                RATE YOUR EXPERIENCE
              </h2>
              <p className="text-xs text-[#BEBAB9]">
                {reviewingBooking.venueName} • {reviewingBooking.activityTitle}
              </p>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              {/* 5-Star Bar */}
              <div className="card-surface p-4 border border-[#71564A] text-center">
                <span className="text-xs font-semibold text-[#BEBAB9] block mb-2 uppercase">
                  Overall Rating
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        size={28}
                        className={star <= reviewRating ? 'fill-[#F96A24] text-[#F96A24]' : 'text-[#71564A]'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Category Sliders */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#BEBAB9]">Cleanliness & Safety</span>
                  <span className="font-bold text-[#F96A24]">{cleanliness}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={cleanliness}
                  onChange={(e) => setCleanliness(Number(e.target.value))}
                  className="w-full accent-[#F96A24]"
                />

                <div className="flex justify-between items-center">
                  <span className="text-[#BEBAB9]">Equipment Quality</span>
                  <span className="font-bold text-[#F96A24]">{equipment}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={equipment}
                  onChange={(e) => setEquipment(Number(e.target.value))}
                  className="w-full accent-[#F96A24]"
                />

                <div className="flex justify-between items-center">
                  <span className="text-[#BEBAB9]">Staff Friendliness</span>
                  <span className="font-bold text-[#F96A24]">{staff}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={staff}
                  onChange={(e) => setStaff(Number(e.target.value))}
                  className="w-full accent-[#F96A24]"
                />

                <div className="flex justify-between items-center">
                  <span className="text-[#BEBAB9]">Value for Money</span>
                  <span className="font-bold text-[#F96A24]">{value}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full accent-[#F96A24]"
                />
              </div>

              {/* Comment text */}
              <div>
                <label className="block text-xs uppercase text-[#BEBAB9] mb-1">
                  Your Review / Comments
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell others what you enjoyed about this session..."
                  className="w-full p-3 rounded-2xl bg-[#29211F] border border-[#71564A] text-white text-xs focus:border-[#F96A24] focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewingBooking(null)}
                  className="flex-1 py-3 rounded-full bg-[#29211F] border border-[#71564A] text-white text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#F96A24] text-white text-xs font-bold uppercase shadow-lg shadow-[#F96A24]/30 hover:brightness-110"
                >
                  Submit Review ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
