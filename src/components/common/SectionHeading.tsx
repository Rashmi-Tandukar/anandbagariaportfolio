import type { SectionAlignment } from '../../types/common';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: SectionAlignment;
}

const wrapperAlign: Record<SectionAlignment, string> = {
  left: 'items-start text-left',
  center: 'mx-auto items-center text-center',
  right: 'ml-auto items-end text-right',
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${wrapperAlign[align]}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-deep">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-graphite">{description}</p>
      )}
    </div>
  );
}