import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Newspaper, Mic, Radio, Tv, Linkedin, Link2, ArrowUpRight } from 'lucide-react';
import Reveal from '../common/Reveal';
import { mediaItems } from '../../data/media';
import type { MediaCategory } from '../../types/media';

/** Icon + label per media category — one small, consistent vocabulary so
 *  the filter tabs and the card icons always agree with each other. */
const categoryMeta: Record<MediaCategory, { label: string; Icon: typeof Newspaper }> = {
  interview: { label: 'Interviews', Icon: Mic },
  podcast: { label: 'Podcasts', Icon: Radio },
  article: { label: 'Articles', Icon: Newspaper },
  speaking: { label: 'Speaking', Icon: Mic },
  sharkTank: { label: 'Shark Tank Nepal', Icon: Tv },
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  other: { label: 'Other', Icon: Link2 },
};

/**
 * A single media appearance. No thumbnail image is assumed — the category
 * icon carries the visual weight, matching the icon-fallback pattern used
 * for brand logos elsewhere on the page, so the grid never looks broken
 * while real press assets are still being collected.
 */
function MediaCard({ item, index }: { item: (typeof mediaItems)[number]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const meta = categoryMeta[item.category];
  const isLink = item.url && item.url !== '#';

  const Wrapper = isLink ? motion.a : motion.div;

  return (
    <Wrapper
      {...(isLink ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      layout
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-subtle bg-white/70 p-6 shadow-elevation-sm transition-shadow duration-normal hover:shadow-elevation-md"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-light/25 bg-forest-light/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-forest-light">
          <meta.Icon className="h-3 w-3" strokeWidth={2.5} />
          {meta.label}
        </span>
        <span className="text-xs text-taupe">{item.date}</span>
      </div>

      <div className="flex-1">
        <h4 className="font-serif text-base font-bold leading-snug text-charcoal sm:text-lg">
          {item.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-graphite">{item.description}</p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-subtle pt-3">
        <span className="text-xs font-medium text-taupe">{item.source}</span>
        {isLink && (
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-sage-deep transition-transform duration-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </div>
    </Wrapper>
  );
}

export default function Media() {
  const [activeCategory, setActiveCategory] = useState<MediaCategory | 'all'>('all');

  const availableCategories = Array.from(
    new Set(mediaItems.map((item) => item.category)),
  ) as MediaCategory[];

  const filteredMedia =
    activeCategory === 'all' ? mediaItems : mediaItems.filter((item) => item.category === activeCategory);

  return (
    <section id="media" className="relative overflow-hidden bg-[#F3F1EA] px-[5vw] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] bottom-[5%] h-[380px] w-[380px] rounded-full bg-forest/[0.07] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px]">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-forest-light/10 px-3 py-1">
            <Newspaper className="h-3 w-3 text-forest-light" strokeWidth={2.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">
              Press
            </span>
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] text-charcoal">
            Media &amp; Appearances
          </h2>
          <p className="text-sm leading-relaxed text-graphite sm:text-base">
            A running record of interviews, features, speaking engagements and appearances
            across national media.
          </p>
        </Reveal>

        {/* Category filter — same text-tabs-on-a-rule pattern used for
            Ventures, so filtering reads consistently across the page. */}
        <Reveal
          delay={0.05}
          className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-2 border-b border-subtle"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-200 ${
              activeCategory === 'all'
                ? 'border-sage-deep text-charcoal'
                : 'border-transparent text-taupe hover:text-graphite'
            }`}
          >
            All
          </button>
          {availableCategories.map((category) => {
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
                {categoryMeta[category].label}
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredMedia.map((item, index) => (
              <MediaCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}