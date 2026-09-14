import React, { useState } from 'react';
import { X, CheckCircle2, Building2, UserCheck, AlertCircle } from 'lucide-react';
import { PlaceSuggestion } from '../types';

interface SuggestPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuggestion: (suggestion: PlaceSuggestion) => void;
}

export const SuggestPlaceModal: React.FC<SuggestPlaceModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuggestion
}) => {
  const [step, setStep] = useState<'role' | 'form' | 'success'>('role');
  const [userType, setUserType] = useState<'owner' | 'customer' | null>(null);

  // Form Fields
  const [venueName, setVenueName] = useState('');
  const [category, setCategory] = useState('Bowling');
  const [region, setRegion] = useState('New Cairo');
  const [exactAddress, setExactAddress] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSelectRole = (type: 'owner' | 'customer') => {
    setUserType(type);
    setStep('form');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // If Owner: ALL fields are mandatory
    if (userType === 'owner') {
      if (!venueName.trim() || !exactAddress.trim() || !googleMapsLink.trim() || !phone.trim() || !email.trim()) {
        setErrorMsg('As the venue owner/manager, all contact and location fields are mandatory.');
        return;
      }
      // Simple Egyptian phone validation
      const cleanPhone = phone.replace(/\s+/g, '');
      if (!/^(010|011|012|015|\+2010|\+2011|\+2012|\+2015)[0-9]{8}$/.test(cleanPhone)) {
        setErrorMsg('Please enter a valid Egyptian mobile number (e.g. 010, 011, 012, or 015).');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        setErrorMsg('Please enter a valid business email address.');
        return;
      }
    } else {
      // If Customer: Only venue name, region, and location are mandatory
      if (!venueName.trim() || !exactAddress.trim()) {
        setErrorMsg('Please enter the place name and approximate location.');
        return;
      }
    }

    const newSuggestion: PlaceSuggestion = {
      id: 'sug-' + Date.now(),
      userType: userType || 'customer',
      venueName: venueName.trim(),
      category,
      region,
      exactAddress: exactAddress.trim(),
      googleMapsLink: googleMapsLink.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'pending_review'
    };

    onSubmitSuggestion(newSuggestion);
    setStep('success');
  };

  const handleReset = () => {
    setStep('role');
    setUserType(null);
    setVenueName('');
    setExactAddress('');
    setGoogleMapsLink('');
    setPhone('');
    setEmail('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#0F0503] border border-[#71564A] rounded-[28px] p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 h-8 w-8 rounded-full bg-[rgba(255,255,255,0.06)] border border-[#71564A] flex items-center justify-center text-[#BEBAB9] hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <p className="font-display text-[11px] text-[#F96A24] tracking-widest uppercase">
            Suggest a Venue
          </p>
          <h2 className="font-display text-2xl text-white mt-0.5">
            ADD A SPOT IN EGYPT
          </h2>
          <p className="text-xs text-[#BEBAB9] mt-1">
            Help us expand Egypt's premier recreational directory.
          </p>
        </div>

        {/* Step 1: Role Clarification */}
        {step === 'role' && (
          <div className="space-y-3 py-2">
            <p className="text-sm font-semibold text-white">
              Are you the owner or just suggesting a place you want added to the site?
            </p>

            <button
              type="button"
              onClick={() => handleSelectRole('owner')}
              className="w-full p-4 rounded-2xl bg-[#29211F] border border-[#71564A] hover:border-[#F96A24] text-left transition-all flex items-start gap-3 group"
            >
              <div className="p-2.5 rounded-full bg-[#F96A24]/15 text-[#F96A24] group-hover:scale-110 transition-transform">
                <Building2 size={20} />
              </div>
              <div>
                <strong className="block text-sm text-white font-semibold">
                  I am the Venue Owner / Manager
                </strong>
                <span className="text-xs text-[#BEBAB9]">
                  I represent this venue and want it officially listed for real-time bookings.
                </span>
                <span className="mt-2 inline-block text-[10px] uppercase font-bold text-[#F96A24]">
                  All verification details required ↗
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole('customer')}
              className="w-full p-4 rounded-2xl bg-[#29211F] border border-[#71564A] hover:border-[#F96A24] text-left transition-all flex items-start gap-3 group"
            >
              <div className="p-2.5 rounded-full bg-[#F0F66E]/15 text-[#F0F66E] group-hover:scale-110 transition-transform">
                <UserCheck size={20} />
              </div>
              <div>
                <strong className="block text-sm text-white font-semibold">
                  I am a Customer / Community Scout
                </strong>
                <span className="text-xs text-[#BEBAB9]">
                  I played at this venue and want to see it on HagzActivities.
                </span>
                <span className="mt-2 inline-block text-[10px] uppercase font-bold text-[#F0F66E]">
                  Quick 1-minute suggestion ↗
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#71564A]/40">
              <span className="text-xs font-semibold text-[#F96A24] uppercase">
                {userType === 'owner' ? '🏢 Venue Owner Registration' : '📍 Customer Spot Suggestion'}
              </span>
              <button
                type="button"
                onClick={() => setStep('role')}
                className="text-[11px] text-[#BEBAB9] hover:underline"
              >
                Change role
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Place Name */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                Place / Venue Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g. Strike Zone Bowling or Cue Club"
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                Activity Category <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              >
                <option value="Bowling">🎳 Bowling</option>
                <option value="Billiards">🎱 Billiards / Pool</option>
                <option value="Ping Pong">🏓 Ping Pong</option>
                <option value="Go-Kart">🏎️ Go-Karting</option>
                <option value="Gaming">🎮 PlayStation / Cyber Gaming</option>
                <option value="Escape Rooms">🔐 Escape Rooms</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                Region in Egypt <span className="text-red-400">*</span>
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              >
                <option value="New Cairo">New Cairo (Fifth Settlement)</option>
                <option value="Nasr City">Nasr City</option>
                <option value="Maadi">Maadi</option>
                <option value="Zamalek">Zamalek</option>
                <option value="6th of October">6th of October</option>
                <option value="Sheikh Zayed">Sheikh Zayed</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Other Egypt">Other Egyptian Region</option>
              </select>
            </div>

            {/* Exact Location / Address */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                {userType === 'owner' ? 'Exact Address & Building *' : 'Location / Neighborhood *'}
              </label>
              <input
                type="text"
                required
                value={exactAddress}
                onChange={(e) => setExactAddress(e.target.value)}
                placeholder={userType === 'owner' ? 'e.g. 14 South 90th St, Floor 2, New Cairo' : 'e.g. Near Point 90 Mall'}
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              />
            </div>

            {/* Google Maps Link */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                Google Maps Link {userType === 'owner' ? <span className="text-red-400">*</span> : <span className="text-[#BEBAB9] font-normal">(Optional)</span>}
              </label>
              <input
                type="url"
                required={userType === 'owner'}
                value={googleMapsLink}
                onChange={(e) => setGoogleMapsLink(e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                Venue Phone Number {userType === 'owner' ? <span className="text-red-400">*</span> : <span className="text-[#BEBAB9] font-normal">(Optional)</span>}
              </label>
              <input
                type="tel"
                required={userType === 'owner'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010 / 011 / 012 / 015..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#BEBAB9] mb-1">
                {userType === 'owner' ? 'Official Business Email *' : 'Your Email (Optional, to notify you)'}
              </label>
              <input
                type="email"
                required={userType === 'owner'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@venue.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#29211F] border border-[#71564A] text-white text-sm focus:border-[#F96A24] focus:outline-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full mt-3 py-3.5 rounded-full bg-[#F96A24] text-white font-bold text-sm tracking-wide uppercase hover:brightness-110 shadow-lg shadow-[#F96A24]/30 transition-all"
            >
              {userType === 'owner' ? 'Submit Venue for Verification ↗' : 'Suggest Spot to HagzActivities ↗'}
            </button>
          </form>
        )}

        {/* Step 3: Success State */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-display text-2xl text-white">
              SUGGESTION RECEIVED!
            </h3>
            <p className="text-xs text-[#BEBAB9] max-w-[280px] mx-auto leading-relaxed">
              Thank you! Our scouting team will verify <strong className="text-white">{venueName}</strong> within 24 to 48 hours for listing on HagzActivities.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-full bg-[#29211F] border border-[#71564A] text-white font-bold text-xs uppercase hover:border-[#F96A24] transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
