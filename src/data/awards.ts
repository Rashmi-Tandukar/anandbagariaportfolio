import type { Award } from '../types/awards';

// PLACEHOLDER DATA — swap in the real citations, issuing bodies and years
// before launch. Structure and categories are ready to go; only the specific
// award names/years below need verifying against Anand's actual record.
export const awards: Award[] = [
  {
    id: 'entrepreneur-of-the-year',
    title: 'Entrepreneur of the Year',
    issuer: 'FNCCI (Federation of Nepalese Chambers of Commerce and Industry)',
    year: '2023',
    category: 'Entrepreneurship',
    description:
      'Recognized for two decades of building Nimbus into one of Nepal\u2019s leading diversified agribusiness groups.',
  },
  {
    id: 'agribusiness-leadership',
    title: 'Agribusiness Leadership Award',
    issuer: 'Nepal India Chamber of Commerce & Industry (NICCI)',
    year: '2022',
    category: 'Industry',
    description:
      'Honored for contributions to strengthening supply chains connecting Nepali farmers with national distribution networks.',
  },
  {
    id: 'cnbc-awaaz',
    title: 'CNBC Awaaz CEO Award — Nepal',
    issuer: 'CNBC Awaaz',
    year: '2021',
    category: 'Business Leadership',
    description:
      'Featured among Nepal\u2019s top business leaders for sustained growth across feed milling, agri-processing and FMCG distribution.',
  },
  {
    id: 'climate-initiative',
    title: 'Climate Action Recognition',
    issuer: 'Himalayan Climate Initiative',
    year: '2020',
    category: 'Sustainability',
    description:
      'Acknowledged as co-founder for advancing climate-resilient practices across Nepal\u2019s agriculture and industry sectors.',
  },
];