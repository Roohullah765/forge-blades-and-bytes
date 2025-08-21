// Mock product data for our knife store
// This contains 25 knives across different categories with realistic details

export interface Product {
  id: string;
  name: string;
  category: 'chef' | 'paring' | 'santoku' | 'cleaver' | 'pocket' | 'hunting' | 'fixed-blade';
  price: number;
  description: string;
  specifications: {
    bladeLength: string;
    totalLength: string;
    bladeMaterial: string;
    handleMaterial: string;
    weight: string;
    origin: string;
  };
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  // Chef Knives
  {
    id: 'chef-001',
    name: 'Elite Damascus Chef Knife',
    category: 'chef',
    price: 299.99,
    description: 'Professional-grade Damascus steel chef knife with exceptional sharpness and edge retention. Perfect for all kitchen tasks from chopping vegetables to slicing meat.',
    specifications: {
      bladeLength: '8 inches (20cm)',
      totalLength: '13 inches (33cm)',
      bladeMaterial: 'Damascus Steel (67 layers)',
      handleMaterial: 'Ebony Wood with Brass Bolster',
      weight: '7.2 oz (204g)',
      origin: 'Japan'
    },
    features: [
      '67-layer Damascus steel construction',
      'Razor-sharp 15° edge angle',
      'Ergonomic ebony handle',
      'Brass bolster for balance',
      'Corrosion resistant'
    ],
    images: ['/images/chef-damascus-1.jpg', '/images/chef-damascus-2.jpg'],
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    featured: true
  },
  {
    id: 'chef-002', 
    name: 'Classic German Chef Knife',
    category: 'chef',
    price: 179.99,
    description: 'Traditional German forged chef knife with full tang construction and triple-riveted handle. Built to last generations.',
    specifications: {
      bladeLength: '8 inches (20cm)',
      totalLength: '12.5 inches (32cm)', 
      bladeMaterial: 'German Stainless Steel',
      handleMaterial: 'Black Polymer with Steel Rivets',
      weight: '8.1 oz (230g)',
      origin: 'Germany'
    },
    features: [
      'Full tang construction',
      'Triple-riveted handle',
      'Ice-hardened blade',
      'Dishwasher safe',
      'Lifetime warranty'
    ],
    images: ['/images/chef-german-1.jpg', '/images/chef-german-2.jpg'],
    rating: 4.7,
    reviewCount: 189,
    inStock: true
  },
  {
    id: 'chef-003',
    name: 'Carbon Steel Gyuto',
    category: 'chef',
    price: 249.99,
    description: 'Traditional Japanese Gyuto knife in blue carbon steel. Develops a beautiful patina over time and takes an incredibly sharp edge.',
    specifications: {
      bladeLength: '9 inches (24cm)',
      totalLength: '14 inches (36cm)',
      bladeMaterial: 'Blue Carbon Steel #2',
      handleMaterial: 'Magnolia Wood',
      weight: '6.8 oz (193g)',
      origin: 'Japan'
    },
    features: [
      'Blue carbon steel core',
      'Hand-forged construction',
      'Traditional wa-handle',
      'Develops patina',
      'Ultra-thin blade geometry'
    ],
    images: ['/images/chef-gyuto-1.jpg', '/images/chef-gyuto-2.jpg'],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    featured: true
  },

  // Paring Knives
  {
    id: 'paring-001',
    name: 'Precision Paring Knife',
    category: 'paring',
    price: 89.99,
    description: 'Nimble paring knife for detailed work. Perfect for peeling, trimming, and intricate cutting tasks.',
    specifications: {
      bladeLength: '3.5 inches (9cm)',
      totalLength: '7 inches (18cm)',
      bladeMaterial: 'High Carbon Stainless Steel',
      handleMaterial: 'Stabilized Wood',
      weight: '2.1 oz (60g)',
      origin: 'USA'
    },
    features: [
      'Surgical-grade steel',
      'Ergonomic grip',
      'Stain resistant',
      'Easy to sharpen',
      'Lightweight design'
    ],
    images: ['/images/paring-1.jpg', '/images/paring-2.jpg'],
    rating: 4.6,
    reviewCount: 78,
    inStock: true
  },
  {
    id: 'paring-002',
    name: 'Classic Paring Set',
    category: 'paring',
    price: 129.99,
    description: 'Set of three paring knives: straight, curved, and serrated. Complete solution for all small cutting tasks.',
    specifications: {
      bladeLength: '3 inches (7.5cm)',
      totalLength: '6.5 inches (17cm)',
      bladeMaterial: 'German Stainless Steel',
      handleMaterial: 'Black Polymer',
      weight: '1.8 oz each (51g)',
      origin: 'Germany'
    },
    features: [
      'Set of 3 knives',
      'Multiple blade styles',
      'Matching handles',
      'Storage block included',
      'Dishwasher safe'
    ],
    images: ['/images/paring-set-1.jpg', '/images/paring-set-2.jpg'],
    rating: 4.5,
    reviewCount: 92,
    inStock: true
  },

