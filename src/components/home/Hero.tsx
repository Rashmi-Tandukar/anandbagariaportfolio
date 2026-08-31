import { useState, type MouseEvent } from 'react';
import { ArrowRight, TrendingUp, Leaf, BarChart3, Calendar, Briefcase, Handshake } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { anandProfile } from '../../data/profile';

const expertiseCards = [
  {
    title: 'Entrepreneurship',
    description: 'Building and scaling ventures',
    position: 'left-0 top-2',
    duration: 7,
    Icon: TrendingUp,
    iconClass: 'bg-gradient-to-br from-brand-primary to-[var(--primary-hover)]',
  },
  {
    title: 'Agribusiness',
    description: 'Creating value from the ground up',
    position: 'right-0 top-32',
    duration: 8,
    Icon: Leaf,
    iconClass: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
  },
  {
    title: 'Investment',
    description: 'Backing long-term opportunities',
    position: 'left-2 bottom-2',
    duration: 7.5,
    Icon: BarChart3,
    iconClass: 'bg-gradient-to-br from-brand-orange to-[#ffb35c]',
    live: true,
  },
];

const highlights = [
  { label: '20+ Years', description: 'Building & Leading Businesses', Icon: Calendar },
  { label: 'Multiple Industries', description: 'Agribusiness, Processing & Distribution', Icon: Briefcase },
  { label: 'Long-Term Value', description: 'Investment, Partnerships & Growth', Icon: Handshake },
];

type Accent = 'primary' | 'lime' | 'orange' | null;

const headline: { text: string; accent: Accent }[] = [
  { text: 'Building ', accent: null },
  { text: 'Businesses', accent: 'primary' },
  { text: ' That Create ', accent: null },
  { text: 'Lasting', accent: 'lime' },
  { text: ' Value and ', accent: null },
  { text: 'Impact', accent: 'orange' },
  { text: '.', accent: null },
];

