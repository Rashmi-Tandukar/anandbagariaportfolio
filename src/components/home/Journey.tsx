import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { journeyMilestones } from '../../data/journey';

type Milestone = (typeof journeyMilestones)[number];

/** Alternating accent — even index reads brand green, odd reads brand
 *  orange, so the center line has visual rhythm as it descends. */
function accentOf(index: number) {
  return index % 2 === 0
    ? {
        dot: 'bg-brand-primary',
        line: 'bg-brand-primary/40',
        badgeBg: 'bg-brand-primary',
        badgeText: 'text-white',
        eyebrow: 'text-brand-primary',
      }
    : {
        dot: 'bg-brand-orange',
        line: 'bg-brand-orange/40',
        badgeBg: 'bg-brand-orange',
        badgeText: 'text-white',
        eyebrow: 'text-brand-orange',
      };
}

type Accent = ReturnType<typeof accentOf>;

function YearBadge({ label, accent }: { label: string; accent: Accent }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.span
      initial={{ scale: prefersReducedMotion ? 1 : 0.5, opacity: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_24px_-10px_rgba(31,51,42,0.45)] sm:px-4 sm:text-[11px] ${accent.badgeBg} ${accent.badgeText}`}
    >
      {label}
    </motion.span>
  );
}

/** Self-contained editorial card: image on top, copy underneath. Fixed
 *  width everywhere it's used, so the timeline grid never has to guess
 *  at flexible column sizing. */
function MilestoneCard({
  milestone,
  accent,
  fromSide,
}: {
  milestone: Milestone;
  accent: Accent;
  fromSide: 'left' | 'right';
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 22,
        x: prefersReducedMotion ? 0 : fromSide === 'left' ? -24 : 24,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full overflow-hidden rounded-2xl border border-subtle bg-surface shadow-[0_18px_40px_-22px_rgba(31,51,42,0.35)] transition-shadow duration-normal hover:shadow-[0_22px_48px_-20px_rgba(31,51,42,0.42)]"
    >
      <div
        className={`overflow-hidden ${
          milestone.imageFit === 'contain' ? 'flex h-24 items-center justify-center bg-white p-4 sm:h-28 lg:h-32' : 'h-28 sm:h-32 lg:h-40'
        }`}
      >
        <img
          src={milestone.image}
          alt={milestone.title}
          loading="lazy"
          className={`transition-transform duration-slow ease-out group-hover:scale-[1.06] ${
            milestone.imageFit === 'contain' ? 'h-full max-h-20 w-auto object-contain lg:max-h-24' : 'h-full w-full object-cover object-top'
          }`}
        />
      </div>
      <div className="p-4 sm:p-5 lg:p-6">
        <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${accent.eyebrow}`}>
          {milestone.eyebrow}
        </span>
        <h3 className="mt-1 font-serif text-base font-bold leading-snug text-charcoal sm:text-lg lg:text-xl">
          {milestone.title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-graphite sm:text-sm lg:text-[15px]">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

/** Small fixed-width connector that sits on the spine: tick — dot — badge
 *  — dot — tick. Always the same shape whichever side has the card, which
 *  is what keeps every row's true center pinned to the timeline itself. */
function Connector({ milestone, accent }: { milestone: Milestone; accent: Accent }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className={`h-[2px] w-3 rounded-full lg:w-4 ${accent.line}`} />
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
      <YearBadge label={milestone.period} accent={accent} />
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
      <span className={`h-[2px] w-3 rounded-full lg:w-4 ${accent.line}`} />
    </div>
  );
}

export default function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 78%', 'end 70%'],
  });
  const drawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative overflow-hidden bg-canvas px-[5vw] py-24 sm:py-32">
      {/* Quiet decorative backdrop — soft glows + a scatter of dots, kept
          minimal so the timeline stays the focal point. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-10 h-40 w-40 rounded-full border border-subtle opacity-40" />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 20, -14, 0], y: [0, -12, 10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-[6%] h-[360px] w-[360px] rounded-full bg-brand-orange/[0.07] blur-[140px]"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, -14, 10, 0], y: [0, 10, -8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -left-20 bottom-[4%] h-[320px] w-[320px] rounded-full bg-brand-primary/[0.08] blur-[130px]"
        />
        <div className="absolute right-6 top-6 grid grid-cols-5 gap-1.5 opacity-30 sm:right-10 sm:top-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-brand-primary" />
          ))}
        </div>
        {/* Wide-screen fillers — quiet dot columns in the outer margins so
            the timeline's negative space reads as intentional. */}
        <div className="hidden 2xl:absolute 2xl:left-10 2xl:top-1/3 2xl:grid 2xl:grid-cols-2 2xl:gap-2 2xl:opacity-25">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-brand-orange" />
          ))}
        </div>
        <div className="hidden 2xl:absolute 2xl:bottom-1/4 2xl:right-10 2xl:grid 2xl:grid-cols-2 2xl:gap-2 2xl:opacity-25">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-brand-primary" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1200px]">
        {/* ---------------------------- Header ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2.5">
            <span className="h-px w-6 bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary">
              My Journey
            </span>
            <span className="h-px w-6 bg-brand-primary" />
          </span>

          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] text-charcoal">
            From Vision to Impact
          </h2>
          <p className="text-sm leading-relaxed text-graphite sm:text-base">
            A journey of building businesses, creating partnerships and investing in
            opportunities that create long-term value.
          </p>
        </motion.div>

        {/* ------------------------ Desktop timeline ------------------------ */}
        <div ref={timelineRef} className="relative mt-20 hidden sm:mt-24 sm:block">
          {/* Track */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-charcoal/10"
          />
          {/* Progressive draw-on-scroll overlay */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : drawScale, transformOrigin: 'top' }}
            className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-primary via-brand-orange to-brand-primary"
          />

          <div className="flex flex-col gap-6 lg:gap-8">
            {journeyMilestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const accent = accentOf(index);

              return (
                <div
                  key={milestone.id}
                  className="mx-auto grid grid-cols-[240px_auto_240px] items-center gap-3 sm:grid-cols-[280px_auto_280px] sm:gap-5 lg:grid-cols-[340px_auto_340px] lg:gap-8 xl:grid-cols-[380px_auto_380px] xl:gap-10"
                >
                  <div className="justify-self-end">
                    {isLeft && <MilestoneCard milestone={milestone} accent={accent} fromSide="left" />}
                  </div>

                  <Connector milestone={milestone} accent={accent} />

                  <div className="justify-self-start">
                    {!isLeft && <MilestoneCard milestone={milestone} accent={accent} fromSide="right" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------- Mobile timeline ------------------------- */}
        <div className="relative mt-14 sm:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-[2px] rounded-full bg-charcoal/10"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : drawScale, transformOrigin: 'top' }}
            className="absolute bottom-0 left-4 top-0 w-[2px] rounded-full bg-gradient-to-b from-brand-primary via-brand-orange to-brand-primary"
          />

          <div className="flex flex-col gap-8">
            {journeyMilestones.map((milestone, index) => {
              const accent = accentOf(index);
              return (
                <div key={milestone.id} className="relative pl-11">
                  <span
                    className={`absolute left-4 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-canvas ${accent.dot}`}
                  />
                  <div className="mb-3">
                    <YearBadge label={milestone.period} accent={accent} />
                  </div>
                  <div className="max-w-xs">
                    <MilestoneCard milestone={milestone} accent={accent} fromSide="left" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}