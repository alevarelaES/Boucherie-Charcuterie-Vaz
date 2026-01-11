import { Hero } from './components/Hero';
import { MetiersSection } from './components/MetiersSection';
import { ProduitsSection } from './components/ProduitsSection';
import { ValeursSection } from './components/ValeursSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <MetiersSection />
      <ProduitsSection />
      <ValeursSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
