import { ArrowUpRight, Linkedin } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import { anandProfile } from '../../data/profile';

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-neutral-900 py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Linkedin className="h-8 w-8 text-emerald-400" />
          <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
            Let&rsquo;s connect
          </h2>
          <p className="text-base leading-relaxed text-neutral-400 sm:text-lg">
            For business inquiries, partnerships, or speaking engagements, reach out on
            LinkedIn.
          </p>
          <Button
            href={anandProfile.linkedin}
            external
            variant="primary"
            className="!bg-white !text-neutral-900 hover:!bg-neutral-200"
          >
            Connect on LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}