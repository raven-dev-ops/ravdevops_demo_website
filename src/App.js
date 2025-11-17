// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/layout/Layout';
import { SearchProvider } from './hooks/SearchContext';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center my-16 px-4">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Something went wrong.</h2>
      <p className="mb-2 text-slate-200">{error.message}</p>
      <button
        className="bg-raven-accent text-black px-4 py-2 rounded shadow"
        onClick={resetErrorBoundary}
      >
        Reload Page
      </button>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SearchProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy" element={<Legal type="privacy" />} />
                <Route path="/terms" element={<Legal type="terms" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </SearchProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
