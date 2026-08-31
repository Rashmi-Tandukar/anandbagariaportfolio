export interface Profile {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  location: string;
  profileImage: string;
  linkedin: string;
  roles: string[];
  expertise: string[];
}

export interface Metric {
  value: string;
  label: string;
  description: string;
  source?: string;
  href?: string;
}

export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  description: string;
  category: string;
  source?: string;
  /** Optional company/milestone photo shown in the card's image panel.
   *  Path relative to /public, e.g. '/images/journey/founding.jpg'.
   *  Falls back to a soft icon illustration when omitted. */
  image?: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  website: string;
  role?: string;
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  description: string;
  status: string;
  website: string;
  period?: string;
}