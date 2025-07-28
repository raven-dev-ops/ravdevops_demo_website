import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Demos from './components/Demos';
import Solutions from './components/Solutions';
import Process from './components/Process';
import WhyRaven from './components/WhyRaven';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Basic smooth scroll handler for internal links/buttons
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      {/* --- TOP DEMOS --- */}
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch px-2">
          <div className="flex-1 min-w-[320px]">
            <CodeOverhaul />
          </div>
          <div className="flex-1 min-w-[320px]">
            <CodeAudit />
          </div>
        </div>
      </div>

      {/* --- REST OF SITE --- */}
      <Hero id="hero" scrollToContact={() => scrollToSection('contact')} />
      <Services id="services" />
      <Demos id="demos" />
      <Solutions id="solutions" />
      <Process id="process" />
      <WhyRaven id="why-raven" />
      <Pricing id="pricing" />
      <Contact id="contact" />
      <Footer />
    </div>
  );
}

export default App;
