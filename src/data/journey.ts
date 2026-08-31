import { Rocket, Leaf, Factory, Building2, Landmark, Mountain, Tv, type LucideIcon } from 'lucide-react';
import type { JourneyItem } from '../types/profile';

export interface JourneyMilestone extends JourneyItem {
  icon: LucideIcon;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'founding',
    period: '2000',
    title: 'Founded Nimbus',
    description:
      'Started Nimbus as a modest trading enterprise \u2014 the first step in what would grow into one of Nepal\u2019s leading agribusiness groups.',
    category: 'Entrepreneurship',
    icon: Rocket,
    // Drop a company/milestone photo at public/images/journey/founding.jpg and
    // point this at it, e.g. '/images/journey/founding.jpg'. Leave empty to use
    // the icon illustration instead.
    image: '',
  },
  {
    id: 'supply-chain',
    period: 'Early Growth',
    title: 'Building Supply-Chain Depth',
    description:
      'Expanded into feed milling and agri-processing, working closely with farmers and distributors to build a business rooted in long-term partnership.',
    category: 'Agribusiness',
    icon: Leaf,
    // Drop a company/milestone photo at public/images/journey/supply-chain.jpg and
    // point this at it, e.g. '/images/journey/supply-chain.jpg'. Leave empty to use
    // the icon illustration instead.
    image: '',
  },
  {
    id: 'diversification',
    period: 'Expansion',
    title: 'Diversifying Into Oil & FMCG',
    description:
      'Grew Nimbus into a diversified group spanning edible oil refining and FMCG distribution, deepening its footprint across Nepal\u2019s economy.',
    category: 'Growth',
    icon: Factory,
    // Drop a company/milestone photo at public/images/journey/diversification.jpg and
    // point this at it, e.g. '/images/journey/diversification.jpg'. Leave empty to use
    // the icon illustration instead.
    image:'',
  },
  {
    id: 'probiotech',
    period: 'Leadership',
    title: 'Managing Director, Probiotech Industries',
    description:
      'Took on leadership of Probiotech Industries alongside Nimbus, extending an operator\u2019s discipline across another corner of Nepal\u2019s agribusiness sector.',
    category: 'Leadership',
    icon: Building2,
    // Drop a company/milestone photo at public/images/journey/probiotech.jpg and
    // point this at it, e.g. '/images/journey/probiotech.jpg'. Leave empty to use
    // the icon illustration instead.
    image: '',
  },
  {
    id: 'chambers',
    period: 'Industry & Policy',
    title: 'FNCCI & NICCI Leadership',
    description:
      'Joined the Executive Committee of FNCCI and serves as Treasurer of the Nepal India Chamber of Commerce & Industry, shaping Nepal\u2019s business community from within.',
    category: 'Industry',
    icon: Landmark,
    // Drop a company/milestone photo at public/images/journey/chambers.jpg and
    // point this at it, e.g. '/images/journey/chambers.jpg'. Leave empty to use
    // the icon illustration instead.
    image: '',
  },
  {
    id: 'climate',
    period: 'Climate Initiative',
    title: 'Co-Founded Himalayan Climate Initiative',
    description:
      'Co-founded the Himalayan Climate Initiative to build climate resilience into Nepal\u2019s economy \u2014 pairing business growth with long-term responsibility.',
    category: 'Sustainability',
    icon: Mountain,
    // Drop a company/milestone photo at public/images/journey/climate.jpg and
    // point this at it, e.g. '/images/journey/climate.jpg'. Leave empty to use
    // the icon illustration instead.
    image: '',
  },
  {
    id: 'shark-tank',
    period: 'Present',
    title: 'Investor & Mentor, Shark Tank Nepal',
    description:
      'Serves as a Shark on Shark Tank Nepal, backing and mentoring a new generation of Nepali founders with the same discipline built over two decades.',
    category: 'Investment',
    icon: Tv,
    // Drop a company/milestone photo at public/images/journey/shark-tank.jpg and
    // point this at it, e.g. '/images/journey/shark-tank.jpg'. Leave empty to use
    // the icon illustration instead.
    image: '',
  },
];