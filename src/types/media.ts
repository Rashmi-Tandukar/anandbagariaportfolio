export type MediaCategory =
  | 'interview'
  | 'podcast'
  | 'article'
  | 'speaking'
  | 'sharkTank'
  | 'linkedin'
  | 'other';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: MediaCategory;
  date: string;
  thumbnail: string;
  url: string;
  source: string;
}