import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView, animate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { anandProfile } from '../../data/profile';
import { nimbus, otherVentures } from '../../data/ventures';

// Accent rotation for the "Other Ventures" grid — cycles the brand's own
// palette so each card reads distinctly without needing an icon or logo.
const accents = ['bg-gold', 'bg-forest-light', 'bg-sage-deep'] as const;

/** Animates a numeric prefix inside a stat string (e.g. "35" in "35K+"). */
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(numeric !== null && !prefersReducedMotion ? '0' : value);

  useEffect(() => {
    if (numeric === null || prefersReducedMotion || !inView) return;
    const controls = animate(0, numeric, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{numeric !== null ? `${display}${suffix}` : value}</span>;
}

// Accent rotation for the floating brand badges — cycles the brand's own
// palette so each placeholder monogram still reads as distinct and premium.
const badgeAccents = [
  { border: 'border-gold-deep/30', text: 'text-gold-deep', glow: 'bg-gold/25' },
  { border: 'border-forest-light/35', text: 'text-forest-light', glow: 'bg-forest-light/20' },
  { border: 'border-sage-deep/30', text: 'text-sage-deep', glow: 'bg-sage-deep/20' },
] as const;

/**
 * Brand tile — a plain white rounded-square card holding a single brand's
 * logo, grouped underneath its division heading (Food / Animal Nutrition /
 * etc.). Falls back to a styled initials mark so the grid never looks
 * broken while real logo files are still being added.
 */
function BrandCard({
  brand,
  accent,
  index,
}: {
  brand: (typeof nimbus.brands)[number];
  accent: (typeof badgeAccents)[number];
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className="flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded-[28px] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(31,51,42,0.35)] transition-shadow duration-normal hover:shadow-[0_24px_50px_-20px_rgba(31,51,42,0.45)] sm:h-[170px] sm:w-[170px]"
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className={`text-center font-serif text-lg font-bold leading-tight sm:text-xl ${accent.text}`}>
          {brand.name}
        </span>
      )}
    </motion.div>
  );
}

/** Thin vertical connector with an optional label — draws the
 *  Anand Bagaria → Nimbus → Divisions → Brands hierarchy without arrows. */
function Connector({ label }: { label?: string }) {
  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-taupe">
          {label}
        </span>
      )}
      <span className="h-8 w-px bg-gradient-to-b from-taupe/40 to-transparent sm:h-10" />
    </div>
  );
}

