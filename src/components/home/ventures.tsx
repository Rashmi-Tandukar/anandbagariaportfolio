import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView, animate } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { anandProfile } from '../../data/profile';
import { nimbus, otherVentures } from '../../data/ventures';

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
      layout
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: 0.03 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      className="flex w-[104px] shrink-0 flex-col items-center gap-2 sm:w-[112px]"
    >
      <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl bg-white p-4 shadow-[0_12px_28px_-16px_rgba(31,51,42,0.35)] transition-shadow duration-normal hover:shadow-[0_16px_34px_-14px_rgba(31,51,42,0.45)] sm:h-[100px] sm:w-[100px]">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className={`text-center font-serif text-sm font-bold leading-tight ${accent.text}`}>
            {brand.name}
          </span>
        )}
      </div>
      <span className="text-center text-[11px] leading-tight text-taupe">{brand.category}</span>
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

/**
 * A single entry in the "Beyond Nimbus" register — styled like a line item
 * in a company registry rather than a SaaS card: a founding year (or a dash
 * when undated), the entity name and sector, and a description that expands
 * in place on click instead of opening a separate modal. Ledger rows, not
 * cards, because these are literally separate registered businesses — the
 * list-of-entities framing is the honest one for this content.
 */
function VentureRow({
  venture,
  index,
}: {
  venture: (typeof otherVentures)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-subtle"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-5 py-7 text-left sm:gap-8"
      >
        <span className="w-14 shrink-0 pt-1 font-serif text-lg font-bold tabular-nums text-gold-deep/80 sm:w-20 sm:text-xl">
          {venture.foundedYear ?? '\u2014'}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="font-serif text-xl font-bold leading-tight text-charcoal sm:text-2xl">
              {venture.name}
            </h4>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-deep">
              {venture.category}
            </span>
          </div>
          {venture.role && (
            <span className="mt-1 block text-xs font-medium text-taupe">{venture.role}</span>
          )}
          <p
            className={`mt-2 max-w-2xl text-sm leading-relaxed text-graphite sm:text-[15px] ${
              open ? '' : 'line-clamp-1 sm:line-clamp-1'
            }`}
          >
            {venture.description}
          </p>
        </div>

        <ChevronDown
          className={`mt-2 h-5 w-5 shrink-0 text-taupe transition-transform duration-300 ${
            open ? 'rotate-180 text-sage-deep' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-14 max-w-2xl space-y-4 pb-7 sm:ml-20">
              {venture.highlights && venture.highlights.length > 0 && (
                <ul className="space-y-2">
                  {venture.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-graphite">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sage-deep" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {venture.website && (
                <a
                  href={venture.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep"
                >
                  Visit website
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Ventures() {
  const prefersReducedMotion = useReducedMotion();
  const nimbusHref = nimbus.website || '#contact';
  const nimbusExternal = Boolean(nimbus.website);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDivision, setActiveDivision] = useState<string | null>(null);
  const visibleBrands = activeDivision
    ? nimbus.brands.filter((b) => b.divisionId === activeDivision)
    : nimbus.brands;

  const ventureCategories = ['All', ...Array.from(new Set(otherVentures.map((v) => v.category)))];
  const filteredVentures =
    activeCategory === 'All'
      ? otherVentures
      : otherVentures.filter((v) => v.category === activeCategory);
  const sectorList = Array.from(new Set(otherVentures.map((v) => v.category)));

  return (
    <section id="ventures" className="relative overflow-hidden bg-[#F3F1EA] px-[5vw] py-16 sm:py-24">
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
            description="From a single trading enterprise in 2000 to a diversified group spanning agribusiness, food, manufacturing, energy and distribution — every venture built with the same operator's discipline."
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
                  {nimbus.categories.join(' \u00b7 ')}
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

            {/* ---------------------- Divisions \u2192 Brands, one compact block ----------------------
                The division names double as filter tabs for the brand row directly beneath them,
                so the whole "who's inside Nimbus" story lives in one glance instead of three
                separately-headed, separately-spaced sections. */}
            <div className="border-t border-subtle px-8 py-8 sm:px-12 lg:px-16">
              <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center">
                {nimbus.divisions.map((division) => {
                  const isActive = activeDivision === division.id;
                  return (
                    <button
                      key={division.id}
                      onClick={() => setActiveDivision(isActive ? null : division.id)}
                      className={`rounded-full px-4 py-1.5 font-serif text-base font-bold transition-colors duration-200 sm:text-lg ${
                        isActive ? 'bg-sage-deep/10 text-sage-deep' : 'text-charcoal hover:text-sage-deep'
                      }`}
                    >
                      {division.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-4 border-t border-subtle pt-7 sm:gap-5">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleBrands.map((brand, index) => (
                    <BrandCard
                      key={brand.id}
                      brand={brand}
                      accent={badgeAccents[index % badgeAccents.length]}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------- Other ventures & investments — a register, not a card grid -------------------------
            These are genuinely separate registered businesses, so the section reads like a company
            register: a dated line for each entity rather than uniform tiles. Rows expand in place —
            no modal — keeping the reader on the page and inside the same document. */}
        <div className="mt-24 border-t border-subtle pt-16 sm:mt-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-deep">
              Beyond Nimbus
            </span>
            <h3 className="font-serif text-2xl leading-tight text-charcoal sm:text-3xl">
              Other Ventures &amp; Investments
            </h3>
            <p className="max-w-xl text-base leading-relaxed text-graphite">
              {otherVentures.length} standalone businesses, built and led separately from the Nimbus
              group, across {sectorList.slice(0, -1).join(', ')} and {sectorList[sectorList.length - 1]}.
            </p>
          </Reveal>

          {/* Category filter — text tabs on a rule, reading like a register's section index
              rather than another row of pill buttons. */}
          <Reveal
            delay={0.05}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 border-b border-subtle"
          >
            {ventureCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-sage-deep text-charcoal'
                      : 'border-transparent text-taupe hover:text-graphite'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </Reveal>

          <motion.div layout className="mt-2">
            <AnimatePresence initial={false}>
              {filteredVentures.map((venture, index) => (
                <VentureRow key={venture.id} venture={venture} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}