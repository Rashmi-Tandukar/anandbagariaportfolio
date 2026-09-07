// ---------------------------------------------------------------------------
// Nimbus is Anand Bagaria's flagship venture — ONE company with multiple
// business divisions and consumer brands underneath it. It is deliberately
// modeled as a single object (not a list) so the UI can never render it as
// "just another venture card" alongside separate businesses.
//
// `divisions` = the group's operating segments (Food, Animal Nutrition, FMCG).
// `brands` = the consumer-facing brands/products that sit inside those
// divisions (per the public Nimbus site): Byanjan, Sunaulo Kiran, Shakti,
// Soyabadi, Pro-Min, and the farmer-facing Krishi Sewa network.
// ---------------------------------------------------------------------------

export interface NimbusStat {
  value: string;
  label: string;
}

export interface NimbusDivision {
  id: string;
  name: string;
}

export interface NimbusBrand {
  id: string;
  name: string;
  /** Which division/category this brand is grouped under when the brand
   *  grid is shown by section (matches a `divisions[].id` below, or
   *  'farmer-network' for the standalone Krishi Sewa network). */
  divisionId: string;
  /** Short label shown under the brand card in the carousel, e.g.
   *  'Edible Oil', 'Poultry Feed'. */
  category: string;
  /** Optional — path to a real logo image (e.g. '/images/ventures/brands/byanjan.png').
   *  Leave unset and the badge shows a monogram placeholder instead. */
  logo?: string;
}

export interface NimbusVenture {
  name: string;
  tagline: string;
  /** Short line shown as an overlay caption on the flagship hero panel
   *  (e.g. 'Growing Together'). */
  heroTagline: string;
  /** Optional — path to a real building/office photo for the flagship hero
   *  panel. Leave unset and a stylized gradient panel with the logo is
   *  shown instead. */
  heroImage?: string;
  /** Short paragraph describing the venture, shown next to the hero panel. */
  description: string;
  categories: string[];
  logo: string;
  role: string;
  /** Leave '' until a real corporate site/page exists — the CTA falls back to #contact. */
  website: string;
  stats: NimbusStat[];
  divisions: NimbusDivision[];
  brands: NimbusBrand[];
}

export const nimbus: NimbusVenture = {
  name: 'Nimbus',
  tagline: 'Cultivating Partnerships',
  heroTagline: 'Growing Together',
  // PLACEHOLDER — add a real building/office photo at
  // public/images/ventures/nimbus-hero.jpg and set heroImage to its path;
  // until then the hero panel shows a stylized gradient with the logo.
  description:
    'As a trusted partner in Nepal\u2019s growth story, Nimbus builds sustainable businesses that empower farmers, support communities, and deliver quality products to households across the country.',
  categories: ['Agribusiness', 'Food', 'Animal Nutrition', 'FMCG'],
  logo: '/images/ventures/nimbus.png',
  role: 'Managing Director — Anand Bagaria',
  website: '',
  stats: [
    { value: '20+', label: 'Years of Growth' },
    { value: '35K+', label: 'Farmer Partners' },
    { value: '800+', label: 'Employees' },
  ],
  divisions: [
    { id: 'food', name: 'Food' },
    { id: 'animal-nutrition', name: 'Animal Nutrition' },
    { id: 'farmer-network', name: 'Farmer Network' },
  ],
  brands: [
    // Add the actual file at public/images/ventures/brands/byanjan.png —
    // the floating badge will show it in place of the "BY" monogram.
    {
      id: 'byanjan',
      name: 'Byanjan',
      divisionId: 'food',
      category: 'Food & Beverages',
      logo: '/images/ventures/brands/byanjan2.jpg',
    },
    {
      id: 'sunaulo-kiran',
      name: 'Sunaulo Kiran',
      divisionId: 'food',
      category: 'Edible Oil',
      logo: '/images/ventures/brands/sunaulokiran2.png',
    },
    { id: 'shakti', name: 'Shakti', divisionId: 'animal-nutrition', category: 'Poultry Feed' },
    { id: 'soyabadi', name: 'Soyabadi', divisionId: 'food', category: 'Soybean Products' },
    { id: 'pro-min', name: 'Pro-Min', divisionId: 'animal-nutrition', category: 'Animal Nutrition' },
    { id: 'krishi-sewa', name: 'Krishi Sewa', divisionId: 'farmer-network', category: 'Farmer Network' },
  ],
};

// ---------------------------------------------------------------------------
// Genuine standalone ventures & investments — separate legal entities Anand
// leads or backs outside the Nimbus ecosystem above. Nimbus is intentionally
// excluded from this list; it's rendered as the dedicated featured block.
// ---------------------------------------------------------------------------

export interface OtherVenture {
  id: string;
  name: string;
  description: string;
  category: string;
  role?: string;
}

export const otherVentures: OtherVenture[] = [
  {
    id: 'probiotech-industries',
    name: 'Probiotech Industries',
    description:
      'Feed, premix, and solvent extraction, alongside edible oil refining \u2014 a separate manufacturing base steadily building share in Nepal\u2019s food processing sector.',
    category: 'Food Processing',
    role: 'Managing Director',
  },
  {
    id: 'deepee',
    name: 'Deepee',
    description:
      'A consumer brand in animal nutrition and food products \u2014 known across Nepal for quality and reliability, with ambitions to grow beyond its borders.',
    category: 'Consumer Brand',
  },
  {
    id: 'progeochem-industries',
    name: 'Progeochem Industries',
    description:
      'Established in 2000 as National Polyplast, manufacturing poly-woven fabrics \u2014 an early move from trading into industrial production.',
    category: 'Manufacturing',
  },
  {
    id: 'nepal-gas',
    name: 'Nepal Gas & Samriddhi Gas Udhyog',
    description:
      'A move into the LPG business, extending distribution strength from agriculture and FMCG into household energy.',
    category: 'Energy',
  },
  {
    id: 'shreenagar-agro',
    name: 'Shreenagar Agro',
    description:
      'An independent agribusiness venture reinforcing a farm-to-market presence across Nepal, distinct from the Nimbus group.',
    category: 'Agribusiness',
  },
];