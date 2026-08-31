import { Sprout, ShoppingBag, Cpu, Mountain, type LucideIcon } from 'lucide-react';

export interface InvestmentFocusArea {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const investmentFocusAreas: InvestmentFocusArea[] = [
  {
    id: 'agribusiness',
    title: 'Agribusiness & Food Systems',
    description:
      'Ventures that strengthen Nepal\u2019s agricultural supply chain \u2014 from the farm gate to the shelf.',
    icon: Sprout,
  },
  {
    id: 'consumer',
    title: 'Consumer & FMCG',
    description:
      'Brands solving everyday problems for Nepali households, with a path to real scale.',
    icon: ShoppingBag,
  },
  {
    id: 'technology',
    title: 'Emerging Technology',
    description:
      'Founders applying new technology to old, unglamorous problems in traditional industries.',
    icon: Cpu,
  },
  {
    id: 'climate',
    title: 'Climate & Sustainability',
    description:
      'Businesses that build long-term resilience into Nepal\u2019s economy, not just short-term growth.',
    icon: Mountain,
  },
];

export const showStats: { value: string; label: string }[] = [
  { value: 'S1 \u00b7 2025', label: 'Shark Tank Nepal' },
  { value: '100', label: 'Entrepreneurs pitched' },
  { value: '20', label: 'Episodes, 5 Sharks' },
];