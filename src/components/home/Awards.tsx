import { motion, useReducedMotion } from 'framer-motion';
import { Award as AwardIcon, Trophy } from 'lucide-react';
import Reveal from '../common/Reveal';
import { awards } from '../../data/awards';

/**
 * A single recognition — a plain, editorial card rather than a trophy-shelf
 * tile. Year reads like a dateline; the issuer sits beside the category so
 * the card still makes sense with images entirely absent.
 */
function AwardCard({ award, index }: { award: (typeof awards)[number]; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-subtle bg-white/70 p-6 shadow-elevation-sm transition-shadow duration-normal hover:shadow-elevation-md"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
          <Trophy className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="font-serif text-sm font-bold text-gold-deep/80">{award.year}</span>
      </div>

      <div className="flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-deep">
          {award.category}
        </span>
        <h4 className="mt-1.5 font-serif text-lg font-bold leading-snug text-charcoal">
          {award.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-graphite">{award.description}</p>
      </div>

      <p className="border-t border-subtle pt-3 text-xs font-medium text-taupe">{award.issuer}</p>
    </motion.div>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="relative overflow-hidden bg-canvas px-[5vw] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-[10%] h-[340px] w-[340px] rounded-full bg-gold/[0.08] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px]">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-gold/10 px-3 py-1">
            <AwardIcon className="h-3 w-3 text-gold-deep" strokeWidth={2.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">
              Honors
            </span>
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] text-charcoal">
            Awards &amp; Recognition
          </h2>
          <p className="text-sm leading-relaxed text-graphite sm:text-base">
            Recognition from industry bodies and chambers of commerce for two decades of
            building, leading and investing in Nepal&rsquo;s agribusiness sector.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, index) => (
            <AwardCard key={award.id} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}