const accentClass: Record<'primary' | 'lime' | 'orange', string> = {
  primary: 'bg-gradient-to-r from-[var(--primary-hover)] to-brand-primary bg-clip-text text-transparent',
  lime: 'bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent',
  orange: 'bg-gradient-to-r from-brand-orange to-[#ffb35c] bg-clip-text text-transparent',
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // Lightweight cursor parallax for the portrait — desktop only in practice,
  // since touch devices never fire mousemove. Fully inert when the visitor
  // prefers reduced motion.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleVisualMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleVisualMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      id="top"
      className="hero relative flex items-center overflow-hidden px-[5vw] pb-10 pt-32 sm:pb-12 sm:pt-36"
    >
      {/* Background decorations — purely decorative, never interactive */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Slow-drifting gradient blobs in the brand palette */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, 40, -10, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.97, 1] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[6%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[rgba(120,200,65,0.22)] blur-[130px]"
        />
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, -30, 15, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.05, 1] }
          }
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -left-32 bottom-[-12%] h-[420px] w-[420px] rounded-full bg-[rgba(180,229,13,0.16)] blur-[120px]"
        />
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, 20, -20, 0], y: [0, -15, 15, 0] }
          }
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute left-[38%] top-[30%] h-[260px] w-[260px] rounded-full bg-[rgba(255,155,47,0.14)] blur-[110px]"
        />

        {/* Fine dot-grid texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(120,200,65,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)',
          }}
        />

        {/* Abstract field-line motif: agriculture meets industry */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.22]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M -50 200 Q 400 140 900 220 T 1600 180"
            fill="none"
            stroke="#78C841"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M -50 560 Q 500 480 1000 560 T 1650 520"
            fill="none"
            stroke="#B4E50D"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>

      <div className="hero-container mx-auto grid w-full max-w-[1300px] items-center gap-x-[clamp(1.25rem,2vw,2.25rem)] gap-y-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left content */}
        <div className="hero-content">
          <motion.span
            {...fadeUp(0)}
            className="mb-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-subtle bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-graphite backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-primary" />
            </span>
            <span className="normal-case tracking-normal font-bold text-brand-primary">
              {anandProfile.name}
            </span>
            <span>&middot; Entrepreneur &middot; Business Leader &middot; Investor</span>
          </motion.span>

          <h1 className="max-w-xl font-serif text-[clamp(2.1rem,3.6vw,3.9rem)] font-bold leading-[1.1] tracking-[-0.02em] text-charcoal">
            {headline.map(({ text, accent }, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${accent ? accentClass[accent] : 'text-charcoal'}`}
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.65)}
            className="mt-5 max-w-[480px] text-sm leading-relaxed text-graphite sm:text-base"
          >
            Two decades building businesses across agribusiness, distribution, and
            investment &mdash; rooted in operational discipline and long-term value.
          </motion.p>

          <motion.div {...fadeUp(0.78)} className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#journey"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(120,200,65,0.35)] bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_rgba(120,200,65,0.55)] transition-all duration-normal hover:-translate-y-0.5 hover:shadow-glow-secondary"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative drop-shadow-[0_1px_1px_rgba(31,51,42,0.25)]">Explore My Journey</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-normal group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-default bg-white/50 px-6 py-3.5 text-sm font-semibold text-charcoal backdrop-blur transition-all duration-normal hover:-translate-y-0.5 hover:border-primary hover:bg-[rgba(120,200,65,0.07)] hover:text-brand-primary"
            >
              Let&rsquo;s Talk
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-normal group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* Compact stat chips — left column only, short label per stat */}
          <motion.div {...fadeUp(0.9)} className="mt-8 flex flex-wrap gap-3">
            {highlights.map(({ label, Icon }) => (
              <div
                key={label}
                className="group inline-flex items-center gap-2 rounded-full border border-subtle bg-white/70 px-4 py-2 text-xs font-bold text-charcoal backdrop-blur transition-colors duration-normal hover:border-primary hover:bg-[rgba(120,200,65,0.07)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-charcoal transition-transform duration-normal group-hover:scale-110">
                  <Icon className="h-3 w-3" strokeWidth={2.25} />
                </span>
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleVisualMouseMove}
          onMouseLeave={handleVisualMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="hero-visual relative mx-auto h-[440px] w-full max-w-md lg:h-[520px] lg:max-w-lg lg:block"
        >
          {/* Rotating dashed ring accent */}
          <motion.div
            aria-hidden="true"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-2 inset-y-[-8px] rounded-[999px] border border-dashed border-[rgba(180,229,13,0.5)]"
          />

          {/* Soft arch-shaped blob behind the portrait */}
          <div className="absolute inset-x-6 inset-y-0 rounded-[999px] bg-gradient-to-b from-[rgba(120,200,65,0.28)] via-[rgba(180,229,13,0.14)] to-transparent" />

          {/* Watermark initials peeking from behind the portrait */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="select-none bg-gradient-to-br from-[rgba(120,200,65,0.16)] to-[rgba(255,155,47,0.12)] bg-clip-text text-[9rem] font-bold leading-none text-transparent">
              AB
            </span>
          </div>

          {/* Portrait */}
          <div className="absolute inset-x-8 bottom-0 top-6 overflow-hidden rounded-[32px] bg-gradient-to-br from-white to-[rgba(120,200,65,0.18)] shadow-[0_30px_80px_-30px_rgba(31,51,42,0.35)] ring-1 ring-[rgba(180,229,13,0.4)]">
            {anandProfile.profileImage && !imageFailed ? (
              <img
                src={anandProfile.profileImage}
                alt={anandProfile.name}
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="select-none text-[6rem] font-bold leading-none text-charcoal/15">
                  AB
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(120,200,65,0.22)] via-transparent to-transparent" />
          </div>

          {expertiseCards.map(({ title, description, position, duration, Icon, iconClass, live }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.9 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 1, y: [0, -6, 0], scale: 1 }
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.9 + i * 0.15 },
                scale: { duration: 0.6, delay: 0.9 + i * 0.15 },
                y: { duration, repeat: Infinity, ease: 'easeInOut', delay: 0.9 + i * 0.15 },
              }}
              className={`expertise-card absolute ${position} flex w-44 items-start gap-2.5 rounded-xl border border-black/5 bg-white/95 p-3 shadow-[0_16px_40px_-16px_rgba(31,51,42,0.35)] backdrop-blur transition-transform duration-normal hover:-translate-y-1`}
              style={{ willChange: 'transform' }}
            >
              <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-charcoal ${iconClass}`}>
                <Icon className="h-4 w-4" strokeWidth={2} />
                {live && (
                  <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red ring-2 ring-white" />
                  </span>
                )}
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-charcoal sm:text-sm">{title}</span>
                <span className="mt-0.5 text-[11px] leading-snug text-graphite">{description}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}