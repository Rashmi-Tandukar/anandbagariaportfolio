import { Fragment, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, Award, Building2, Settings2, Users, Calendar } from 'lucide-react';
import { anandProfile } from '../../data/profile';

// Same facts already carried by the profile data — presented as a tight
// editorial list instead of boxed cards.
const bioHighlights = [
  {
    title: 'Entrepreneur at Heart',
    description: 'Founded Nimbus in 2000, growing it into one of Nepal\u2019s most established agribusiness groups.',
    Icon: Building2,
  },
  {
    title: 'Building Essential Businesses',
    description: 'Leading operations across feed milling, agri-processing, edible oil refining, and FMCG distribution.',
    Icon: Settings2,
  },
  {
    title: 'Leader & Investor',
    description: `${anandProfile.roles.length}+ leadership roles, and an investor on Shark Tank Nepal mentoring the next generation.`,
    Icon: Users,
  },
];

const numericStats: { value: string; label: string; Icon: typeof Calendar }[] = [
  { value: '20+', label: 'Years', Icon: Calendar },
  { value: '2000', label: 'Nimbus Founded', Icon: Building2 },
  { value: `${anandProfile.roles.length}+`, label: 'Leadership Roles', Icon: Users },
];

// Areas of expertise, cycled through the three brand accents.
const accentCycle = ['primary', 'lime', 'orange'] as const;
type Accent = (typeof accentCycle)[number];
const expertiseChips: { label: string; accent: Accent }[] = anandProfile.expertise.map(
  (label, i) => ({ label, accent: accentCycle[i % accentCycle.length] }),
);

const chipAccentClass: Record<Accent, string> = {
  primary:
    'border-brand-primary/25 text-[var(--primary-hover)] hover:border-brand-primary/50 hover:bg-brand-primary/[0.08]',
  lime: 'border-brand-secondary/40 text-sage-deep hover:border-brand-secondary/70 hover:bg-brand-secondary/[0.10]',
  orange:
    'border-brand-orange/25 text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/[0.08]',
};

// Keywords pulled out of the real bio copy and highlighted inline, cycling
// through the brand palette (orange used only once, sparingly).
const bioKeywordAccents: Record<string, string> = {
  Nimbus: 'font-semibold text-[var(--primary-hover)]',
  agribusiness: 'font-semibold text-sage-deep',
  'two decades': 'font-semibold text-brand-orange',
  'Shark Tank Nepal': 'font-semibold text-[var(--primary-hover)]',
};
const keywordPattern = new RegExp(`(${Object.keys(bioKeywordAccents).join('|')})`, 'g');

