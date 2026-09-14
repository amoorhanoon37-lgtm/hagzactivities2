import React from 'react';
import { Compass, Search, Ticket, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'explore' | 'bookings' | 'profile';
  onSelectTab: (tab: 'home' | 'explore' | 'bookings' | 'profile') => void;
  upcomingBookingsCount: number;
  loyaltyPoints: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  upcomingBookingsCount,
  loyaltyPoints,
}) => {
  const pointsFormatted = loyaltyPoints >= 1000 
    ? `${(loyaltyPoints / 1000).toFixed(1)}k` 
    : `${loyaltyPoints}`;

  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F0503]/95 backdrop-blur-xl border-t border-[#71564A]/60 pb-safe"
    >
      <div className="max-w-md mx-auto h-[72px] flex items-center justify-around px-2">
        {/* Explore Tab */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
            currentTab === 'home' ? 'text-[#F96A24]' : 'text-[#BEBAB9] hover:text-white'
          }`}
        >
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Explore</span>
          {currentTab === 'home' && (
            <div className="absolute bottom-1.5 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
            </div>
          )}
        </button>

        {/* Search Tab */}
        <button
          onClick={() => onSelectTab('explore')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
            currentTab === 'explore' ? 'text-[#F96A24]' : 'text-[#BEBAB9] hover:text-white'
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Search</span>
          {currentTab === 'explore' && (
            <div className="absolute bottom-1.5 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
            </div>
          )}
        </button>

        {/* Bookings Tab */}
        <button
          onClick={() => onSelectTab('bookings')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
            currentTab === 'bookings' ? 'text-[#F96A24]' : 'text-[#BEBAB9] hover:text-white'
          }`}
        >
          <div className="relative">
            <Ticket className="w-6 h-6" />
            {upcomingBookingsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#F96A24] text-[#0F0503] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {upcomingBookingsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Bookings</span>
          {currentTab === 'bookings' && (
            <div className="absolute bottom-1.5 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
            </div>
          )}
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
            currentTab === 'profile' ? 'text-[#F96A24]' : 'text-[#BEBAB9] hover:text-white'
          }`}
        >
          <div className="relative">
            <User className="w-6 h-6" />
            <span className="absolute -top-1 -right-3.5 bg-[#F0F66E] text-[#0F0503] text-[9px] font-black px-1 rounded-full shadow-sm">
              {pointsFormatted}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Profile</span>
          {currentTab === 'profile' && (
            <div className="absolute bottom-1.5 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F96A24]" />
            </div>
          )}
        </button>
      </div>
    </nav>
  );
};
