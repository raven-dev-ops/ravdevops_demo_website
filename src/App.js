// App.js

import React, { useEffect, useState, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Site Sections (in homepage order)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Industries from './components/Industries';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Error fallback component for ErrorBoundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center my-16 px-4">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Something went wrong.</h2>
      <p className="mb-2 text-gray-700">{error.message}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        onClick={resetErrorBoundary}
      >
        Reload Page
      </button>
    </div>
  );
}

function App() {
  const [contactInterest, setContactInterest] = useState('Consultation');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll for internal links/buttons
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToContactWith = useCallback((interest) => {
    setContactInterest(interest);
    scrollToSection('contact');
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="App bg-gray-50 min-h-screen flex flex-col">
          <Helmet>
            <title>RAV DevOps — US-Based Tech Solutions</title>
            <meta
              name="description"
              content="Veteran-owned, US-based DevOps, cloud, analytics, and custom software to eliminate inefficiencies and drive growth."
            />
            <meta property="og:title" content="RAV DevOps" />
            <meta property="og:description" content="DevOps, cloud, analytics dashboards, and custom software." />
            <meta property="og:type" content="website" />
          </Helmet>
          <Navbar
            onNavigate={scrollToSection}
            onBookConsultation={() => goToContactWith('Consultation')}
            onRequestDemo={() => goToContactWith('Demo Request')}
            onJoinRetainer={() => goToContactWith('CI Retainer Program')}
          />
          <main role="main" className="flex-grow max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-8">
            <Hero
              id="hero"
              scrollToSection={scrollToSection}
            />
            <Services id="services" />
            <Industries id="industries" />
            <About id="about" />
            <Contact id="contact" initialInterest={contactInterest} />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