function HighlightedBio({ text }: { text: string }) {
  const parts = text.split(keywordPattern);
  return (
    <>
      {parts.map((part, i) =>
        bioKeywordAccents[part] ? (
          <span key={i} className={bioKeywordAccents[part]}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export default function AboutPreview() {
  const [imageFailed, setImageFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = (delay = 0, dir: 'left' | 'right' | 'up' = 'up') => ({
    initial: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir === 'left' ? -28 : dir === 'right' ? 28 : 0,
      y: prefersReducedMotion ? 0 : dir === 'up' ? 16 : 0,
    },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="about" className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      {/* Background: light dot grid + one soft glow — kept subtle so the
          section never feels heavier than its content. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: 'radial-gradient(rgba(120,200,65,0.14) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 55% 60% at 15% 30%, black 25%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 60% at 15% 30%, black 25%, transparent 100%)',
          }}
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-[10%] h-[280px] w-[280px] rounded-full bg-[rgba(120,200,65,0.13)] blur-[110px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px] px-[5vw]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* -------------------------- Left: image -------------------------- */}
          <motion.div {...fadeIn(0, 'left')} className="order-1 lg:col-span-5">
            <div className="relative mx-auto max-w-[380px] lg:max-w-[460px]">
              {/* Decorative dashed ring, sits behind the frame */}
              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-4 -top-4 h-[104%] w-[104%] rounded-[32px] border border-dashed border-brand-secondary/40"
              />
              {/* Small dot-grid accent, top-left corner */}
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-2xl opacity-60"
                style={{
                  backgroundImage: 'radial-gradient(rgba(120,200,65,0.55) 1.2px, transparent 1.2px)',
                  backgroundSize: '9px 9px',
                }}
              />

              {/* Gradient-bordered photo frame */}
              <div className="relative rounded-[26px] bg-gradient-to-br from-brand-primary/50 via-brand-secondary/30 to-transparent p-[3px] shadow-[0_25px_60px_-20px_rgba(31,51,42,0.4)]">
                <div className="relative overflow-hidden rounded-[24px] bg-canvas">
                  {anandProfile.profileImage && !imageFailed ? (
                    <img
                      src={anandProfile.profileImage}
                      alt={anandProfile.name}
                      onError={() => setImageFailed(true)}
                      className="h-[360px] w-full object-cover object-top sm:h-[440px] lg:h-[500px]"
                    />
                  ) : (
                    <div className="flex h-[360px] w-full items-center justify-center bg-gradient-to-br from-forest/20 to-brand-primary/10 sm:h-[440px] lg:h-[500px]">
                      <span className="select-none text-[4rem] font-bold leading-none text-charcoal/15">AB</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-[rgba(120,200,65,0.16)] via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badge — years of experience */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.35 },
                  y: prefersReducedMotion
                    ? { duration: 0.5, delay: 0.35 }
                    : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                }}
                className="absolute -right-3 top-6 flex items-center gap-2 rounded-full border border-black/5 bg-white/95 py-1.5 pl-2 pr-3 shadow-[0_14px_30px_-14px_rgba(31,51,42,0.4)] backdrop-blur"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-[var(--primary-hover)] text-charcoal">
                  <Calendar className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-[11px] font-bold text-charcoal">20+ Years</span>
              </motion.div>

              {/* Floating badge — Shark Tank */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.45 },
                  y: prefersReducedMotion
                    ? { duration: 0.5, delay: 0.45 }
                    : { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                }}
                className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-full border border-black/5 bg-white/95 py-1.5 pl-2 pr-3 shadow-[0_14px_30px_-14px_rgba(31,51,42,0.4)] backdrop-blur"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-[#ffb35c] text-charcoal">
                  <Award className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-[11px] font-bold text-charcoal">Shark Tank Investor</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ------------------------ Right: content ------------------------ */}
          <div className="order-2 lg:col-span-7">
            <motion.div {...fadeIn(0.05, 'right')} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                <Leaf className="h-3 w-3 text-brand-primary" strokeWidth={2.5} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">About Me</span>
            </motion.div>

            <motion.h2
              {...fadeIn(0.1, 'right')}
              className="mt-3 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.14] tracking-[-0.01em] text-charcoal"
            >
              Built on{' '}
              <span className="bg-gradient-to-r from-[var(--primary-hover)] to-brand-primary bg-clip-text text-transparent">
                Vision
              </span>
              , Focused on{' '}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Impact
              </span>
            </motion.h2>

            <motion.p {...fadeIn(0.15, 'right')} className="mt-4 max-w-xl text-sm leading-relaxed text-graphite sm:text-base">
              <HighlightedBio text={anandProfile.shortBio} />
            </motion.p>

            {/* Compact inline stat row */}
            <motion.div {...fadeIn(0.2, 'right')} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {numericStats.map(({ value, label, Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-brand-primary" strokeWidth={2} aria-hidden="true" />
                  <span className="font-serif text-base font-bold text-charcoal">{value}</span>
                  <span className="text-xs text-graphite">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Expertise chips */}
            <motion.div {...fadeIn(0.25, 'right')} className="mt-5 flex flex-wrap gap-2">
              {expertiseChips.map(({ label, accent }) => (
                <span
                  key={label}
                  className={`rounded-full border bg-white/60 px-3 py-1 text-[11px] font-semibold backdrop-blur transition-all duration-normal hover:-translate-y-0.5 ${chipAccentClass[accent]}`}
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Editorial highlight list — no boxes, just tight rows */}
            <motion.div {...fadeIn(0.3, 'right')} className="mt-6 flex flex-col gap-3 border-t border-subtle pt-5">
              {bioHighlights.map(({ title, description, Icon }) => (
                <div key={title} className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-forest transition-colors duration-normal group-hover:bg-brand-primary/20">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <p className="text-xs leading-relaxed text-graphite sm:text-sm">
                    <span className="font-bold text-charcoal">{title}. </span>
                    {description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}