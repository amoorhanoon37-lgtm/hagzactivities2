import React, { useState, useEffect } from 'react';
import { SEED_VENUES } from './data/seedData';
import { Venue, Activity, Booking, Review, CairoDistrict, PlaceSuggestion } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreScreen } from './components/ExploreScreen';
import { VenueDetailScreen } from './components/VenueDetailScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { TicketScreen } from './components/TicketScreen';
import { BookingsHubScreen } from './components/BookingsHubScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SuggestPlaceModal } from './components/SuggestPlaceModal';
import { Sparkles, Trophy, Flame, ChevronRight, Star, MapPin } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'explore' | 'bookings' | 'profile'>('home');
  const [activeView, setActiveView] = useState<'main' | 'venue' | 'checkout' | 'ticket'>('main');

  // Active Selections
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [checkoutData, setCheckoutData] = useState<{
    venue: Venue;
    activity: Activity;
    unit: string;
    date: string;
    time: string;
    players: number;
  } | null>(null);
  const [activeTicket, setActiveTicket] = useState<Booking | null>(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Cairo');
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('hagz_favorites');
    return saved ? JSON.parse(saved) : ['bowling-stars', 'trapped-egypt'];
  });

  // Loyalty Points State (Default 1,400 PTS = 14.00 EGP discount power)
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('hagz_loyalty_points');
    return saved !== null ? parseInt(saved, 10) : 1400;
  });

  // Bookings State with initial sample data
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('hagz_bookings');
    if (saved) return JSON.parse(saved);

    // Initial 3 Seed Bookings: Upcoming, Past, Cancelled
    const now = Date.now();
    return [
      {
        id: 'bk-upcoming-01',
        reference: 'HAGZ-CAI-84920',
        venueId: 'bowling-stars',
        venueName: 'Bowling Stars',
        venueAddress: 'Cairo Festival City, Ring Road, New Cairo',
        activityId: 'bs-bowling',
        activityCategory: 'bowling',
        activityTitle: 'Bowling Lanes',
        unitAssigned: 'Lane #4 (Cosmic Glow)',
        date: new Date(now + 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: '08:00 PM',
        players: 4,
        basePrice: 600,
        selectedAddOns: [
          { id: 'shoes', name: 'Pro Bowling Shoes Rental', priceEGP: 40 }
        ],
        addOnsTotal: 40,
        serviceFee: 30,
        pointsRedeemed: 1000,
        pointsDiscountEGP: 10,
        totalAmountEGP: 660,
        paymentMethod: 'mobile_wallet',
        status: 'upcoming',
        createdAt: new Date().toISOString(),
        slotTimestamp: now + 86400000 * 2, // in 48 hours (>24h = 100% refund tier)
        pointsEarned: 1300
      },
      {
        id: 'bk-past-02',
        reference: 'HAGZ-CAI-39102',
        venueId: 'the-maze',
        venueName: 'The Maze Escape Rooms',
        venueAddress: 'Road 9, Degla, Maadi',
        activityId: 'maze-pharaoh',
        activityCategory: 'escape_room',
        activityTitle: 'Tomb of Tutankhamun Room',
        unitAssigned: 'Chamber Alpha',
        date: new Date(now - 86400000 * 3).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: '07:30 PM',
        players: 5,
        basePrice: 1250,
        selectedAddOns: [],
        addOnsTotal: 0,
        serviceFee: 30,
        pointsRedeemed: 0,
        pointsDiscountEGP: 0,
        totalAmountEGP: 1280,
        paymentMethod: 'instapay',
        status: 'completed',
        createdAt: new Date(now - 86400000 * 4).toISOString(),
        slotTimestamp: now - 86400000 * 3,
        pointsEarned: 2500
      },
      {
        id: 'bk-cancelled-03',
        reference: 'HAGZ-CAI-11094',
        venueId: 'autodrome',
        venueName: 'Giza Autodrome',
        venueAddress: 'Desert Road, Sheikh Zayed',
        activityId: 'auto-kart',
        activityCategory: 'go_kart',
        activityTitle: 'Grand Prix Karting',
        unitAssigned: 'Kart #07 (Sodi Pro)',
        date: new Date(now - 86400000 * 10).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: '05:00 PM',
        players: 2,
        basePrice: 700,
        selectedAddOns: [],
        addOnsTotal: 0,
        serviceFee: 30,
        pointsRedeemed: 0,
        pointsDiscountEGP: 0,
        totalAmountEGP: 730,
        paymentMethod: 'card',
        status: 'cancelled',
        createdAt: new Date(now - 86400000 * 11).toISOString(),
        slotTimestamp: now - 86400000 * 10,
        pointsEarned: 0
      }
    ];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('hagz_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('hagz_loyalty_points', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  useEffect(() => {
    localStorage.setItem('hagz_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Show quick toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle favorite
  const handleToggleFavorite = (venueId: string) => {
    if (favorites.includes(venueId)) {
      setFavorites(favorites.filter(id => id !== venueId));
      showToast('Removed from favorites');
    } else {
      setFavorites([...favorites, venueId]);
      showToast('Added to saved favorites!');
    }
  };

  // Open venue details
  const handleSelectVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setActiveView('venue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step into checkout
  const handleProceedToCheckout = (
    venue: Venue,
    activity: Activity,
    unit: string,
    date: string,
    time: string,
    players: number
  ) => {
    setCheckoutData({ venue, activity, unit, date, time, players });
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finalize booking from checkout
  const handleConfirmBooking = (bookingData: Partial<Booking>) => {
    const reference = `HAGZ-CAI-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = Date.now();

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      reference,
      venueId: bookingData.venueId || checkoutData!.venue.id,
      venueName: bookingData.venueName || checkoutData!.venue.name,
      venueAddress: bookingData.venueAddress || checkoutData!.venue.address,
      activityId: bookingData.activityId || checkoutData!.activity.id,
      activityCategory: bookingData.activityCategory || checkoutData!.activity.category,
      activityTitle: bookingData.activityTitle || checkoutData!.activity.title,
      unitAssigned: bookingData.unitAssigned || checkoutData!.unit,
      date: bookingData.date || checkoutData!.date,
      time: bookingData.time || checkoutData!.time,
      players: bookingData.players || checkoutData!.players,
      basePrice: bookingData.basePrice || checkoutData!.activity.basePriceEGP,
      selectedAddOns: bookingData.selectedAddOns || [],
      addOnsTotal: bookingData.addOnsTotal || 0,
      serviceFee: bookingData.serviceFee || 30,
      pointsRedeemed: bookingData.pointsRedeemed || 0,
      pointsDiscountEGP: bookingData.pointsDiscountEGP || 0,
      totalAmountEGP: bookingData.totalAmountEGP || 0,
      paymentMethod: bookingData.paymentMethod || 'mobile_wallet',
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      slotTimestamp: now + 86400000 * 2, // simulated future slot
      pointsEarned: bookingData.pointsEarned || Math.floor((bookingData.totalAmountEGP || 0) / 50) * 100
    };

    // Deduct redeemed points & add newly earned points
    const netPoints = loyaltyPoints - newBooking.pointsRedeemed + newBooking.pointsEarned;
    setLoyaltyPoints(Math.max(0, netPoints));

    // Update bookings list
    setBookings([newBooking, ...bookings]);

    // Transition to scannable ticket screen
    setActiveTicket(newBooking);
    setActiveView('ticket');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel booking with tiered refund
  const handleCancelBooking = (bookingId: string, refundEGP: number, pointsToRefund: number) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'cancelled' };
      }
      return b;
    }));

    if (pointsToRefund > 0) {
      setLoyaltyPoints(prev => prev + pointsToRefund);
    }

    showToast(`Booking cancelled. Refund of ${refundEGP} EGP processed to original payment method!`);
  };

  // Submit verified review for completed booking
  const handleSubmitReview = (review: Review) => {
    showToast(`Thank you! Your verified ${review.rating}-star review has been published.`);
  };

  // Submit place suggestion
  const handlePlaceSuggestion = (suggestion: PlaceSuggestion) => {
    showToast(`Thanks! Your suggestion for "${suggestion.venueName}" has been submitted for Cairo review.`);
  };

  // Reset demo simulation
  const handleResetData = () => {
    localStorage.removeItem('hagz_bookings');
    localStorage.removeItem('hagz_favorites');
    localStorage.removeItem('hagz_loyalty_points');
    setLoyaltyPoints(1400);
    setFavorites(['bowling-stars', 'trapped-egypt']);
    window.location.reload();
  };

  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const favoriteVenuesList = SEED_VENUES.filter(v => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-[#0F0503] text-white flex flex-col font-sans selection:bg-[#F96A24] selection:text-[#0F0503]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#F96A24] text-[#0F0503] font-anton tracking-wider uppercase px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-sm animate-bounce border border-white/20">
          <Sparkles className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Primary Top Header (Only on Main Tabs) */}
      {activeView === 'main' && (
        <Header
          currentArea={selectedDistrict}
          onOpenAreaDrawer={() => {
            setSelectedCategory('ALL');
            setCurrentTab('explore');
          }}
          pointsBalance={loyaltyPoints}
          onOpenSuggestModal={() => setSuggestModalOpen(true)}
          onOpenProfile={() => setCurrentTab('profile')}
          onLogoClick={() => setCurrentTab('home')}
        />
      )}

      {/* MAIN VIEWPORT SWITCHER */}
      <main className="flex-1">
        {activeView === 'venue' && selectedVenue && (
          <VenueDetailScreen
            venue={selectedVenue}
            onBack={() => setActiveView('main')}
            onProceedToCheckout={handleProceedToCheckout}
            isFavorite={favorites.includes(selectedVenue.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeView === 'checkout' && checkoutData && (
          <CheckoutScreen
            venue={checkoutData.venue}
            activity={checkoutData.activity}
            unit={checkoutData.unit}
            date={checkoutData.date}
            time={checkoutData.time}
            players={checkoutData.players}
            availablePoints={loyaltyPoints}
            onBack={() => setActiveView('venue')}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {activeView === 'ticket' && activeTicket && (
          <TicketScreen
            booking={activeTicket}
            onBackToHome={() => {
              setActiveView('main');
              setCurrentTab('home');
            }}
            onGoToBookings={() => {
              setActiveView('main');
              setCurrentTab('bookings');
            }}
          />
        )}

        {activeView === 'main' && (
          <>
            {/* TAB 1: HOME DASHBOARD */}
            {currentTab === 'home' && (
              <div className="pb-32">
                {/* Hero Showcase */}
                <div className="relative bg-gradient-to-b from-[#29211F] via-[#160B08] to-[#0F0503] px-4 pt-6 pb-10 border-b border-[#71564A]/30 overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-60 bg-[#F96A24]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="max-w-2xl mx-auto space-y-4 relative z-10 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 bg-[#0F0503]/80 px-3.5 py-1.5 rounded-full border border-[#71564A]/60 text-xs font-bold text-[#F96A24]">
                      <Flame className="w-3.5 h-3.5 fill-[#F96A24]" />
                      <span>Instant Recreational Booking • Cairo, Egypt</span>
                    </div>

                    <h1 className="font-anton text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
                      WHAT DO YOU WANT TO DO <span className="text-[#F96A24]">RIGHT NOW?</span>
                    </h1>

                    <p className="text-sm text-[#BEBAB9] max-w-lg leading-relaxed">
                      Zero phone calls. Zero WhatsApp DMs. Browse real-time Cairo lane, table, and escape room slots with instant confirmed lock-in.
                    </p>

                    {/* Quick Category Launchers */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                      {[
                        { name: 'Bowling', icon: '🎳', cat: 'bowling' },
                        { name: 'Billiards', icon: '🎱', cat: 'billiards' },
                        { name: 'Go-Kart', icon: '🏎️', cat: 'go_kart' },
                        { name: 'PS5 & Cyber', icon: '🎮', cat: 'gaming' },
                        { name: 'Escape', icon: '🗝️', cat: 'escape_room' },
                        { name: 'Ping Pong', icon: '🏓', cat: 'ping_pong' }
                      ].map((item) => (
                        <button
                          key={item.cat}
                          onClick={() => {
                            setSelectedCategory(item.cat);
                            setCurrentTab('explore');
                          }}
                          className="p-3 rounded-2xl bg-[#29211F] border border-[#71564A]/40 hover:border-[#F96A24] transition-all flex flex-col items-center gap-1.5 group hover:scale-105"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                          <span className="text-[11px] font-bold text-white uppercase tracking-wider">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hot Cairo Venues Showcase */}
                <div className="max-w-2xl mx-auto px-4 pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-anton text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#F96A24]" />
                        Popular Cairo Spots
                      </h2>
                      <p className="text-xs text-[#BEBAB9]">High-demand venues with slots available tonight</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory('ALL');
                        setCurrentTab('explore');
                      }}
                      className="text-xs font-bold text-[#F96A24] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SEED_VENUES.slice(0, 4).map((venue) => {
                      const minPrice = Math.min(...venue.activities.map(a => a.basePriceEGP));
                      return (
                        <div
                          key={venue.id}
                          onClick={() => handleSelectVenue(venue)}
                          className="bg-[#29211F] rounded-3xl border border-[#71564A]/40 overflow-hidden hover:border-[#F96A24] transition-all cursor-pointer group shadow-xl"
                        >
                          <div className="relative h-40 w-full overflow-hidden">
                            <img
                              src={venue.images[0]}
                              alt={venue.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#29211F] via-transparent to-black/20" />
                            <div className="absolute top-2.5 right-2.5 bg-[#0F0503]/90 px-2.5 py-1 rounded-full text-xs font-black text-[#F96A24] border border-[#71564A]/40 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#F96A24]" />
                              {venue.rating.toFixed(1)}
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 bg-[#F0F66E] text-[#0F0503] font-anton text-xs px-2.5 py-1 rounded-lg">
                              FROM {minPrice} EGP
                            </div>
                          </div>

                          <div className="p-4 space-y-1.5">
                            <div className="text-[10px] font-bold text-[#F96A24] uppercase tracking-wider">
                              {venue.area}
                            </div>
                            <h3 className="font-anton text-lg uppercase text-white group-hover:text-[#F96A24] transition-colors truncate">
                              {venue.name}
                            </h3>
                            <p className="text-xs text-[#BEBAB9] flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-[#F96A24] shrink-0" />
                              {venue.address}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Loyalty Points Banner Teaser */}
                  <div className="bg-gradient-to-r from-[#29211F] via-[#29211F] to-[#71564A]/40 p-5 rounded-3xl border border-[#F96A24]/50 shadow-2xl flex items-center justify-between gap-4 mt-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#F96A24] uppercase tracking-wider">
                        <Trophy className="w-4 h-4" />
                        Play & Earn Hagz Points
                      </div>
                      <h4 className="font-anton text-xl uppercase text-white mt-1">
                        Turn your game nights into discounts!
                      </h4>
                      <p className="text-xs text-[#BEBAB9] mt-0.5">
                        Earn 100 points for every 50 EGP spent. Redeem 100 points for 1 EGP cash off.
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentTab('profile')}
                      className="py-2.5 px-4 rounded-xl bg-[#F0F66E] text-[#0F0503] font-anton text-xs uppercase tracking-wider hover:bg-white transition-colors shrink-0 shadow-md"
                    >
                      View Wallet
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EXPLORE & MAP SCREEN */}
            {currentTab === 'explore' && (
              <ExploreScreen
                venues={SEED_VENUES}
                onSelectVenue={handleSelectVenue}
                onOpenSuggestModal={() => setSuggestModalOpen(true)}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedDistrict={selectedDistrict}
                onSelectDistrict={setSelectedDistrict}
              />
            )}

            {/* TAB 3: BOOKINGS HUB PASSBOOK */}
            {currentTab === 'bookings' && (
              <BookingsHubScreen
                bookings={bookings}
                onSelectBooking={(b) => {
                  setActiveTicket(b);
                  setActiveView('ticket');
                }}
                onCancelBooking={handleCancelBooking}
                onSubmitReview={handleSubmitReview}
                onExplore={() => setCurrentTab('explore')}
              />
            )}

            {/* TAB 4: PROFILE & REWARDS WALLET */}
            {currentTab === 'profile' && (
              <ProfileScreen
                loyaltyPoints={loyaltyPoints}
                favoriteVenues={favoriteVenuesList}
                onSelectVenue={handleSelectVenue}
                onOpenSuggestModal={() => setSuggestModalOpen(true)}
                onResetData={handleResetData}
              />
            )}

            {/* Egyptian Legal & Regulatory Compliance Footer */}
            <footer className="bg-[#0A0302] border-t border-[#71564A]/40 py-10 px-4 mb-20 text-center text-xs text-[#BEBAB9] space-y-3">
              <div className="max-w-2xl mx-auto space-y-2">
                <div className="font-anton text-xl text-white tracking-wider uppercase">
                  HAGZ<span className="text-[#F96A24]">ACTIVITIES</span> EGYPT
                </div>
                <p className="text-[11px] text-[#BEBAB9] max-w-md mx-auto leading-relaxed">
                  © 2026 HagzActivities Egypt. All rights reserved. • Registered recreational activity marketplace under Egyptian E-Commerce Law No. 151/2020 • Powered by Flexora Engine • Cairo, Egypt
                </p>
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#F96A24] pt-2 font-bold">
                  <span className="cursor-pointer hover:underline">Instant Refund Guarantee</span>
                  <span>•</span>
                  <span className="cursor-pointer hover:underline">Cairo Support 24/7</span>
                  <span>•</span>
                  <span 
                    onClick={() => setSuggestModalOpen(true)} 
                    className="cursor-pointer hover:underline text-[#F0F66E]"
                  >
                    Suggest a Missing Place
                  </span>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Shown on Main Tab views) */}
      {activeView === 'main' && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          upcomingBookingsCount={upcomingCount}
          loyaltyPoints={loyaltyPoints}
        />
      )}

      {/* Multi-Step Suggest Place Modal */}
      <SuggestPlaceModal
        isOpen={suggestModalOpen}
        onClose={() => setSuggestModalOpen(false)}
        onSubmitSuggestion={handlePlaceSuggestion}
      />
    </div>
  );
};