  // Santoku Knives
  {
    id: 'santoku-001',
    name: 'Hollowed Santoku Knife',
    category: 'santoku',
    price: 189.99,
    description: 'Japanese-style santoku with hollowed edge to prevent sticking. Excellent for vegetables, fish, and meat.',
    specifications: {
      bladeLength: '7 inches (18cm)',
      totalLength: '11.5 inches (29cm)',
      bladeMaterial: 'VG-10 Steel Core',
      handleMaterial: 'Pakkawood',
      weight: '5.9 oz (167g)',
      origin: 'Japan'
    },
    features: [
      'Hollowed edge design',
      'VG-10 steel core',
      'Granton blade',
      'Non-slip handle',
      'Versatile cutting'
    ],
    images: ['/images/santoku-1.jpg', '/images/santoku-2.jpg'],
    rating: 4.8,
    reviewCount: 143,
    inStock: true,
    featured: true
  },
  {
    id: 'santoku-002',
    name: 'Traditional Santoku',
    category: 'santoku',
    price: 159.99,
    description: 'Classic Japanese santoku knife with traditional profile. All-purpose kitchen knife for the home cook.',
    specifications: {
      bladeLength: '6.5 inches (16.5cm)',
      totalLength: '11 inches (28cm)',
      bladeMaterial: 'AUS-10 Stainless Steel',
      handleMaterial: 'Traditional Wood',
      weight: '5.2 oz (147g)',
      origin: 'Japan'
    },
    features: [
      'Traditional Japanese profile',
      'AUS-10 steel',
      'Comfortable grip',
      'Easy maintenance',
      'Versatile design'
    ],
    images: ['/images/santoku-traditional-1.jpg', '/images/santoku-traditional-2.jpg'],
    rating: 4.6,
    reviewCount: 87,
    inStock: true
  },

  // Cleaver Knives
  {
    id: 'cleaver-001',
    name: 'Heavy Duty Cleaver',
    category: 'cleaver',
    price: 149.99,
    description: 'Robust meat cleaver for heavy-duty kitchen tasks. Perfect for breaking down large cuts of meat and poultry.',
    specifications: {
      bladeLength: '7 inches (18cm)',
      totalLength: '12 inches (30cm)',
      bladeMaterial: '440C Stainless Steel',
      handleMaterial: 'Textured Polymer',
      weight: '12.5 oz (354g)',
      origin: 'China'
    },
    features: [
      'Heavy-duty construction',
      'Full tang design',
      'Non-slip grip',
      'Thick blade spine',
      'Easy to clean'
    ],
    images: ['/images/cleaver-1.jpg', '/images/cleaver-2.jpg'],
    rating: 4.4,
    reviewCount: 56,
    inStock: true
  },
  {
    id: 'cleaver-002',
    name: 'Chinese Vegetable Cleaver',
    category: 'cleaver',
    price: 119.99,
    description: 'Thin Chinese-style cleaver perfect for vegetables and light chopping tasks. Surprisingly versatile.',
    specifications: {
      bladeLength: '8 inches (20cm)',
      totalLength: '13 inches (33cm)',
      bladeMaterial: 'Carbon Steel',
      handleMaterial: 'Hardwood',
      weight: '7.8 oz (221g)',
      origin: 'China'
    },
    features: [
      'Thin blade profile',
      'Carbon steel edge',
      'Traditional design',
      'Lightweight feel',
      'Develops patina'
    ],
    images: ['/images/cleaver-chinese-1.jpg', '/images/cleaver-chinese-2.jpg'],
    rating: 4.7,
    reviewCount: 73,
    inStock: true
  },

