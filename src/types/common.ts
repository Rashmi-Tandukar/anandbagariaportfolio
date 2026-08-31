export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text';

export type SectionAlignment = 'left' | 'center' | 'right';

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}