export default function Ventures() {
  const prefersReducedMotion = useReducedMotion();
  const nimbusHref = nimbus.website || '#contact';
  const nimbusExternal = Boolean(nimbus.website);

  return (
    <section id="ventures" className="relative overflow-hidden bg-[#F3F1EA] px-[5vw] py-24 sm:py-32">
      {/* Very subtle drifting background glow — same treatment as the rest of the page */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 22, -12, 0], y: [0, -14, 10, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-10%] top-[8%] h-[380px] w-[380px] rounded-full bg-forest/[0.08] blur-[130px]"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, -16, 12, 0], y: [0, 12, -10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute left-[-6%] bottom-[0%] h-[300px] w-[300px] rounded-full bg-gold/[0.07] blur-[110px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px]">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <SectionHeading
            eyebrow="Business Portfolio"
            title="Building Businesses Across Industries"
            description="From agribusiness and food to manufacturing and distribution, building businesses that create long-term value."
            align="center"
          />
        </Reveal>

        {/* ---------------------------------------------------------------
            Hierarchy: Anand Bagaria → Nimbus. A single label + connector,
            not a repeated icon system, keeps this readable as one lineage.
           --------------------------------------------------------------- */}
        <div className="mt-12">
          <Connector label={anandProfile.name} />
        </div>

        {/* ------------------------- Nimbus — featured venture ------------------------- */}
        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-[32px] border border-forest-light/25 bg-white/80 shadow-[0_30px_70px_-36px_rgba(31,51,42,0.35)]">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-16">
              {/* Text column */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start gap-5 text-left"
              >
                <span className="inline-flex items-center rounded-full border border-forest-light/30 bg-forest-light/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-forest-light">
                  Flagship Venture
                </span>

                <div>
                  <h3 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-charcoal">
                    {nimbus.name}
                  </h3>
                  <p className="mt-2 font-serif text-lg italic text-sage-deep sm:text-xl">
                    {nimbus.tagline}
                  </p>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-graphite sm:text-sm">
                  {nimbus.categories.join(' · ')}
                </p>

                <span className="text-sm font-semibold text-charcoal">{nimbus.role}</span>

                {/* Stats */}
                <div className="grid w-full grid-cols-3 gap-4 border-t border-subtle pt-6">
                  {nimbus.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-1"
                    >
                      <span className="font-serif text-xl font-bold text-forest-light sm:text-2xl">
                        <StatValue value={stat.value} />
                      </span>
                      <span className="text-[11px] leading-snug text-graphite">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <a
                  href={nimbusHref}
                  target={nimbusExternal ? '_blank' : undefined}
                  rel={nimbusExternal ? 'noopener noreferrer' : undefined}
                  className="group mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(120,200,65,0.5)] transition-all duration-normal hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(120,200,65,0.6)]"
                >
                  Explore Nimbus
                  <ArrowRight className="h-4 w-4 transition-transform duration-normal group-hover:translate-x-0.5" />
                </a>
              </motion.div>

              {/* Image column — real Nimbus logo, large and framed */}
              <motion.div
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative mx-auto w-full max-w-md"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-br from-forest-light/15 via-transparent to-gold/10 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-[28px] border border-subtle bg-white p-10 shadow-[0_24px_60px_-30px_rgba(31,51,42,0.35)] sm:p-14">
                  <img
                    src={nimbus.logo}
                    alt="Nimbus — Cultivating Partnerships"
                    className="h-auto w-full max-h-40 object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>

            {/* ---------------------- Divisions ---------------------- */}
            <div className="border-t border-subtle px-8 py-8 sm:px-12 lg:px-16">
              <div className="mx-auto grid max-w-2xl grid-cols-3 divide-x divide-subtle text-center">
                {nimbus.divisions.map((division, index) => (
                  <motion.div
                    key={division.id}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="px-2"
                  >
                    <span className="font-serif text-base font-bold text-charcoal sm:text-lg">
                      {division.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------- Brands ecosystem ------------------------- */}
        <div className="mt-16 sm:mt-20">
          {nimbus.divisions.map((division, groupIndex) => {
            const brandsInDivision = nimbus.brands.filter((b) => b.divisionId === division.id);
            if (brandsInDivision.length === 0) return null;

            return (
              <div
                key={division.id}
                className={groupIndex === 0 ? '' : 'mt-14 border-t border-subtle pt-14 sm:mt-16 sm:pt-16'}
              >
                <Reveal className="flex justify-center">
                  <h3 className="text-lg font-medium text-graphite sm:text-xl">{division.name}</h3>
                </Reveal>

                <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-6">
                  {brandsInDivision.map((brand, index) => (
                    <BrandCard
                      key={brand.id}
                      brand={brand}
                      accent={badgeAccents[index % badgeAccents.length]}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------- Other ventures & investments ------------------------- */}
        <div className="mt-24 border-t border-subtle pt-16 sm:mt-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-deep">
              Beyond Nimbus
            </span>
            <h3 className="font-serif text-2xl leading-tight text-charcoal sm:text-3xl">
              Other Ventures &amp; Investments
            </h3>
            <p className="text-base leading-relaxed text-graphite">
              Genuine standalone businesses built and led separately from the Nimbus ecosystem.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherVentures.map((venture, index) => {
              const accent = accents[index % accents.length];
              return (
                <motion.div
                  key={venture.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-subtle bg-white/70 p-7 text-left shadow-[0_16px_40px_-30px_rgba(31,51,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(31,51,42,0.28)]"
                >
                  <div className={`absolute inset-x-0 top-0 h-[3px] ${accent}`} />

                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-sage-deep">
                    {venture.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold leading-tight text-charcoal sm:text-xl">
                    {venture.name}
                  </h4>
                  {venture.role && (
                    <span className="text-[11px] font-medium uppercase tracking-wide text-taupe">
                      {venture.role}
                    </span>
                  )}
                  <p className="text-sm leading-relaxed text-graphite">{venture.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}