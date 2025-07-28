// App.js

import React, { useEffect } from 'react';
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
  // Force scroll to top on first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Basic smooth scroll handler for internal links/buttons
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
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
