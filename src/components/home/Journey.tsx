import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { journeyMilestones } from '../../data/journey';

type Milestone = (typeof journeyMilestones)[number];

/** Three-color cycle that marks each entry's era. Tied to content (each
 *  color is a distinct chapter), not decoration for its own sake — reuses
 *  the site's existing brand + gold tokens so the section still reads as
 *  part of the same family as Hero/Ventures rather than inventing a new
 *  palette. */
const accentCycle = ['primary', 'orange', 'gold'] as const;
type AccentKey = (typeof accentCycle)[number];

const accent: Record<AccentKey, { text: string; dot: string; line: string }> = {
  primary: { text: 'text-brand-primary', dot: 'bg-brand-primary', line: 'bg-brand-primary' },
  orange: { text: 'text-brand-orange', dot: 'bg-brand-orange', line: 'bg-brand-orange' },
  gold: { text: 'text-gold', dot: 'bg-gold', line: 'bg-gold' },
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

function Row({ milestone, index, isLast }: { milestone: Milestone; index: number; isLast: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const a = accent[accentCycle[index % accentCycle.length]];
  const caption = milestone.eyebrow !== milestone.period ? milestone.eyebrow : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-[100px_22px_1fr] gap-x-0 sm:grid-cols-[128px_28px_1fr] lg:grid-cols-[152px_32px_1fr] ${
        isLast ? '' : 'border-b border-default'
      }`}
    >
      {/* Meta — right-aligned so the spine below always sits at a fixed x,
          whatever the label's length ("2000" vs "Early Growth"). */}
      <div className="py-6 pr-2 text-right sm:py-8 sm:pr-4 lg:py-10">
        <div className={`font-serif text-sm font-bold leading-tight sm:text-2xl lg:text-[1.75rem] ${a.text}`}>
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
          className={`relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-[5px] ring-canvas sm:h-3 sm:w-3 ${a.dot}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:py-8 lg:py-10">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-bold leading-snug text-charcoal sm:text-xl lg:text-2xl">
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
    <section id="journey" className="relative overflow-hidden bg-canvas px-[5vw] py-24 sm:py-32">
      {/* One quiet glow — restrained on purpose, this section leans on
          typography and structure rather than background decoration. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 16, -10, 0], y: [0, -10, 8, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-[8%] h-[380px] w-[380px] rounded-full bg-brand-primary/[0.06] blur-[150px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[880px]">
        {/* ---------------------------- Header ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <p className="font-serif text-sm italic text-graphite">2000 &mdash; Present</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] text-charcoal">
            From Vision to Impact
          </h2>
          <p className="text-sm leading-relaxed text-graphite sm:text-base">
            A journey of building businesses, creating partnerships and investing in
            opportunities that create long-term value.
          </p>
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
              index={index}
              isLast={index === journeyMilestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}