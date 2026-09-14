import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Star, Map, List, Clock, 
  ChevronRight, PlusCircle, Compass
} from 'lucide-react';
import { Venue, ActivityCategory, CairoDistrict } from '../types';

interface ExploreScreenProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onOpenSuggestModal: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

const CATEGORIES: { label: string; value: string; icon: string }[] = [
  { label: 'All Activities', value: 'ALL', icon: '⚡' },
  { label: 'Bowling', value: 'bowling', icon: '🎳' },
  { label: 'Billiards & Pool', value: 'billiards', icon: '🎱' },
  { label: 'Go-Karting', value: 'go_kart', icon: '🏎️' },
  { label: 'PS5 & Cyber', value: 'gaming', icon: '🎮' },
  { label: 'Escape Room', value: 'escape_room', icon: '🗝️' },
  { label: 'Ping Pong', value: 'ping_pong', icon: '🏓' },
];

const DISTRICTS: string[] = [
  'All Cairo',
  'New Cairo',
  'Sheikh Zayed',
  'Maadi',
  'Nasr City',
  'Zamalek',
  '6th of October',
];

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  venues,
  onSelectVenue,
  onOpenSuggestModal,
  selectedCategory,
  onSelectCategory,
  selectedDistrict,
  onSelectDistrict,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mapSelectedVenue, setMapSelectedVenue] = useState<Venue | null>(null);

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // Search query filter
      const matchesSearch =
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.activities.some((a) => 
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategory === 'ALL' || 
        venue.activities.some((a) => a.category === (selectedCategory as ActivityCategory));

      // District filter
      const matchesDistrict =
        selectedDistrict === 'All Cairo' || 
        venue.area.toLowerCase().includes(selectedDistrict.toLowerCase());

      return matchesSearch && matchesCategory && matchesDistrict;
    });
  }, [venues, searchQuery, selectedCategory, selectedDistrict]);

  return (
    <div className="min-h-screen bg-[#0F0503] text-white pb-32">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#0F0503]/95 backdrop-blur-xl border-b border-[#71564A]/40 px-4 pt-4 pb-3 space-y-3">
        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BEBAB9]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search venues, sports, or Cairo districts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#29211F] border border-[#71564A]/60 text-white placeholder-[#BEBAB9]/60 text-sm focus:outline-none focus:border-[#F96A24] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#BEBAB9] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex bg-[#29211F] p-1 rounded-2xl border border-[#71564A]/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#F96A24] text-[#0F0503]'
                  : 'text-[#BEBAB9] hover:text-white'
              }`}
              title="Grid View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'map'
                  ? 'bg-[#F96A24] text-[#0F0503]'
                  : 'text-[#BEBAB9] hover:text-white'
              }`}
              title="Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Activity Category Pill Rail */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none max-w-2xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-[#F0F66E] text-[#0F0503] border-[#F0F66E] shadow-sm shadow-[#F0F66E]/20'
                    : 'bg-[#29211F] text-[#BEBAB9] border-[#71564A]/40 hover:border-[#71564A]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* District Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-2xl mx-auto text-xs">
          <span className="text-[#BEBAB9] font-bold shrink-0 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#F96A24]" /> Area:
          </span>
          {DISTRICTS.map((dist) => {
            const isSelected = selectedDistrict === dist;
            return (
              <button
                key={dist}
                onClick={() => onSelectDistrict(dist)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                  isSelected
                    ? 'bg-[#F96A24] text-[#0F0503] font-bold'
                    : 'bg-[#29211F]/80 text-[#BEBAB9] hover:text-white'
                }`}
              >
                {dist}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {/* Results Bar */}
        <div className="flex items-center justify-between text-xs text-[#BEBAB9]">
          <div>
            Showing <span className="text-[#F96A24] font-bold">{filteredVenues.length}</span> venues in Cairo
          </div>
          <button
            onClick={onOpenSuggestModal}
            className="text-[#F0F66E] hover:underline font-bold flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Suggest a Place
          </button>
        </div>

        {/* VIEW MODE: MAP VIEW */}
        {viewMode === 'map' ? (
          <div className="space-y-4">
            {/* Cairo Stylized Map Simulation Canvas */}
            <div className="relative h-96 w-full rounded-3xl bg-[#1A1210] border border-[#71564A]/60 overflow-hidden shadow-inner p-4 flex flex-col justify-between">
              {/* Cairo Grid Background Lines */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#F96A24 1px, transparent 1px), radial-gradient(#71564A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              />
              
              {/* Map Title Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#0F0503]/90 px-3 py-1.5 rounded-full text-[11px] font-bold text-white border border-[#71564A]/40 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#F96A24] animate-spin" /> Greater Cairo Live Map
                </span>
                <span className="bg-[#F0F66E] text-[#0F0503] text-[10px] font-black px-2 py-1 rounded-md uppercase">
                  {filteredVenues.length} Live Pins
                </span>
              </div>

              {/* Map Pins Simulation */}
              <div className="relative w-full h-64">
                {filteredVenues.map((venue, idx) => {
                  const minPrice = Math.min(...venue.activities.map(a => a.basePriceEGP));
                  const lefts = ['18%', '42%', '76%', '28%', '62%', '84%', '35%', '50%'];
                  const tops = ['20%', '35%', '25%', '65%', '55%', '70%', '45%', '80%'];
                  const left = lefts[idx % lefts.length];
                  const top = tops[idx % tops.length];
                  const isSelected = mapSelectedVenue?.id === venue.id;

                  return (
                    <button
                      key={venue.id}
                      onClick={() => setMapSelectedVenue(venue)}
                      style={{ left, top }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform transform ${
                        isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div className="flex flex-col items-center group">
                        <div className={`px-2 py-1 rounded-full text-[10px] font-black shadow-lg flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#F0F66E] text-[#0F0503] ring-2 ring-[#F96A24]'
                            : 'bg-[#F96A24] text-[#0F0503]'
                        }`}>
                          <span>{minPrice} EGP</span>
                        </div>
                        <div className="w-2.5 h-2.5 bg-[#F96A24] rotate-45 -mt-1 shadow-md" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Helper */}
              <div className="relative z-10 text-center text-[10px] text-[#BEBAB9]">
                Tap any price pin to inspect venue details & instant book
              </div>
            </div>

            {/* Selected Venue Bottom Card in Map */}
            {mapSelectedVenue ? (
              <div className="bg-[#29211F] p-4 rounded-2xl border border-[#F96A24] shadow-2xl flex items-center gap-4">
                <img
                  src={mapSelectedVenue.images[0]}
                  alt={mapSelectedVenue.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#F96A24] font-bold">{mapSelectedVenue.area}</div>
                  <h4 className="font-anton text-lg text-white truncate uppercase">{mapSelectedVenue.name}</h4>
                  <div className="text-xs text-[#BEBAB9] flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#F96A24] fill-[#F96A24]" />
                    <span>{mapSelectedVenue.rating.toFixed(1)}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">
                      From {Math.min(...mapSelectedVenue.activities.map(a => a.basePriceEGP))} EGP
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectVenue(mapSelectedVenue)}
                  className="py-2.5 px-4 rounded-xl bg-[#F96A24] text-[#0F0503] font-anton text-xs uppercase shrink-0"
                >
                  Book
                </button>
              </div>
            ) : (
              <div className="text-center text-xs text-[#BEBAB9] py-2">
                Showing all locations in {selectedDistrict}
              </div>
            )}
          </div>
        ) : (
          /* VIEW MODE: CARDS GRID */
          <div className="space-y-4">
            {filteredVenues.length === 0 ? (
              <div className="text-center py-16 bg-[#29211F]/60 rounded-3xl border border-[#71564A]/40 p-6 space-y-3">
                <p className="font-anton text-2xl uppercase tracking-wider text-white">
                  No Venues Found
                </p>
                <p className="text-xs text-[#BEBAB9] max-w-sm mx-auto">
                  We couldn't find any activities matching your exact filters in {selectedDistrict}.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      onSelectCategory('ALL');
                      onSelectDistrict('All Cairo');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#29211F] text-xs font-bold text-white border border-[#71564A]"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={onOpenSuggestModal}
                    className="px-4 py-2 rounded-xl bg-[#F96A24] text-[#0F0503] font-bold text-xs"
                  >
                    Suggest this Place
                  </button>
                </div>
              </div>
            ) : (
              filteredVenues.map((venue) => {
                const minPrice = Math.min(...venue.activities.map(a => a.basePriceEGP));
                return (
                  <div
                    key={venue.id}
                    onClick={() => onSelectVenue(venue)}
                    className="bg-[#29211F] rounded-3xl border border-[#71564A]/40 overflow-hidden hover:border-[#F96A24] transition-all cursor-pointer group shadow-lg"
                  >
                    {/* Card Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={venue.images[0]}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#29211F] via-transparent to-black/30" />

                      {/* Top Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex gap-1 flex-wrap">
                          {venue.activities.map((a) => (
                            <span
                              key={a.id}
                              className="bg-[#0F0503]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white border border-[#71564A]/40 uppercase tracking-wider"
                            >
                              {a.category.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 bg-[#0F0503]/90 px-2.5 py-1 rounded-full text-xs font-black text-[#F96A24] border border-[#71564A]/40 shrink-0">
                          <Star className="w-3 h-3 fill-[#F96A24]" />
                          {venue.rating.toFixed(1)}
                        </div>
                      </div>

                      {/* Bottom Floating Price */}
                      <div className="absolute bottom-3 right-3 bg-[#F0F66E] text-[#0F0503] px-3 py-1 rounded-full font-anton text-sm tracking-wide shadow-md">
                        FROM {minPrice} EGP
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-anton text-xl uppercase tracking-wide text-white group-hover:text-[#F96A24] transition-colors">
                          {venue.name}
                        </h3>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                          Available Today
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#BEBAB9]">
                        <MapPin className="w-3.5 h-3.5 text-[#F96A24] shrink-0" />
                        <span className="truncate">{venue.address} • {venue.area}</span>
                      </div>

                      {/* Footer Info Row */}
                      <div className="pt-2 border-t border-[#71564A]/30 flex items-center justify-between text-xs text-[#BEBAB9]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#BEBAB9]" />
                          <span>Open until 02:00 AM</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#F96A24] font-bold text-xs group-hover:translate-x-1 transition-transform">
                          <span>Select Slot</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Suggest Place Floating Banner at Bottom of Explore */}
        <div className="mt-8 bg-gradient-to-r from-[#29211F] via-[#29211F] to-[#71564A]/30 p-5 rounded-3xl border border-[#71564A]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-[#F96A24] font-black uppercase tracking-wider">
              Community Expansion
            </div>
            <h4 className="font-anton text-lg text-white uppercase mt-0.5">
              Know a venue that should be here?
            </h4>
            <p className="text-xs text-[#BEBAB9] mt-0.5">
              Help your local gaming lounge, bowling alley, or escape room get discovered!
            </p>
          </div>
          <button
            onClick={onOpenSuggestModal}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#F0F66E] text-[#0F0503] font-anton text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0"
          >
            Suggest a Place
          </button>
        </div>
      </div>
    </div>
  );
};