  // Pocket/Folding Knives
  {
    id: 'pocket-001',
    name: 'Tactical EDC Folding Knife',
    category: 'pocket',
    price: 129.99,
    description: 'Everyday carry folding knife with assisted opening and tactical features. Perfect for utility tasks.',
    specifications: {
      bladeLength: '3.5 inches (9cm)',
      totalLength: '8 inches open (20cm)',
      bladeMaterial: 'S30V Steel',
      handleMaterial: 'G10 Composite',
      weight: '4.2 oz (119g)',
      origin: 'USA'
    },
    features: [
      'Assisted opening',
      'Pocket clip',
      'Liner lock',
      'Thumb studs',
      'Glass breaker tip'
    ],
    images: ['/images/pocket-tactical-1.jpg', '/images/pocket-tactical-2.jpg'],
    rating: 4.8,
    reviewCount: 198,
    inStock: true,
    featured: true
  },
  {
    id: 'pocket-002',
    name: 'Classic Gentleman\'s Folder',
    category: 'pocket',
    price: 89.99,
    description: 'Traditional gentleman\'s folding knife with elegant design. Perfect for everyday carry.',
    specifications: {
      bladeLength: '3 inches (7.5cm)',
      totalLength: '7 inches open (18cm)',
      bladeMaterial: '154CM Steel',
      handleMaterial: 'Bone',
      weight: '3.1 oz (88g)',
      origin: 'USA'
    },
    features: [
      'Traditional design',
      'Bone handle scales',
      'Slip joint mechanism',
      'Polished finish',
      'Collector quality'
    ],
    images: ['/images/pocket-gentleman-1.jpg', '/images/pocket-gentleman-2.jpg'],
    rating: 4.5,
    reviewCount: 67,
    inStock: true
  },
  {
    id: 'pocket-003',
    name: 'Utility Multi-tool Knife',
    category: 'pocket',
    price: 159.99,
    description: 'Multi-function pocket knife with various tools. Essential for outdoor activities and daily tasks.',
    specifications: {
      bladeLength: '3.25 inches (8cm)',
      totalLength: '4.5 inches closed (11cm)',
      bladeMaterial: '420HC Steel',
      handleMaterial: 'Stainless Steel',
      weight: '5.8 oz (164g)',
      origin: 'Switzerland'
    },
    features: [
      '15 built-in tools',
      'Locking blade',
      'Can opener',
      'Screwdrivers',
      'Lifetime warranty'
    ],
    images: ['/images/pocket-multi-1.jpg', '/images/pocket-multi-2.jpg'],
    rating: 4.6,
    reviewCount: 134,
    inStock: true
  },

  // Hunting Knives
  {
    id: 'hunting-001',
    name: 'Professional Skinning Knife',
    category: 'hunting',
    price: 179.99,
    description: 'Curved skinning knife designed for efficient field dressing and processing of game.',
    specifications: {
      bladeLength: '4 inches (10cm)',
      totalLength: '8.5 inches (21cm)',
      bladeMaterial: 'D2 Tool Steel',
      handleMaterial: 'Micarta',
      weight: '4.8 oz (136g)',
      origin: 'USA'
    },
    features: [
      'Curved skinning blade',
      'D2 tool steel',
      'Full tang construction',
      'Leather sheath included',
      'Field-tested design'
    ],
    images: ['/images/hunting-skinning-1.jpg', '/images/hunting-skinning-2.jpg'],
    rating: 4.7,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 'hunting-002',
    name: 'Drop Point Hunter',
    category: 'hunting',
    price: 149.99,
    description: 'Versatile drop point hunting knife for general field work and processing tasks.',
    specifications: {
      bladeLength: '4.5 inches (11cm)',
      totalLength: '9 inches (23cm)',
      bladeMaterial: '1084 Carbon Steel',
      handleMaterial: 'Antler',
      weight: '5.4 oz (153g)',
      origin: 'USA'
    },
    features: [
      'Drop point design',
      'Carbon steel blade',
      'Antler handle',
      'Hand forged',
      'Custom leather sheath'
    ],
    images: ['/images/hunting-drop-1.jpg', '/images/hunting-drop-2.jpg'],
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    featured: true
  },
  {
    id: 'hunting-003',
    name: 'Gut Hook Hunter',
    category: 'hunting',
    price: 134.99,
    description: 'Specialized hunting knife with integrated gut hook for field dressing game.',
    specifications: {
      bladeLength: '4 inches (10cm)',
      totalLength: '8.75 inches (22cm)',
      bladeMaterial: '440C Stainless Steel',
      handleMaterial: 'Rubber Overmold',
      weight: '5.1 oz (144g)',
      origin: 'USA'
    },
    features: [
      'Integrated gut hook',
      'Stainless steel blade',
      'Non-slip grip',
      'Corrosion resistant',
      'Nylon sheath included'
    ],
    images: ['/images/hunting-gut-1.jpg', '/images/hunting-gut-2.jpg'],
    rating: 4.4,
    reviewCount: 52,
    inStock: true
  },

