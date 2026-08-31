import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import Journey from '../components/home/Journey';
import Ventures from '../components/home/ventures';
import Investments from '../components/home/investments';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutPreview />
        <Journey />
        <Ventures />
        <Investments />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}