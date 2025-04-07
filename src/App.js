import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Demos from './components/Demos';
import Solutions from './components/Solutions';
import Process from './components/Process'; // Ensure this file exists and is exported correctly
import WhyRaven from './components/WhyRaven';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import VeteranBadge from './components/VeteranBadge'; // Optional: Uncomment if using and file exists

function App() {
  // Basic smooth scroll handler for internal links/buttons
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Adjust for fixed header height if you have one
      // const headerOffset = 80; // Example offset
      // const elementPosition = element.getBoundingClientRect().top;
      // const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      // window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

      // Simpler version without offset:
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to top of section
    }
  };

  return (
    // Ensure className is applied for potential global styles
    <div className="App">
      {/* Optional: Simple Nav - uncomment if needed
      <nav className="sticky top-0 bg-white shadow-md z-50 p-4 hidden md:block">
        <ul className="flex justify-center space-x-6">
          <li><button onClick={() => scrollToSection('hero')} className="hover:text-raven-blue">Home</button></li>
          <li><button onClick={() => scrollToSection('services')} className="hover:text-raven-blue">Services</button></li>
          <li><button onClick={() => scrollToSection('demos')} className="hover:text-raven-blue">Demos</button></li>
          <li><button onClick={() => scrollToSection('solutions')} className="hover:text-raven-blue">Solutions</button></li>
          <li><button onClick={() => scrollToSection('process')} className="hover:text-raven-blue">Process</button></li>
          <li><button onClick={() => scrollToSection('why-raven')} className="hover:text-raven-blue">Why Us</button></li>
          <li><button onClick={() => scrollToSection('pricing')} className="hover:text-raven-blue">Pricing</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-raven-blue">Contact</button></li>
        </ul>
      </nav> */}

      <Hero id="hero" scrollToContact={() => scrollToSection('contact')} />
      <Services id="services" />
      <Demos id="demos" />
      <Solutions id="solutions" />
      <Process id="process" />
      <WhyRaven id="why-raven" />
      <Pricing id="pricing" />
      <Contact id="contact" />
      <Footer />
      {/* Optional floating badge */}
      {/* <VeteranBadge /> */}
    </div>
  );
}

export default App; // Ensure default export