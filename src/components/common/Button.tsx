import type { ReactNode } from 'react';
import type { ButtonVariant } from '../../types/common';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
  secondary:
    'bg-transparent text-neutral-900 border border-neutral-300 hover:border-neutral-900',
  ghost: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
  text: 'bg-transparent text-neutral-900 px-0 underline-offset-4 hover:underline',
};

export default function Button({
  children,
  variant = 'primary',
  href,
  external,
  onClick,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200';
  const styles = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={styles}>
      {children}
    </button>
  );
}