export interface Profile {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  location: string;
  profileImage: string;
  linkedin: string;
  /** Optional — set to a full profile URL to show the icon in Contact's social row. Leave '' to hide it. */
  instagram?: string;
  /** Optional — set to a full page URL to show the icon in Contact's social row. Leave '' to hide it. */
  facebook?: string;
  /** Optional — used as the inquiry form's send-to address. Leave '' to fall back to LinkedIn-only contact. */
  email?: string;
  /** Optional — shown in Contact's left column with a tel: link. Leave '' to hide it. */
  phone?: string;
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
  /** How `image` should fit its frame. 'cover' (default) crops photos to
   *  fill the frame; use 'contain' for logos/graphics that shouldn't crop. */
  imageFit?: 'cover' | 'contain';
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