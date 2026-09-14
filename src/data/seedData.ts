import { Venue } from '../types';

export const SEED_VENUES: Venue[] = [
  {
    id: 'bowling-stars',
    name: 'Bowling Stars',
    area: 'New Cairo',
    address: 'Cairo Festival City, Ring Road, New Cairo',
    latitude: 30.027,
    longitude: 31.432,
    rating: 4.8,
    reviewCount: 1248,
    images: [
      'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578673449308-410a623048a1?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Parking', 'Air Conditioning', 'Café & Snacks', 'Free Wi-Fi', 'Card Payment', 'Arcade'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'bs-bowling',
        venueId: 'bowling-stars',
        category: 'bowling',
        title: 'Bowling Lanes',
        description: 'Championship Brunswick bowling lanes with cosmic neon lighting and automatic scoring.',
        pricingType: 'per_hour',
        basePriceEGP: 600,
        minPeople: 1,
        maxPeople: 6,
        durationMinutes: 60,
        unitLabel: 'Lane',
        totalUnits: 10,
        availableAddOns: [
          { id: 'pizza', name: 'Large Pepperoni Pizza for the Team', priceEGP: 150 },
          { id: 'drinks', name: '4x Soft Drink Combo', priceEGP: 80 },
          { id: 'shoes', name: 'Pro Bowling Shoes Rental', priceEGP: 40 }
        ]
      },
      {
        id: 'bs-billiards',
        venueId: 'bowling-stars',
        category: 'billiards',
        title: 'American Pool Tables',
        description: 'Tournament-spec 9-foot billiard tables with premium Simonis cloth and Aramith balls.',
        pricingType: 'per_hour',
        basePriceEGP: 150,
        minPeople: 1,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Table',
        totalUnits: 6,
        availableAddOns: [
          { id: 'chalk-drink', name: 'Red Bull & Cue Chalk Pack', priceEGP: 70 }
        ]
      }
    ]
  },
  {
    id: 'cue-room',
    name: 'The Cue Room',
    area: 'Maadi',
    address: 'Road 9, Degla, Maadi, Cairo',
    latitude: 29.960,
    longitude: 31.258,
    rating: 4.7,
    reviewCount: 682,
    images: [
      'https://images.unsplash.com/photo-1588865198282-f1d9675e640d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Air Conditioning', 'Specialty Coffee', 'Free Wi-Fi', 'Card Payment', 'Lounge'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'cr-billiards',
        venueId: 'cue-room',
        category: 'billiards',
        title: 'Billiards & Snooker',
        description: 'Quiet, premium lounge atmosphere designed for serious billiards and friendly matches.',
        pricingType: 'per_hour',
        basePriceEGP: 140,
        minPeople: 1,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Table',
        totalUnits: 8,
        availableAddOns: [
          { id: 'specialty-coffee', name: 'Iced Spanish Latte Combo', priceEGP: 90 }
        ]
      },
      {
        id: 'cr-pingpong',
        venueId: 'cue-room',
        category: 'ping_pong',
        title: 'Ping Pong Tables',
        description: 'Indoor table tennis arena with competition tables and Butterfly paddles.',
        pricingType: 'per_hour',
        basePriceEGP: 100,
        minPeople: 2,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Table',
        totalUnits: 4,
        availableAddOns: [
          { id: 'pro-paddles', name: 'Butterfly Carbon Paddle Upgrade', priceEGP: 35 }
        ]
      }
    ]
  },
  {
    id: 'apex-karting',
    name: 'Apex Karting Arena',
    area: '6th of October',
    address: 'Near Mall of Arabia, Juhayna Sq, 6th of October',
    latitude: 29.988,
    longitude: 30.952,
    rating: 4.9,
    reviewCount: 914,
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Outdoor Track', 'Locker Rooms', 'Safety Briefing', 'Spectator Deck', 'Parking'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'ak-kart',
        venueId: 'apex-karting',
        category: 'go_kart',
        title: 'High-Speed Go-Kart Heat',
        description: 'Sodi RT8 270cc high-torque karts on an outdoor 900m asphalt circuit with telemetry lap timers.',
        pricingType: 'per_person',
        basePriceEGP: 350,
        minPeople: 1,
        maxPeople: 12,
        durationMinutes: 15,
        unitLabel: 'Kart',
        totalUnits: 12,
        availableAddOns: [
          { id: 'balaclava', name: 'Race Balaclava & Glove Kit', priceEGP: 60 },
          { id: 'telemetry', name: 'Full Video Telemetry Lap Export', priceEGP: 120 }
        ]
      }
    ]
  },
  {
    id: 'pixel-cyber',
    name: 'Pixel Cyber Lounge',
    area: 'Nasr City',
    address: 'Abbas El Akkad St, Nasr City, Cairo',
    latitude: 30.062,
    longitude: 31.341,
    rating: 4.6,
    reviewCount: 505,
    images: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['4K OLED TVs', 'Air Conditioning', 'Snack Bar', 'High Speed Fiber', 'VIP Rooms'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'pc-gaming',
        venueId: 'pixel-cyber',
        category: 'gaming',
        title: 'PS5 & RTX Gaming Station',
        description: 'PlayStation 5 consoles hooked to 55-inch 120Hz OLED displays with EA FC 26, Tekken 8 & Mortal Kombat.',
        pricingType: 'per_hour',
        basePriceEGP: 90,
        minPeople: 1,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Station',
        totalUnits: 10,
        availableAddOns: [
          { id: 'energy-drink', name: 'Monster Energy + Loaded Nachos', priceEGP: 95 },
          { id: 'vip-upgrade', name: 'VIP Private Recliner Booth Upgrade', priceEGP: 80 }
        ]
      }
    ]
  },
  {
    id: 'trapped-cairo',
    name: 'Trapped Escape Cairo',
    area: 'Zamalek',
    address: '26th of July Corridor, Zamalek, Cairo',
    latitude: 30.061,
    longitude: 31.221,
    rating: 4.9,
    reviewCount: 1320,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Air Conditioning', 'Themed Soundtracks', 'Briefing Room', 'Souvenir Photos'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'tc-escape',
        venueId: 'trapped-cairo',
        category: 'escape_room',
        title: 'The Vault & Prison Break Rooms',
        description: '60 minutes of high-intensity cinematic puzzles, hidden passages, and immersive storytelling.',
        pricingType: 'per_person',
        basePriceEGP: 450,
        minPeople: 2,
        maxPeople: 6,
        durationMinutes: 60,
        unitLabel: 'Room',
        totalUnits: 3,
        availableAddOns: [
          { id: 'hints-pack', name: 'Extra Clues Walkie-Talkie Pack', priceEGP: 50 },
          { id: 'team-photos', name: 'Framed Team Escape Photo', priceEGP: 75 }
        ]
      }
    ]
  },
  {
    id: 'smash-spin',
    name: 'Smash & Spin Club',
    area: 'Sheikh Zayed',
    address: 'Arkan Plaza Extension, Sheikh Zayed, Giza',
    latitude: 30.012,
    longitude: 30.985,
    rating: 4.8,
    reviewCount: 744,
    images: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Valet Parking', 'Cocktail & Juice Bar', 'Lounge Seating', 'Pro Shop', 'Air Conditioning'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'ss-pingpong',
        venueId: 'smash-spin',
        category: 'ping_pong',
        title: 'Ping Pong Club Arena',
        description: 'Vibrant modern table tennis club with upbeat sound system, drink service, and tournament tables.',
        pricingType: 'per_hour',
        basePriceEGP: 120,
        minPeople: 2,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Table',
        totalUnits: 6,
        availableAddOns: [
          { id: 'mocktails', name: 'Signature Fresh Mocktail Pitcher', priceEGP: 140 }
        ]
      },
      {
        id: 'ss-bowling',
        venueId: 'smash-spin',
        category: 'bowling',
        title: 'Boutique Bowling Lanes',
        description: 'Intimate boutique bowling lounge with plush sofas and bottle service.',
        pricingType: 'per_hour',
        basePriceEGP: 550,
        minPeople: 1,
        maxPeople: 6,
        durationMinutes: 60,
        unitLabel: 'Lane',
        totalUnits: 8,
        availableAddOns: [
          { id: 'nachos-platter', name: 'Artisan Loaded Nachos Platter', priceEGP: 160 }
        ]
      }
    ]
  },
  {
    id: 'strike-zone',
    name: 'Strike Zone 6',
    area: 'Nasr City',
    address: 'Makram Ebeid, Nasr City, Cairo',
    latitude: 30.065,
    longitude: 31.348,
    rating: 4.5,
    reviewCount: 391,
    images: ['https://images.unsplash.com/photo-1578673449308-410a623048a1?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Parking', 'Air Conditioning', 'Fast Food Court'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'sz-bowling',
        venueId: 'strike-zone',
        category: 'bowling',
        title: 'Family Bowling Lanes',
        description: 'Classic American bowling center suitable for family challenges and birthday tournaments.',
        pricingType: 'per_hour',
        basePriceEGP: 580,
        minPeople: 1,
        maxPeople: 6,
        durationMinutes: 60,
        unitLabel: 'Lane',
        totalUnits: 8,
        availableAddOns: []
      }
    ]
  },
  {
    id: 'green-felt',
    name: 'Green Felt Society',
    area: 'Zamalek',
    address: 'Brazil Street, Zamalek, Cairo',
    latitude: 30.059,
    longitude: 31.218,
    rating: 4.4,
    reviewCount: 268,
    images: ['https://images.unsplash.com/photo-1588865198282-f1d9675e640d?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Air Conditioning', 'Espresso Bar', 'Vintage Decor'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'gf-billiards',
        venueId: 'green-felt',
        category: 'billiards',
        title: 'Vintage Pool & Snooker',
        description: 'Classic British snooker & pool club founded in 1994, with mahogany tables.',
        pricingType: 'per_hour',
        basePriceEGP: 130,
        minPeople: 1,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Table',
        totalUnits: 6,
        availableAddOns: []
      }
    ]
  },
  {
    id: 'topspin-maadi',
    name: 'Topspin Maadi',
    area: 'Maadi',
    address: 'Victoria Square, Maadi, Cairo',
    latitude: 29.957,
    longitude: 31.264,
    rating: 4.6,
    reviewCount: 314,
    images: ['https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Air Conditioning', 'Locker Room', 'Pro Coaching Available'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'tm-pingpong',
        venueId: 'topspin-maadi',
        category: 'ping_pong',
        title: 'Topspin Table Tennis',
        description: 'Dedicated table tennis training academy and social club with Olympic flooring.',
        pricingType: 'per_hour',
        basePriceEGP: 95,
        minPeople: 2,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Table',
        totalUnits: 8,
        availableAddOns: []
      }
    ]
  },
  {
    id: 'nitro-kart',
    name: 'Nitro Kart Club',
    area: 'New Cairo',
    address: 'South 90th St, New Cairo, Cairo',
    latitude: 30.015,
    longitude: 31.442,
    rating: 4.7,
    reviewCount: 442,
    images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Floodlit Track', 'Spectator Cafe', 'Parking', 'Helmet Sterilizer'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'nk-kart',
        venueId: 'nitro-kart',
        category: 'go_kart',
        title: 'Night Karting Heats',
        description: 'Illuminated night circuit for sprint racing with friends under neon floodlights.',
        pricingType: 'per_person',
        basePriceEGP: 290,
        minPeople: 1,
        maxPeople: 10,
        durationMinutes: 15,
        unitLabel: 'Kart',
        totalUnits: 10,
        availableAddOns: []
      }
    ]
  },
  {
    id: 'respawn-hub',
    name: 'Respawn Hub',
    area: '6th of October',
    address: 'Al Hosary Square, 6th of October, Giza',
    latitude: 29.975,
    longitude: 30.941,
    rating: 4.5,
    reviewCount: 206,
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Air Conditioning', 'RGB Lights', 'Discord Booths', 'Energy Drinks'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'rh-gaming',
        venueId: 'respawn-hub',
        category: 'gaming',
        title: 'PS5 & PC Gaming Hub',
        description: 'Community gaming hub with low latency 1Gbps internet and cozy couch co-op.',
        pricingType: 'per_hour',
        basePriceEGP: 75,
        minPeople: 1,
        maxPeople: 4,
        durationMinutes: 60,
        unitLabel: 'Station',
        totalUnits: 12,
        availableAddOns: []
      }
    ]
  },
  {
    id: 'mystery-lab',
    name: 'Mystery Lab Cairo',
    area: 'Sheikh Zayed',
    address: 'Beverly Hills, Sheikh Zayed, Giza',
    latitude: 30.038,
    longitude: 30.998,
    rating: 4.8,
    reviewCount: 529,
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Air Conditioning', 'Free Parking', 'Actors Included', 'Lounge'],
    cancellationPolicyHours: 24,
    activities: [
      {
        id: 'ml-escape',
        venueId: 'mystery-lab',
        category: 'escape_room',
        title: 'Mad Scientist & Secret Agent',
        description: 'Multi-room puzzle journey with live actors, mechanical locks, and immersive lasers.',
        pricingType: 'per_person',
        basePriceEGP: 380,
        minPeople: 2,
        maxPeople: 6,
        durationMinutes: 60,
        unitLabel: 'Room',
        totalUnits: 3,
        availableAddOns: []
      }
    ]
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'bowling', label: 'Bowling', icon: '🎳' },
  { id: 'billiards', label: 'Billiards', icon: '🎱' },
  { id: 'ping_pong', label: 'Ping Pong', icon: '🏓' },
  { id: 'go_kart', label: 'Go-Kart', icon: '🏎️' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'escape_room', label: 'Escape Rooms', icon: '🔐' }
] as const;

export const CAIRO_DISTRICTS: { name: string; lat: number; lng: number }[] = [
  { name: 'New Cairo', lat: 30.02, lng: 31.43 },
  { name: 'Nasr City', lat: 30.06, lng: 31.34 },
  { name: 'Maadi', lat: 29.96, lng: 31.25 },
  { name: 'Zamalek', lat: 30.06, lng: 31.22 },
  { name: '6th of October', lat: 29.98, lng: 30.95 },
  { name: 'Sheikh Zayed', lat: 30.01, lng: 30.98 }
];
