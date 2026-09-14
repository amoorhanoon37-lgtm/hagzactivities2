export type ActivityCategory = 
  | 'bowling' 
  | 'billiards' 
  | 'ping_pong' 
  | 'go_kart' 
  | 'gaming' 
  | 'escape_room';

export type CairoDistrict = 
  | 'New Cairo' 
  | 'Nasr City' 
  | 'Maadi' 
  | 'Zamalek' 
  | '6th of October' 
  | 'Sheikh Zayed';

export interface AmenityAddOn {
  id: string;
  name: string;
  priceEGP: number;
}

export interface Activity {
  id: string;
  venueId: string;
  category: ActivityCategory;
  title: string;
  description: string;
  pricingType: 'per_hour' | 'per_person' | 'per_session' | 'per_room';
  basePriceEGP: number;
  minPeople: number;
  maxPeople: number;
  durationMinutes: number;
  unitLabel: string; // "Lane", "Table", "PS5 Station", "Room", "Kart"
  totalUnits: number;
  availableAddOns: AmenityAddOn[];
}

export interface Venue {
  id: string;
  name: string;
  area: CairoDistrict;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  cancellationPolicyHours: number;
  activities: Activity[];
}

export interface TimeSlot {
  time: string; // e.g. "07:00 PM"
  available: boolean;
  unitsLeft: number;
}

export type PaymentMethod = 
  | 'mobile_wallet' 
  | 'instapay' 
  | 'card' 
  | 'apple_pay';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  reference: string;
  venueId: string;
  venueName: string;
  venueAddress: string;
  activityId: string;
  activityCategory: ActivityCategory;
  activityTitle: string;
  unitAssigned: string;
  date: string;
  time: string;
  players: number;
  basePrice: number;
  selectedAddOns: AmenityAddOn[];
  addOnsTotal: number;
  serviceFee: number;
  pointsRedeemed: number;
  pointsDiscountEGP: number;
  totalAmountEGP: number;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  createdAt: string;
  slotTimestamp: number; // for cancellation tier calculation
  pointsEarned: number;
  qrCodeDataUrl?: string;
}

export interface Review {
  id: string;
  venueId: string;
  bookingId: string;
  userName: string;
  rating: number;
  cleanliness: number;
  equipment: number;
  staff: number;
  value: number;
  comment: string;
  date: string;
}

export interface PlaceSuggestion {
  id: string;
  userType: 'owner' | 'customer';
  venueName: string;
  category: string;
  region: string;
  exactAddress?: string;
  googleMapsLink?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  status: 'pending_review' | 'approved';
}

export interface UserPreferences {
  confirmations: boolean;
  reminders: boolean;
  promotions: boolean;
}
