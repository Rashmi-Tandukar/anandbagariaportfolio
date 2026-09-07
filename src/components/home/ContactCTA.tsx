import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';
import Reveal from '../common/Reveal';
import { anandProfile } from '../../data/profile';

// Social links shown as icon buttons. LinkedIn always shows (it's the
// primary channel); Instagram/Facebook only render once a real URL is set
// on anandProfile in src/data/profile.ts.
const socialLinks = [
  { key: 'linkedin', href: anandProfile.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { key: 'instagram', href: anandProfile.instagram, label: 'Instagram', Icon: Instagram },
  { key: 'facebook', href: anandProfile.facebook, label: 'Facebook', Icon: Facebook },
].filter((link) => !!link.href);

type FormStatus = 'idle' | 'sending' | 'sent';

/**
 * Inquiry form — client-side only, no backend wired up. On submit it opens
 * the visitor's email client with a pre-filled message addressed to
 * anandProfile.email (set that in src/data/profile.ts). If no email is
 * configured yet, submitting instead opens the LinkedIn profile so the
 * form is never a dead end.
 *
 * To send these submissions to a real inbox/CRM instead of relying on
 * mailto:, replace the body of handleSubmit with a fetch() POST to a form
 * backend (e.g. Formspree, Getform, EmailJS) or your own API endpoint.
 */
function InquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    if (anandProfile.email) {
      const subject = encodeURIComponent(`Inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      );
      window.location.href = `mailto:${anandProfile.email}?subject=${subject}&body=${body}`;
    } else {
      window.open(anandProfile.linkedin, '_blank', 'noopener,noreferrer');
    }

    window.setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      window.setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-graphite">Name</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your name"
            className="rounded-xl border border-default bg-white px-4 py-3 text-sm text-charcoal placeholder:text-taupe outline-none transition-colors duration-200 focus:border-brand-primary focus:bg-[rgba(120,200,65,0.04)]"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-graphite">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@company.com"
            className="rounded-xl border border-default bg-white px-4 py-3 text-sm text-charcoal placeholder:text-taupe outline-none transition-colors duration-200 focus:border-brand-primary focus:bg-[rgba(120,200,65,0.04)]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-graphite">Message</span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={handleChange('message')}
          placeholder="Tell me a bit about what you'd like to discuss..."
          className="resize-none rounded-xl border border-default bg-white px-4 py-3 text-sm text-charcoal placeholder:text-taupe outline-none transition-colors duration-200 focus:border-brand-primary focus:bg-[rgba(120,200,65,0.04)]"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(120,200,65,0.55)] transition-all duration-normal hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(120,200,65,0.6)] disabled:pointer-events-none disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : status === 'sent' ? (
          <>Message ready &mdash; check your email app</>
        ) : (
          <>
            Send Inquiry
            <Send className="h-3.5 w-3.5 transition-transform duration-normal group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {!anandProfile.email && (
        <p className="text-center text-xs text-taupe">
          Submitting will open LinkedIn &mdash; add an email in the profile data to enable direct messages.
        </p>
      )}
    </form>
  );
}

export default function ContactCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden bg-canvas px-[5vw] py-20 sm:py-28">
      {/* Background: dot grid + drifting brand-color glows, kept subtle so
          the panel reads as a soft, light CTA in line with the rest of the page. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: 'radial-gradient(rgba(120,200,65,0.14) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 60% 70% at 50% 40%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 40%, black 20%, transparent 100%)',
          }}
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 24, -14, 0], y: [0, -16, 12, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-16 top-[10%] h-[320px] w-[320px] rounded-full bg-brand-primary/[0.12] blur-[130px]"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, -18, 14, 0], y: [0, 14, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -right-20 bottom-[6%] h-[300px] w-[300px] rounded-full bg-brand-orange/[0.1] blur-[130px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px]">
        {/* ---------------------------- Header ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-deep">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Open to conversations
          </span>

          <h2 className="font-serif text-[clamp(1.85rem,3.4vw,3rem)] font-bold leading-[1.14] text-charcoal">
            Let&rsquo;s build{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              something great
            </span>
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-graphite sm:text-base">
            For business inquiries, partnerships, or speaking engagements, send a note
            using the form or reach out directly &mdash; always glad to connect with
            founders, operators, and partners.
          </p>
        </motion.div>

        <div className="mt-12 overflow-hidden rounded-[32px] border border-subtle bg-white/70 shadow-[0_24px_60px_-30px_rgba(31,51,42,0.25)] backdrop-blur sm:mt-16">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16 lg:p-16">
            {/* -------------------------- Left: details -------------------------- */}
            <Reveal className="flex h-full flex-col items-start gap-6 text-left">
              <div className="flex flex-col gap-4 text-sm text-graphite">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-taupe" strokeWidth={2} />
                  {anandProfile.location}
                </span>
                {anandProfile.email && (
                  <a
                    href={`mailto:${anandProfile.email}`}
                    className="flex items-center gap-2 transition-colors duration-200 hover:text-charcoal"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-taupe" strokeWidth={2} />
                    {anandProfile.email}
                  </a>
                )}
                {anandProfile.phone && (
                  <a
                    href={`tel:${anandProfile.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-2 transition-colors duration-200 hover:text-charcoal"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-taupe" strokeWidth={2} />
                    {anandProfile.phone}
                  </a>
                )}
              </div>

              {/* Social row */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-white/70 text-graphite transition-all duration-normal hover:-translate-y-0.5 hover:border-primary hover:bg-white hover:text-charcoal"
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </a>
                ))}
                <a
                  href={anandProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 pl-1 text-xs font-semibold uppercase tracking-wide text-taupe transition-colors duration-200 hover:text-charcoal"
                >
                  Connect
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-subtle to-transparent" />

              {/* Response time */}
              <span className="flex items-center gap-2 text-xs text-taupe">
                <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                Typically responds within 2&ndash;3 business days
              </span>

              {/* Focus areas — fills out the column and signals what to reach out about */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
                  Open to discussing
                </span>
                <div className="flex flex-wrap gap-2">
                  {anandProfile.expertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-subtle bg-white/70 px-3 py-1.5 text-xs font-medium text-graphite"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ------------------------- Right: form ------------------------- */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-subtle bg-white p-6 shadow-[0_24px_60px_-30px_rgba(31,51,42,0.3)] sm:p-8">
                <h3 className="font-serif text-lg font-bold text-charcoal sm:text-xl">Send an inquiry</h3>
                <p className="mt-1 text-xs text-graphite sm:text-sm">
                  Fill in a few details and I&rsquo;ll get back to you.
                </p>
                <div className="mt-6">
                  <InquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}