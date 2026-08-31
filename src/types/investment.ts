export type InvestmentCategory =
  | 'technology'
  | 'mobility'
  | 'agribusiness'
  | 'consumer'
  | 'fintech'
  | 'other';

export interface Investment {
  id: string;
  companyName: string;
  description: string;
  category: InvestmentCategory;
  logo: string;
  website: string;
  status: string;
  investmentContext?: string;
  source?: string;
}