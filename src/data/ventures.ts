import { Sprout, Droplets, Award, Package, Flame, Wheat, Store, type LucideIcon } from 'lucide-react';
import type { Company } from '../types/profile';

export interface Venture extends Company {
  icon: LucideIcon;
}

export const ventures: Venture[] = [
  {
    id: 'nimbus-holdings',
    name: 'Nimbus Holdings',
    description:
      'The flagship of the group. Started as a trading enterprise and grew into one of Nepal\u2019s leading agribusiness companies, built on animal feed manufacturing and a nationwide distribution network.',
    category: 'Agribusiness',
    role: 'Managing Director',
    logo: '',
    website: '',
    icon: Sprout,
  },
  {
    id: 'probiotech-industries',
    name: 'Probiotech Industries',
    description:
      'Feed, premix, and solvent extraction, alongside edible oil refining under the Byanjan and Sunaulo Kiran brands \u2014 steadily building share in Nepal\u2019s edible oil market.',
    category: 'Food Processing',
    role: 'Managing Director',
    logo: '',
    website: '',
    icon: Droplets,
  },
  {
    id: 'deepee',
    name: 'Deepee',
    description:
      'The group\u2019s flagship consumer brand in animal nutrition and food products \u2014 known across Nepal for quality and reliability, with ambitions to grow beyond its borders.',
    category: 'Consumer Brand',
    logo: '',
    website: '',
    icon: Award,
  },
  {
    id: 'progeochem-industries',
    name: 'Progeochem Industries',
    description:
      'Established in 2000 as National Polyplast, manufacturing poly-woven fabrics \u2014 the group\u2019s move from trading into industrial production.',
    category: 'Manufacturing',
    logo: '',
    website: '',
    icon: Package,
  },
  {
    id: 'nepal-gas',
    name: 'Nepal Gas & Samriddhi Gas Udhyog',
    description:
      'A move into the LPG business, extending the group\u2019s distribution strength from agriculture and FMCG into household energy.',
    category: 'Energy',
    logo: '',
    website: '',
    icon: Flame,
  },
  {
    id: 'shreenagar-agro',
    name: 'Shreenagar Agro',
    description:
      'Another agribusiness vertical within the group, reinforcing Nimbus\u2019s presence across Nepal\u2019s farm-to-market supply chain.',
    category: 'Agribusiness',
    logo: '',
    website: '',
    icon: Wheat,
  },
  {
    id: 'nimbus-krishi-sewa',
    name: 'Nimbus Krishi Sewa',
    description:
      'A network of one-stop agri-service centres \u2014 already active in Kathmandu, Narayanghat, and Birgunj \u2014 built to bring inputs and expertise directly to farmers.',
    category: 'Farmer Services',
    logo: '',
    website: '',
    icon: Store,
  },
];