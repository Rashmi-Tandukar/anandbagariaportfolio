export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  description: string;
  /** Optional — link to the announcement, issuing body, or coverage of the award. */
  href?: string;
}