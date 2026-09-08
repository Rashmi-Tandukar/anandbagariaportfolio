import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useReducedMotion, motion } from 'framer-motion';
import Container from '../common/Container';
import { anandProfile } from '../../data/profile';
import type { NavItem } from '../../types/common';

const exploreLinks: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Investments', href: '#investments' },
  { label: 'Awards', href: '#awards' },
  { label: 'Media', href: '#media' },
];

const socialLinks = [
  { key: 'linkedin', href: anandProfile.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { key: 'instagram', href: anandProfile.instagram, label: 'Instagram', Icon: Instagram },
  { key: 'facebook', href: anandProfile.facebook, label: 'Facebook', Icon: Facebook },
].filter((link) => !!link.href);

export default function Footer() {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-subtle bg-base pt-16 text-ink-secondary">
      {/* Brand gradient hairline + soft glow, echoing the Contact section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/60 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-brand-primary/[0.08] blur-[120px]" />

      <Container className="relative">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* -------------------------- Brand + blurb -------------------------- */}
          <div className="flex flex-col gap-4">
            <a href="#top" className="inline-flex w-fit whitespace-nowrap text-lg font-bold tracking-tight" aria-label="Anand Bagaria, back to top">
              <span className="text-ink">Anand </span>
              <span className="text-brand-primary">Bagaria</span>
              <span className="text-brand-secondary">.</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">{anandProfile.tagline}</p>

            {socialLinks.length > 0 && (
              <div className="mt-1 flex items-center gap-3">
                {socialLinks.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-subtle text-ink-muted transition-all duration-normal hover:-translate-y-0.5 hover:border-primary hover:text-brand-primary"
                  >
                    <Icon className="h-[17px] w-[17px]" strokeWidth={1.9} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ------------------------------ Explore ----------------------------- */}
          <nav aria-label="Footer">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Explore</span>
            <ul className="mt-4 flex flex-col gap-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-secondary transition-colors duration-fast hover:text-brand-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ----------------------------- Get in touch --------------------------- */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Get in touch</span>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-2.5 text-sm text-ink-secondary">
                <MapPin className="h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2} />
                {anandProfile.location}
              </li>
              {anandProfile.email && (
                <li>
                  <a
                    href={`mailto:${anandProfile.email}`}
                    className="flex items-center gap-2.5 text-sm text-ink-secondary transition-colors duration-fast hover:text-brand-primary"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2} />
                    <span className="break-all">{anandProfile.email}</span>
                  </a>
                </li>
              )}
              {anandProfile.phone && (
                <li>
                  <a
                    href={`tel:${anandProfile.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-2.5 text-sm text-ink-secondary transition-colors duration-fast hover:text-brand-primary"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2} />
                    {anandProfile.phone}
                  </a>
                </li>
              )}
            </ul>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[rgba(120,200,65,0.35)] bg-brand-primary px-5 py-2.5 text-sm font-semibold text-charcoal transition-all duration-normal hover:-translate-y-0.5 hover:bg-brand-secondary"
            >
              Let's Connect
            </a>
          </div>
        </div>

        {/* ------------------------------ Bottom bar ----------------------------- */}
        <div className="flex flex-col items-center gap-4 border-t border-subtle py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-ink-muted">
            &copy; {year} {anandProfile.name}. All rights reserved.
          </p>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            aria-label="Back to top"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted transition-colors duration-fast hover:text-brand-primary"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-subtle transition-colors duration-fast group-hover:border-primary">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </motion.button>
        </div>
      </Container>
    </footer>
  );
}