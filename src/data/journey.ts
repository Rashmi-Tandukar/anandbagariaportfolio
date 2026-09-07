import type { JourneyItem } from '../types/profile';

export interface JourneyMilestone extends JourneyItem {
  /** Small uppercase label shown above the title (e.g. "THE BEGINNING"). */
  eyebrow: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'founding',
    period: '2000',
    eyebrow: 'The Beginning',
    title: 'Founded Nimbus',
    description:
      'Anand Bagaria founded Nimbus with a vision to build a sustainable business creating value for farmers, consumers and the community.',
    category: 'Entrepreneurship',
    image: '/images/journey/founding.png',
    imageFit: 'contain',
  },
  {
    id: 'supply-chain',
    period: 'Early Growth',
    eyebrow: 'Early Growth',
    title: 'Supply Chain & Distribution',
    description:
      'Built a strong supply-chain and distribution network, creating the foundation for sustainable growth.',
    category: 'Agribusiness',
    image: '/images/ventures/nimbus.png',
    imageFit: 'contain',
  },
  {
    id: 'diversification',
    period: 'Expansion',
    eyebrow: 'Expansion',
    title: 'Oil & FMCG',
    description:
      'Expanded into oil, food processing and FMCG, building brands serving households across Nepal.',
    category: 'Growth',
    image: '/images/ventures/brands/sunaulokiran.jpg',
  },
  {
    id: 'probiotech',
    period: 'Leadership',
    eyebrow: 'Leadership',
    title: 'Probiotech & Beyond',
    description:
      'Expanded into animal nutrition, research and biotechnology, strengthening the diversified business group.',
    category: 'Leadership',
    image: '/images/profile/profile2.png',
  },
  {
    id: 'present',
    period: 'Present',
    eyebrow: 'Industry & Beyond',
    title: 'FNCCI, NICCI & Shark Tank Nepal',
    description:
      'Contributing to industry leadership, supporting entrepreneurs and investing in the next generation.',
    category: 'Investment',
    image: '/images/profile/profile3.jpg',
  },
];