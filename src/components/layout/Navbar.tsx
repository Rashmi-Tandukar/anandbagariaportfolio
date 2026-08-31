import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { NavItem } from '../../types/common';

const navItems: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Investments', href: '#investments' },
  { label: 'Contact', href: '#contact' },
];

const observableIds = ['top', 'about', 'journey', 'ventures', 'investments', 'contact'];
const SCROLL_THRESHOLD = 24;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('top');
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const tickingRef = useRef(false);

  useEffect(() => {
    const sections = observableIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        tickingRef.current = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const headerClass = isScrolled
    ? 'fixed inset-x-0 top-0 z-50 transition-all duration-normal border-b border-subtle bg-base-card shadow-elevation-md backdrop-blur-xl'
    : 'fixed inset-x-0 top-0 z-50 transition-all duration-normal border-b border-transparent bg-base/85 backdrop-blur-xl';

  return (
    <motion.header initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={headerClass}>
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-[5vw] py-4">
        <a href="#top" className="whitespace-nowrap text-base font-bold tracking-tight sm:text-lg" aria-label="Anand Bagaria, back to top">
          <span className="text-ink">Anand </span>
          <span className="text-brand-primary">Bagaria</span>
          <span className="text-brand-secondary">.</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = id === activeId;
            const linkClass = isActive
              ? 'group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-fast bg-brand-primary/10 text-brand-primary'
              : 'group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-fast text-ink-muted hover:text-brand-primary';
            const underlineClass = isActive
              ? 'pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-brand-primary transition-transform duration-normal ease-out scale-x-100'
              : 'pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-brand-primary transition-transform duration-normal ease-out scale-x-0 group-hover:scale-x-100';
            return (
              <a key={item.href} href={item.href} aria-current={isActive ? 'page' : undefined} className={linkClass}>
                {item.label}
                <span className={underlineClass} />
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="group hidden items-center gap-1.5 rounded-full border border-[rgba(120,200,65,0.35)] bg-brand-primary px-5 py-2.5 text-sm font-semibold text-charcoal transition-all duration-normal hover:-translate-y-0.5 hover:border-brand-secondary/60 hover:bg-brand-secondary hover:shadow-glow-secondary lg:inline-flex">
          Let's Connect
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" />
        </a>

        <button type="button" className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/5 lg:hidden" onClick={() => setIsMenuOpen((prev) => !prev)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="mobile-nav">
          <AnimatePresence mode="wait" initial={false}>
            {isMenuOpen ? (
              <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="absolute inset-0 flex items-center justify-center">
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="absolute inset-0 flex items-center justify-center">
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav id="mobile-nav" key="mobile-nav" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-full flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto border-b border-subtle bg-base-card p-4 shadow-elevation-lg backdrop-blur-xl lg:hidden" aria-label="Mobile">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = id === activeId;
              const mobileLinkClass = isActive
                ? 'rounded-xl px-3 py-2.5 text-sm font-medium transition-colors bg-brand-primary/10 text-brand-primary'
                : 'rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-ink-muted hover:bg-white/5 hover:text-ink';
              return (
                <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} aria-current={isActive ? 'page' : undefined} className={mobileLinkClass}>
                  {item.label}
                </a>
              );
            })}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="group mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-[rgba(120,200,65,0.35)] bg-brand-primary px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors duration-normal hover:bg-brand-secondary">
              Let's Connect
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}