  // Fixed Blade Knives
  {
    id: 'fixed-001',
    name: 'Bushcraft Survival Knife',
    category: 'fixed-blade',
    price: 199.99,
    description: 'Heavy-duty survival knife built for bushcraft and outdoor adventures. Full tang construction with fire starter.',
    specifications: {
      bladeLength: '5 inches (13cm)',
      totalLength: '10 inches (25cm)',
      bladeMaterial: '1095 High Carbon Steel',
      handleMaterial: 'Canvas Micarta',
      weight: '8.2 oz (232g)',
      origin: 'USA'
    },
    features: [
      'Full tang construction',
      'Fire steel striker',
      'Scandi grind',
      'Kydex sheath',
      'Paracord lanyard'
    ],
    images: ['/images/fixed-bushcraft-1.jpg', '/images/fixed-bushcraft-2.jpg'],
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    featured: true
  },
  {
    id: 'fixed-002',
    name: 'Combat Tactical Knife',
    category: 'fixed-blade',
    price: 249.99,
    description: 'Military-inspired tactical knife with aggressive design and premium materials.',
    specifications: {
      bladeLength: '6 inches (15cm)',
      totalLength: '11 inches (28cm)',
      bladeMaterial: 'CPM-3V Steel',
      handleMaterial: 'G10 Composite',
      weight: '9.8 oz (278g)',
      origin: 'USA'
    },
    features: [
      'Tactical design',
      'CPM-3V steel',
      'Aggressive serrations',
      'MOLLE compatible sheath',
      'Mil-spec coating'
    ],
    images: ['/images/fixed-tactical-1.jpg', '/images/fixed-tactical-2.jpg'],
    rating: 4.6,
    reviewCount: 94,
    inStock: true
  },
  {
    id: 'fixed-003',
    name: 'Classic Bowie Knife',
    category: 'fixed-blade',
    price: 189.99,
    description: 'Traditional Bowie knife with classic design and modern materials. A timeless piece.',
    specifications: {
      bladeLength: '7 inches (18cm)',
      totalLength: '12 inches (30cm)',
      bladeMaterial: '5160 Spring Steel',
      handleMaterial: 'Stag Horn',
      weight: '10.5 oz (298g)',
      origin: 'USA'
    },
    features: [
      'Classic Bowie profile',
      'Spring steel blade',
      'Stag horn handle',
      'Brass guard',
      'Hand-stitched sheath'
    ],
    images: ['/images/fixed-bowie-1.jpg', '/images/fixed-bowie-2.jpg'],
    rating: 4.7,
    reviewCount: 78,
    inStock: true
  },
  {
    id: 'fixed-004',
    name: 'Fillet Fishing Knife',
    category: 'fixed-blade',
    price: 79.99,
    description: 'Flexible fillet knife perfect for cleaning fish. Thin blade for precise cuts.',
    specifications: {
      bladeLength: '6 inches (15cm)',
      totalLength: '11 inches (28cm)',
      bladeMaterial: '420J2 Stainless Steel',
      handleMaterial: 'Non-slip Rubber',
      weight: '3.9 oz (110g)',
      origin: 'Finland'
    },
    features: [
      'Flexible blade',
      'Corrosion resistant',
      'Ergonomic handle',
      'Easy to clean',
      'Floating design'
    ],
    images: ['/images/fixed-fillet-1.jpg', '/images/fixed-fillet-2.jpg'],
    rating: 4.3,
    reviewCount: 41,
    inStock: true
  },
  {
    id: 'fixed-005',
    name: 'Utility Work Knife',
    category: 'fixed-blade',
    price: 69.99,
    description: 'Sturdy work knife for everyday utility tasks. Built to handle tough jobs.',
    specifications: {
      bladeLength: '4 inches (10cm)',
      totalLength: '8.5 inches (21cm)',
      bladeMaterial: '8Cr13MoV Steel',
      handleMaterial: 'TPR Rubber',
      weight: '4.6 oz (130g)',
      origin: 'China'
    },
    features: [
      'Utility blade shape',
      'Stain resistant steel',
      'Comfortable grip',
      'Belt clip',
      'Value pricing'
    ],
    images: ['/images/fixed-utility-1.jpg', '/images/fixed-utility-2.jpg'],
    rating: 4.1,
    reviewCount: 28,
    inStock: true
  }
];

// Helper functions to filter and find products
export const getProductsByCategory = (category: Product['category']) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured === true);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getAllCategories = () => {
  return ['chef', 'paring', 'santoku', 'cleaver', 'pocket', 'hunting', 'fixed-blade'] as const;
};

export const getCategoryDisplayName = (category: Product['category']) => {
  const names = {
    'chef': 'Chef Knives',
    'paring': 'Paring Knives', 
    'santoku': 'Santoku Knives',
    'cleaver': 'Cleavers',
    'pocket': 'Pocket & Folding',
    'hunting': 'Hunting Knives',
    'fixed-blade': 'Fixed Blade'
  };
  return names[category];
};