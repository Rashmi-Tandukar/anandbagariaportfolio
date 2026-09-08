import { motion, useReducedMotion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Tv, ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';
import { investmentFocusAreas, showStats } from '../../data/investmentFocus';

/** Animates a numeric prefix inside a stat string (e.g. "100" in "100"). */
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
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{numeric !== null ? `${display}${suffix}` : value}</span>;
}

export default function Investments() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="investments" className="relative overflow-hidden bg-canvas px-[5vw] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-[5%] h-[340px] w-[340px] rounded-full bg-gold/[0.07] blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[8%] h-[380px] w-[380px] rounded-full bg-forest/[0.09] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px]">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-deep">
              Investments
            </span>
            <h2 className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
              Backing Nepal&rsquo;s next generation of builders
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          {/* Featured card: Shark Tank Nepal */}
          <Reveal delay={0.08}>
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-full min-h-[520px] flex-col justify-end overflow-hidden rounded-[28px] border border-subtle bg-gradient-to-br from-sage/15 via-canvas to-gold/10 p-8 sm:p-10"
            >
              {/* Decorative graphic */}
              <motion.div
                className="pointer-events-none absolute -right-14 -top-14 h-72 w-72 rounded-full bg-forest/[0.10] blur-[10px]"
                animate={
                  prefersReducedMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="pointer-events-none absolute right-10 top-10 flex h-24 w-24 items-center justify-center rounded-full border border-forest-light/25 text-forest-light/70"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <Tv className="h-9 w-9" strokeWidth={1.5} />
              </motion.span>

              <div className="relative flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
                  Featured
                </span>
                <span className="inline-flex items-center rounded-full bg-forest/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest">
                  Shark Tank Nepal
                </span>
              </div>

              <h3 className="relative mt-6 max-w-md font-serif text-2xl leading-tight text-charcoal sm:text-3xl">
                A Shark on Shark Tank Nepal
              </h3>
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-graphite sm:text-base">
                One of five founding Sharks on Nepal&rsquo;s edition of the world&rsquo;s largest
                business reality format, investing alongside a panel of the country&rsquo;s
                leading entrepreneurs.
              </p>

              <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-subtle pt-6">
                {showStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-lg font-bold text-forest sm:text-xl">
                      <StatValue value={stat.value} />
                    </span>
                    <span className="text-[11px] leading-snug text-taupe">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="#contact"
                className="group/link relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:bg-forest"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
              </a>
            </motion.div>
          </Reveal>

          {/* List: investment focus areas */}
          <div className="flex flex-col divide-y divide-subtle rounded-[28px] border border-subtle bg-white/70 px-2 sm:px-4">
            {investmentFocusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-4 py-6"
                >
                  <motion.span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forest/[0.08] text-forest-light transition-colors duration-300 group-hover:bg-forest group-hover:text-ink sm:h-[72px] sm:w-[72px]"
                    whileHover={prefersReducedMotion ? undefined : { rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </motion.span>

                  <div className="min-w-0">
                    <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-deep">
                      Focus Area
                    </span>
                    <h3 className="mt-2 font-serif text-lg leading-snug text-charcoal transition-colors duration-300 group-hover:text-forest">
                      {area.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-graphite">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}