import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, MapPin, Share2, Calendar, ArrowLeft } from 'lucide-react';
import { Booking } from '../types';

interface TicketScreenProps {
  booking: Booking;
  onBackToHome: () => void;
  onGoToBookings: () => void;
}

export const TicketScreen: React.FC<TicketScreenProps> = ({
  booking,
  onBackToHome,
  onGoToBookings
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Confetti celebration burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F96A24', '#F0F66E', '#FFFFFF', '#BEBAB9']
      });
    } catch {
      // ignore
    }

    // Generate Scannable QR code client-side
    const qrPayload = JSON.stringify({
      code: booking.reference,
      venue: booking.venueName,
      activity: booking.activityTitle,
      unit: booking.unitAssigned,
      time: booking.time,
      date: booking.date
    });

    QRCode.toDataURL(qrPayload, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0F0503',
        light: '#FFFFFF'
      }
    }).then(url => {
      setQrUrl(url);
    }).catch(err => {
      console.error(err);
    });
  }, [booking]);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(booking.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    const shareText = `🎳 I just booked ${booking.unitAssigned} at ${booking.venueName} for ${booking.time} (${booking.date}) on HagzActivities! Join our team: https://hagzfun-2bbswwka.manus.space/ticket?ref=${booking.reference}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join my booking on HagzActivities',
        text: shareText
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Booking invitation copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-6 text-white text-center animate-fade-in">
      {/* Top Celebration Icon */}
      <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-[#F96A24] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(249,106,36,0.5)]">
        <CheckCircle2 size={36} strokeWidth={2.5} />
      </div>

      <p className="font-display text-xs text-[#F0F66E] uppercase tracking-widest">
        You're All Set
      </p>
      <h1 className="font-display text-3xl text-white mt-0.5">
        BOOKING <span className="text-[#F96A24]">CONFIRMED</span>
      </h1>
      <p className="text-xs text-[#BEBAB9] max-w-[280px] mx-auto mt-1">
        Present this pass at reception upon arrival. No phone call or message required.
      </p>

      {/* The Flexora Authentic Pass Card */}
      <div className="ticket-notch card-surface my-6 p-5 border-2 border-[#F96A24] text-left shadow-2xl relative">
        {/* Pass Header */}
        <div className="flex items-start justify-between border-b border-dashed border-[#71564A] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#BEBAB9]">
              HagzActivities Official Pass
            </span>
            <h2 className="font-display text-2xl text-white mt-0.5">
              {booking.venueName}
            </h2>
            <p className="text-xs text-[#BEBAB9] flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-[#F96A24]" />
              {booking.venueAddress}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#F0F66E] text-[#0F0503] font-display text-[11px] font-bold">
            PAID
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 py-4 text-xs border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">Activity</span>
            <strong className="text-white font-semibold text-sm">{booking.activityTitle}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">Assigned Space</span>
            <strong className="text-[#F96A24] font-semibold text-sm">{booking.unitAssigned}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">Scheduled Time</span>
            <strong className="text-white font-medium">{booking.date} • {booking.time}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">Party Size</span>
            <strong className="text-white font-medium">{booking.players} Players</strong>
          </div>
        </div>

        {/* Scannable QR Code */}
        <div className="my-4 p-4 rounded-2xl bg-white text-center">
          {qrUrl ? (
            <img 
              src={qrUrl} 
              alt="Booking QR Code" 
              className="mx-auto h-48 w-48 object-contain rounded-lg"
            />
          ) : (
            <div className="h-48 w-48 mx-auto flex items-center justify-center text-xs text-gray-500">
              Generating pass...
            </div>
          )}
          <p className="text-[11px] font-medium text-gray-700 mt-2">
            Scan at reception for instant check-in
          </p>
        </div>

        {/* Reference Code & Total */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-[10px] uppercase text-[#BEBAB9] block">
              Reference Code
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <strong className="font-display text-2xl tracking-widest text-white">
                {booking.reference}
              </strong>
              <button
                onClick={handleCopyRef}
                className="p-1.5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] text-[#BEBAB9] hover:text-white"
                title="Copy reference code"
              >
                <Copy size={13} />
              </button>
            </div>
            {copied && <span className="text-[10px] text-emerald-400">Copied to clipboard!</span>}
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase text-[#BEBAB9] block">
              Total Paid
            </span>
            <strong className="font-display text-2xl text-[#F96A24]">
              {booking.totalAmountEGP} EGP
            </strong>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-2.5">
        <div className="flex gap-2">
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.venueAddress)}`, '_blank')}
            className="flex-1 py-3 px-4 rounded-full bg-[#F96A24] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 hover:brightness-110 shadow-lg shadow-[#F96A24]/30 transition-all"
          >
            <MapPin size={14} />
            <span>Get Directions ↗</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 hover:border-[#F96A24] transition-all"
          >
            <Share2 size={14} />
            <span>Share Booking</span>
          </button>
        </div>

        <button
          onClick={onGoToBookings}
          className="w-full py-3.5 rounded-full bg-[#29211F] border border-[#71564A] text-white font-bold text-xs uppercase hover:border-[#F96A24] transition-all"
        >
          View in My Bookings
        </button>

        <button
          onClick={onBackToHome}
          className="w-full py-2.5 text-xs text-[#BEBAB9] hover:text-white"
        >
          Back to Home Feed
        </button>
      </div>
    </div>
  );
};
