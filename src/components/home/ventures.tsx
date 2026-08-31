import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { ventures, type Venture } from '../../data/ventures';

// Accent rotation — cycles through the brand's own palette (gold, forest,
// sage), tuned for readable contrast on the section's light card surface.
const accents = [
  {
    bar: 'bg-gold',
    border: 'border-gold-deep/25',
    text: 'text-gold-deep',
    boxBorder: 'border-gold-deep/35',
    hoverBorder: 'group-hover:border-gold-deep/40',
    hoverText: 'group-hover:text-gold-deep',
  },
  {
    bar: 'bg-forest-light',
    border: 'border-forest-light/30',
    text: 'text-forest-light',
    boxBorder: 'border-forest-light/40',
    hoverBorder: 'group-hover:border-forest-light/40',
    hoverText: 'group-hover:text-forest-light',
  },
  {
    bar: 'bg-sage-deep',
    border: 'border-sage-deep/25',
    text: 'text-sage-deep',
    boxBorder: 'border-sage-deep/35',
    hoverBorder: 'group-hover:border-sage-deep/40',
    hoverText: 'group-hover:text-sage-deep',
  },
] as const;

/**
 * Venture mark — renders the real logo image at `venture.logo` when one has
 * been provided; falls back to the existing lucide icon otherwise, so the
 * section never breaks or shows a blank box while logos are added one by one.
 * Drop image files in /public/images/ventures/ and set `logo` in
 * src/data/ventures.ts to their path, e.g. '/images/ventures/nimbus.png'.
 */
function VentureMark({
  venture,
  accent,
  size = 'md',
}: {
  venture: Venture;
  accent: (typeof accents)[number];
  size?: 'md' | 'lg';
}) {
  const Icon = venture.icon;
  const boxSize = size === 'lg' ? 'h-20 w-20' : 'h-16 w-16';
  const iconSize = size === 'lg' ? 'h-7 w-7' : 'h-6 w-6';

  if (venture.logo) {
    return (
      <span
        className={`flex ${boxSize} shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${accent.boxBorder} bg-white p-2.5 transition-transform duration-300 group-hover:scale-105`}
      >
        <img
          src={venture.logo}
          alt={`${venture.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span
      className={`flex ${boxSize} shrink-0 items-center justify-center rounded-2xl border ${accent.boxBorder} bg-white transition-transform duration-300 group-hover:scale-105`}
    >
      <Icon className={`${iconSize} ${accent.text}`} strokeWidth={1.75} />
    </span>
  );
}

const groupStats = [
  { value: '70+', label: 'Districts served' },
  { value: '35,000+', label: 'Farmer partners' },
  { value: '500+', label: 'Employees across the group' },
];

// The flagship entry leads the section as a featured venture; the rest
// follow in a matching, slightly lighter-weight card grid. Nimbus Holdings
// is authored first in the data source for exactly this reason.
const [featuredVenture, ...secondaryVentures] = ventures;
const featuredAccent = accents[0];

export default function Ventures() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="ventures" className="relative overflow-hidden bg-[#F3F1EA] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[8%] h-[380px] w-[380px] rounded-full bg-forest/[0.08] blur-[130px]" />
        <div className="absolute left-[-6%] bottom-[0%] h-[300px] w-[300px] rounded-full bg-gold/[0.07] blur-[110px]" />
      </div>

      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Ventures & Initiatives"
              title="Building Ideas Into Meaningful Ventures."
              description="Each venture below reflects entrepreneurial thinking carried through to execution — businesses built, led, and grown with a long-term view, not just launched."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-6 sm:gap-8">
              {groupStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-forest-light sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="max-w-[7rem] text-[11px] leading-snug text-graphite">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Featured venture — same bordered-card language as the grid below,
            just larger, to anchor the section as the flagship entry. */}
        <Reveal delay={0.05} className="mt-14">
          <div
            className={`group relative overflow-hidden rounded-3xl border ${featuredAccent.border} bg-white/80 p-8 shadow-[0_16px_40px_-30px_rgba(31,51,42,0.4)] transition-all duration-500 sm:p-10 lg:p-12`}
          >
            <div className={`absolute inset-x-0 top-0 h-[3px] ${featuredAccent.bar}`} />
            <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/[0.08] blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                <VentureMark venture={featuredVenture} accent={featuredAccent} size="lg" />

                <div className="max-w-xl">
                  <span className={`text-xs font-bold uppercase tracking-[0.18em] ${featuredAccent.text}`}>
                    {featuredVenture.category}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
                    {featuredVenture.name}
                  </h3>
                  {featuredVenture.role && (
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-sage-deep">
                      {featuredVenture.role}
                    </span>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-graphite sm:text-base">
                    {featuredVenture.description}
                  </p>
                </div>
              </div>

              <div
                className={`flex shrink-0 items-center gap-2 self-start rounded-full border border-subtle bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sage-deep transition-all duration-300 ${featuredAccent.hoverBorder} ${featuredAccent.hoverText}`}
              >
                Flagship venture
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Remaining ventures — light, bordered cards with a colored top
            accent, boxed logo mark, and a divider before the closing link,
            cycling through the brand's own accent colors. */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryVentures.map((venture, index) => {
            const accent = accents[index % accents.length];
            return (
              <motion.div
                key={venture.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border ${accent.border} bg-white/80 p-8 text-center shadow-[0_16px_40px_-30px_rgba(31,51,42,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(31,51,42,0.3)] sm:p-9`}
              >
                <div className={`absolute inset-x-0 top-0 h-[3px] ${accent.bar}`} />
                <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/[0.06] blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <VentureMark venture={venture} accent={accent} />

                <span className={`relative text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}>
                  {venture.category}
                </span>

                <div className="relative">
                  <h3 className="font-serif text-lg font-bold text-charcoal sm:text-xl">
                    {venture.name}
                  </h3>
                  <span className="mt-1 block text-[11px] font-medium uppercase tracking-wide text-sage-deep">
                    {venture.role || 'Group Venture'}
                  </span>
                </div>

                <p className="relative max-w-[24rem] text-sm leading-relaxed text-graphite">
                  {venture.description}
                </p>

                <div className="relative mt-2 w-10 border-t border-subtle" />

                <div
                  className={`relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sage-deep transition-all duration-300 group-hover:gap-2.5 ${accent.hoverText}`}
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}