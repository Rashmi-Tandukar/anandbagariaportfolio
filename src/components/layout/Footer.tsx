import { Linkedin } from 'lucide-react';
import Container from '../common/Container';
import { anandProfile } from '../../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-neutral-500">
          © {year} {anandProfile.name}. All rights reserved.
        </p>
        <a
          href={anandProfile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </Container>
    </footer>
  );
}