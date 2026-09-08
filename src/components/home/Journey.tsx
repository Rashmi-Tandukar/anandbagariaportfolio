import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Flag, Sprout, TrendingUp, Users, LineChart, Compass } from 'lucide-react';
import { journeyMilestones } from '../../data/journey';

type Milestone = (typeof journeyMilestones)[number];

/** Accent + icon tied to the milestone's actual category — not an arbitrary
 *  index-based cycle — so the color and glyph both mean something (e.g.
 *  "Leadership" always reads gold, "Agribusiness" always reads primary). */
const categoryStyle: Record<
  Milestone['category'],
  { text: string; dot: string; badge: string; Icon: typeof Flag }
> = {
  Entrepreneurship: {
    text: 'text-brand-primary',
    dot: 'bg-brand-primary',
    badge: 'border-brand-primary/25 bg-brand-primary/10 text-[var(--primary-hover)]',
    Icon: Flag,
  },
  Agribusiness: {
    text: 'text-sage-deep',
    dot: 'bg-brand-secondary',
    badge: 'border-brand-secondary/30 bg-brand-secondary/10 text-sage-deep',
    Icon: Sprout,
  },
  Growth: {
    text: 'text-brand-orange',
    dot: 'bg-brand-orange',
    badge: 'border-brand-orange/25 bg-brand-orange/10 text-brand-orange',
    Icon: TrendingUp,
  },
  Leadership: {
    text: 'text-gold',
    dot: 'bg-gold',
    badge: 'border-gold/30 bg-gold/10 text-gold-deep',
    Icon: Users,
  },
  Investment: {
    text: 'text-navy',
    dot: 'bg-navy',
    badge: 'border-navy/25 bg-navy/10 text-navy',
    Icon: LineChart,
  },
};

/** Square thumbnail, consistent frame regardless of the source image's own
 *  aspect ratio — logos sit contained on white, photographs cover and crop
 *  to the top. Fixes the earlier bug where a wide logo got cropped and a
 *  tall portrait shrank to a sliver inside a short, wide box. */
function Thumbnail({ milestone }: { milestone: Milestone }) {
  const isContain = milestone.imageFit === 'contain';
  return (
    <div
      className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-subtle shadow-elevation-sm sm:h-20 sm:w-20 lg:h-24 lg:w-24 ${
        isContain ? 'flex items-center justify-center bg-white p-2.5' : 'bg-surface-secondary'
      }`}
    >
      <img
        src={milestone.image}
        alt={milestone.title}
        loading="lazy"
        className={isContain ? 'h-full w-full object-contain' : 'h-full w-full object-cover object-top'}
      />
    </div>
  );
}

function Row({ milestone, isLast }: { milestone: Milestone; isLast: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const style = categoryStyle[milestone.category];
  const caption = milestone.eyebrow !== milestone.period ? milestone.eyebrow : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`group grid grid-cols-[100px_22px_1fr] gap-x-0 rounded-xl transition-colors duration-normal hover:bg-white/60 sm:grid-cols-[128px_28px_1fr] lg:grid-cols-[152px_32px_1fr] ${
        isLast ? '' : 'border-b border-default'
      }`}
    >
      {/* Meta — right-aligned so the spine below always sits at a fixed x,
          whatever the label's length ("2000" vs "Early Growth"). */}
      <div className="py-6 pr-2 text-right sm:py-8 sm:pr-4 lg:py-10">
        <div className={`font-serif text-sm font-bold leading-tight sm:text-2xl lg:text-[1.75rem] ${style.text}`}>
          {milestone.period}
        </div>
        {caption && (
          <div className="mt-1 text-[10px] italic leading-snug text-graphite sm:text-xs">{caption}</div>
        )}
      </div>

      {/* Spine — a single dot per row; the continuous line is drawn once
          by the parent, not re-created per row. */}
      <div className="relative flex justify-center py-6 sm:py-8 lg:py-10">
        <span
          className={`relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-[5px] ring-canvas transition-transform duration-normal group-hover:scale-125 sm:h-3 sm:w-3 ${style.dot}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 py-6 pr-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:py-8 lg:py-10">
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${style.badge}`}
          >
            <style.Icon className="h-3 w-3" strokeWidth={2.5} />
            {milestone.category}
          </span>
          <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-charcoal sm:text-xl lg:text-2xl">
            {milestone.title}
          </h3>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-graphite sm:text-sm lg:text-[15px]">
            {milestone.description}
          </p>
        </div>
        <Thumbnail milestone={milestone} />
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 78%', 'end 75%'],
  });
  const drawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative overflow-hidden bg-canvas px-[5vw] py-16 sm:py-24">
      {/* One quiet glow — restrained on purpose, this section leans on
          typography and structure rather than background decoration. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 16, -10, 0], y: [0, -10, 8, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-[8%] h-[380px] w-[380px] rounded-full bg-brand-primary/[0.06] blur-[150px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1100px]">
        {/* ---------------------------- Header ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full bg-brand-primary/10 px-3 py-1">
            <Compass className="h-3 w-3 text-brand-primary" strokeWidth={2.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">Journey</span>
          </span>
          <p className="font-serif text-sm italic text-graphite">2000 &mdash; Present</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] text-charcoal">
            From Vision to Impact
          </h2>
          <p className="text-sm leading-relaxed text-graphite sm:text-base">
            A journey of building businesses, creating partnerships and investing in
            opportunities that create long-term value.
          </p>

          {/* Overview stat strip — mirrors the About section's stat pattern
              so the two sections feel like one consistent design system. */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold text-charcoal">{journeyMilestones.length}</span>
              <span className="text-xs text-graphite">Defining Chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold text-charcoal">2000</span>
              <span className="text-xs text-graphite">Where It Began</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold text-charcoal">20+</span>
              <span className="text-xs text-graphite">Years of Growth</span>
            </div>
          </div>
        </motion.div>

        {/* ---------------------------- Timeline ---------------------------- */}
        <div ref={timelineRef} className="relative mt-16 sm:mt-20">
          {/* Base track, aligned to the spine column's center */}
          <div
            aria-hidden="true"
            className="absolute left-[111px] top-0 h-full w-px bg-charcoal/10 sm:left-[142px] lg:left-[168px]"
          />
          {/* Progressive draw-on-scroll overlay, one solid brand color
              rather than a multi-stop gradient */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : drawScale, transformOrigin: 'top' }}
            className="absolute left-[111px] top-0 h-full w-px bg-brand-primary sm:left-[142px] lg:left-[168px]"
          />

          {journeyMilestones.map((milestone, index) => (
            <Row
              key={milestone.id}
              milestone={milestone}
              isLast={index === journeyMilestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}