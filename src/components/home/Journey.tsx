import { motion, useReducedMotion } from 'framer-motion';
import { journeyMilestones } from '../../data/journey';

export default function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const lastIndex = journeyMilestones.length - 1;

  return (
    <section id="journey" className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      {/* Background: soft drifting brand-color glows, kept quiet so the
          typography carries the section. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, -18, 12, 0], y: [0, 14, -10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-[8%] h-[320px] w-[320px] rounded-full bg-[rgba(180,229,13,0.09)] blur-[130px]"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 14, -12, 0], y: [0, -10, 8, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute -left-20 bottom-[8%] h-[280px] w-[280px] rounded-full bg-[rgba(120,200,65,0.08)] blur-[120px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px] px-[5vw]">
        {/* ---------------------------- Header ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-2xl flex-col gap-3"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-graphite">
            <span className="h-px w-8 bg-brand-primary" aria-hidden="true" />
            The Journey
          </span>
          <h2 className="font-serif text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[1.12] text-charcoal">
            Two Decades,{' '}
            <span className="bg-gradient-to-r from-[var(--primary-hover)] to-brand-primary bg-clip-text text-transparent">
              One Milestone
            </span>{' '}
            at a Time
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-graphite sm:text-base">
            From a modest trading enterprise to a diversified group spanning agribusiness,
            industry leadership, and investment &mdash; a path built step by step.
          </p>
        </motion.div>

        {/* ------------------------ Editorial list ------------------------ */}
        <div className="mt-14 border-t border-subtle sm:mt-20">
          {journeyMilestones.map((milestone, index) => {
            const isFinal = index === lastIndex;
            const numberIdle = isFinal ? 'text-brand-orange/20' : 'text-charcoal/[0.1]';
            const numberHover = isFinal ? 'group-hover:text-brand-orange/40' : 'group-hover:text-brand-primary/35';
            const periodClass = isFinal ? 'text-brand-orange' : 'text-[var(--primary-hover)]';
            const titleHover = isFinal ? 'group-hover:text-brand-orange' : 'group-hover:text-forest';
            const underlineClass = isFinal
              ? 'bg-gradient-to-r from-brand-orange to-brand-red'
              : 'bg-gradient-to-r from-brand-primary to-brand-secondary';

            return (
              <motion.article
                key={milestone.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative grid gap-5 border-b border-subtle py-9 sm:grid-cols-12 sm:gap-8 sm:py-11 lg:py-12"
              >
                {/* Number + period + category column */}
                <motion.div
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="sm:col-span-3"
                >
                  <span
                    className={`block font-serif text-6xl font-bold leading-none transition-colors duration-normal sm:text-7xl ${numberIdle} ${numberHover}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-3 flex items-center gap-2">
                    {isFinal && (
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
                      </span>
                    )}
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${periodClass}`}>
                      {milestone.period}
                    </span>
                  </div>
                  <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-graphite">
                    {milestone.category}
                  </span>
                </motion.div>

                {/* Title + description + optional image */}
                <motion.div
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.55, delay: index * 0.05 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="sm:col-span-9"
                >
                  <h3
                    className={`font-serif text-2xl font-bold leading-snug text-charcoal transition-colors duration-normal sm:text-3xl ${titleHover}`}
                  >
                    {milestone.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`mt-3 block h-0.5 w-10 origin-left scale-x-100 transition-transform duration-normal group-hover:scale-x-150 ${underlineClass}`}
                  />
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-graphite sm:text-base">
                    {milestone.description}
                  </p>

                  {milestone.image && (
                    <div className="mt-6 max-w-md overflow-hidden rounded-2xl shadow-[0_20px_50px_-28px_rgba(31,51,42,0.4)]">
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="h-44 w-full object-cover transition-transform duration-slow group-hover:scale-[1.05] sm:h-52"
                      />
                    </div>
                  )}
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}