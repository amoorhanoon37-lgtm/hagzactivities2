import React, { useState } from 'react';
import { ArrowLeft, Check, Smartphone, Zap, CreditCard, Apple, Sparkles } from 'lucide-react';
import { Venue, Activity, AmenityAddOn, PaymentMethod, Booking } from '../types';
import { LoyaltyRedemptionCard } from './LoyaltyRedemptionCard';

interface CheckoutScreenProps {
  venue: Venue;
  activity: Activity;
  unit: string;
  date: string;
  time: string;
  players: number;
  availablePoints: number;
  onBack: () => void;
  onConfirmBooking: (bookingData: Partial<Booking>) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  venue,
  activity,
  unit,
  date,
  time,
  players,
  availablePoints,
  onBack,
  onConfirmBooking
}) => {
  // Selected extras
  const [selectedAddOns, setSelectedAddOns] = useState<AmenityAddOn[]>([]);
  
  // Loyalty points redemption state
  const [redeemedPoints, setRedeemedPoints] = useState<number>(0);

  // Selected Egyptian payment rail
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile_wallet');

  const handleToggleAddOn = (addon: AmenityAddOn) => {
    if (selectedAddOns.some(a => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  // Price calculations
  const basePrice = activity.basePriceEGP;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.priceEGP, 0);
  const serviceFee = 30;
  
  // 100 points = 1 EGP discount
  const pointsDiscount = Math.floor(redeemedPoints / 100);
  const totalDue = Math.max(0, basePrice + addOnsTotal + serviceFee - pointsDiscount);

  // For every 50 EGP paid, 100 points earned
  const pointsToEarn = Math.floor(totalDue / 50) * 100;

  const handlePayAndConfirm = () => {
    onConfirmBooking({
      venueId: venue.id,
      venueName: venue.name,
      venueAddress: venue.address,
      activityId: activity.id,
      activityCategory: activity.category,
      activityTitle: activity.title,
      unitAssigned: unit,
      date,
      time,
      players,
      basePrice,
      selectedAddOns,
      addOnsTotal,
      serviceFee,
      pointsRedeemed: redeemedPoints,
      pointsDiscountEGP: pointsDiscount,
      totalAmountEGP: totalDue,
      paymentMethod,
      pointsEarned: pointsToEarn,
      slotTimestamp: Date.now() + 2 * 3600 * 1000 // 2 hours in future by default
    });
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-4 animate-fade-in text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] flex items-center justify-center text-white hover:border-[#F96A24] transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="font-display text-[10px] uppercase text-[#F96A24] tracking-wider">
            Secure Checkout
          </p>
          <h1 className="font-display text-2xl text-white">
            YOUR HAGZ SUMMARY
          </h1>
        </div>
      </div>

      {/* Booking Summary Card */}
      <div className="card-surface p-4 mb-5 border border-[#71564A]">
        <div className="flex items-start justify-between border-b border-[#71564A]/40 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F96A24]">
              {venue.area}
            </span>
            <h2 className="font-display text-xl text-white mt-0.5">
              {venue.name}
            </h2>
            <p className="text-xs text-[#BEBAB9]">
              {activity.title} • {unit}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#F0F66E]/15 text-[#F0F66E] text-[10px] font-bold uppercase tracking-wider">
            Today
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">Date & Time</span>
            <strong className="text-white font-medium">{date} • {time}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">Party Size</span>
            <strong className="text-white font-medium">{players} Players</strong>
          </div>
        </div>
      </div>

      {/* Optional Add-Ons Section */}
      {activity.availableAddOns.length > 0 && (
        <div className="mb-5">
          <p className="font-display text-[11px] uppercase text-[#F96A24] tracking-wider mb-2">
            Enhance Your Experience
          </p>
          <div className="space-y-2">
            {activity.availableAddOns.map((addon) => {
              const isSelected = selectedAddOns.some(a => a.id === addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => handleToggleAddOn(addon)}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#29211F] border-[#F96A24]'
                      : 'bg-[#0F0503] border-[#71564A] hover:border-[#71564A]/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-md flex items-center justify-center border transition-colors ${
                      isSelected ? 'bg-[#F96A24] border-[#F96A24] text-white' : 'border-[#71564A]'
                    }`}>
                      {isSelected && <Check size={13} strokeWidth={3} />}
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {addon.name}
                    </span>
                  </div>
                  <strong className="text-xs font-display text-[#F96A24]">
                    +{addon.priceEGP} EGP
                  </strong>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Loyalty Points Redemption Engine (Matching Reference Screenshot) */}
      <LoyaltyRedemptionCard
        availablePoints={availablePoints}
        redeemedPoints={redeemedPoints}
        onApplyPoints={(pts) => setRedeemedPoints(pts)}
        onRemovePoints={() => setRedeemedPoints(0)}
      />

      {/* Egyptian Payment Rails Selector */}
      <div className="mb-5">
        <p className="font-display text-[11px] uppercase text-[#F96A24] tracking-wider mb-2.5">
          Egyptian Payment Method
        </p>
        <div className="space-y-2">
          {/* 1. Mobile Wallets */}
          <div
            onClick={() => setPaymentMethod('mobile_wallet')}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              paymentMethod === 'mobile_wallet'
                ? 'bg-[#29211F] border-2 border-[#F96A24] shadow-md shadow-[#F96A24]/10'
                : 'bg-[#0F0503] border border-[#71564A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center">
                <Smartphone size={18} />
              </div>
              <div>
                <strong className="text-xs font-bold text-white block">
                  Mobile Wallets (Vodafone Cash, Orange, WE, Etisalat)
                </strong>
                <span className="text-[10px] text-[#BEBAB9]">
                  Instant payment via your Egyptian mobile number
                </span>
              </div>
            </div>
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'mobile_wallet' ? 'border-[#F96A24]' : 'border-[#71564A]'
            }`}>
              {paymentMethod === 'mobile_wallet' && <div className="h-2 w-2 rounded-full bg-[#F96A24]" />}
            </div>
          </div>

          {/* 2. InstaPay */}
          <div
            onClick={() => setPaymentMethod('instapay')}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              paymentMethod === 'instapay'
                ? 'bg-[#29211F] border-2 border-[#F96A24] shadow-md shadow-[#F96A24]/10'
                : 'bg-[#0F0503] border border-[#71564A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Zap size={18} />
              </div>
              <div>
                <strong className="text-xs font-bold text-white block">
                  InstaPay (Instant Egyptian Bank Transfer)
                </strong>
                <span className="text-[10px] text-[#BEBAB9]">
                  Zero transfer fee with Egyptian IPA / Account
                </span>
              </div>
            </div>
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'instapay' ? 'border-[#F96A24]' : 'border-[#71564A]'
            }`}>
              {paymentMethod === 'instapay' && <div className="h-2 w-2 rounded-full bg-[#F96A24]" />}
            </div>
          </div>

          {/* 3. Cards & Meeza */}
          <div
            onClick={() => setPaymentMethod('card')}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              paymentMethod === 'card'
                ? 'bg-[#29211F] border-2 border-[#F96A24] shadow-md shadow-[#F96A24]/10'
                : 'bg-[#0F0503] border border-[#71564A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
              <div>
                <strong className="text-xs font-bold text-white block">
                  Credit / Debit Card (Visa, Mastercard, Meeza)
                </strong>
                <span className="text-[10px] text-[#BEBAB9]">
                  Egyptian bank cards & Meeza supported
                </span>
              </div>
            </div>
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'card' ? 'border-[#F96A24]' : 'border-[#71564A]'
            }`}>
              {paymentMethod === 'card' && <div className="h-2 w-2 rounded-full bg-[#F96A24]" />}
            </div>
          </div>

          {/* 4. Apple Pay */}
          <div
            onClick={() => setPaymentMethod('apple_pay')}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              paymentMethod === 'apple_pay'
                ? 'bg-[#29211F] border-2 border-[#F96A24] shadow-md shadow-[#F96A24]/10'
                : 'bg-[#0F0503] border border-[#71564A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center">
                <Apple size={18} />
              </div>
              <div>
                <strong className="text-xs font-bold text-white block">
                  Apple Pay / Google Pay
                </strong>
                <span className="text-[10px] text-[#BEBAB9]">
                  Instant 1-tap mobile verification
                </span>
              </div>
            </div>
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'apple_pay' ? 'border-[#F96A24]' : 'border-[#71564A]'
            }`}>
              {paymentMethod === 'apple_pay' && <div className="h-2 w-2 rounded-full bg-[#F96A24]" />}
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Price Breakdown */}
      <div className="card-surface p-4 mb-6 border border-[#71564A] space-y-2 text-xs">
        <div className="flex items-center justify-between text-[#BEBAB9]">
          <span>Activity Subtotal ({activity.title})</span>
          <span className="text-white font-medium">{basePrice} EGP</span>
        </div>

        {selectedAddOns.length > 0 && (
          <div className="flex items-center justify-between text-[#BEBAB9]">
            <span>Optional Extras ({selectedAddOns.length})</span>
            <span className="text-white font-medium">+{addOnsTotal} EGP</span>
          </div>
        )}

        {pointsDiscount > 0 && (
          <div className="flex items-center justify-between font-bold text-[#F0F66E]">
            <span>Loyalty Points Discount ({redeemedPoints.toLocaleString()} pts)</span>
            <span>-{pointsDiscount} EGP</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[#BEBAB9]">
          <span>Booking & Security Fee</span>
          <span className="text-white font-medium">{serviceFee} EGP</span>
        </div>

        <div className="pt-3 border-t border-[#71564A]/50 flex items-baseline justify-between">
          <div>
            <span className="font-display text-sm uppercase text-white block">
              Transparent Total
            </span>
            <span className="text-[10px] text-[#BEBAB9]">
              Inclusive of all Egyptian taxes
            </span>
          </div>
          <strong className="font-display text-3xl text-[#F96A24]">
            {totalDue} EGP
          </strong>
        </div>

        {/* Future Loyalty Reward Callout */}
        <div className="mt-3 p-2.5 rounded-xl bg-[#F96A24]/10 border border-[#F96A24]/30 flex items-center gap-2 text-xs text-[#F96A24]">
          <Sparkles size={14} className="shrink-0 text-[#F0F66E]" />
          <span>
            🎁 You will receive <strong>+{pointsToEarn.toLocaleString()} points</strong> after this session!
          </span>
        </div>
      </div>

      {/* Primary Pay CTA */}
      <button
        onClick={handlePayAndConfirm}
        className="w-full py-4 rounded-full bg-[#F96A24] text-white font-bold text-sm tracking-wide uppercase hover:brightness-110 shadow-xl shadow-[#F96A24]/35 transition-all flex items-center justify-center gap-2"
      >
        <span>Pay {totalDue} EGP & Confirm Booking ↗</span>
      </button>
    </div>
  );
};
