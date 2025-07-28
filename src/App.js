// App.js

import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

import { QuizModalProvider } from './components/QuizModalContext';
import Hero from './components/Hero';
import Services from './components/Services';
import Demos from './components/Demos';
import Solutions from './components/Solutions';
import Process from './components/Process';
import WhyRaven from './components/WhyRaven';
import Pricing from './components/Pricing';
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

  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QuizModalProvider>
          <div className="App bg-gray-50 min-h-screen flex flex-col">
            <Helmet>
              <title>Raven DevOps – Custom Apps, SaaS, & Automation</title>
              <meta
                name="description"
                content="Transform your business with expert app development, SaaS solutions, and workflow automation. Explore our demos and discover what Raven DevOps can do for you."
              />
              <meta property="og:title" content="Raven DevOps" />
              <meta property="og:description" content="Custom software, SaaS, and business automation demos." />
              <meta property="og:type" content="website" />
            </Helmet>
            <main role="main" className="flex-grow max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-8">
              <Hero id="hero" scrollToContact={() => scrollToSection('contact')} scrollToSection={scrollToSection} />
              <Services id="services" scrollToSection={scrollToSection} />
              <Demos id="demos" />
              <Solutions id="solutions" />
              <Process id="process" />
              <WhyRaven id="why-raven" />
              <Pricing id="pricing" />
              <Contact id="contact" />
            </main>
            <Footer />
          </div>
        </QuizModalProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
