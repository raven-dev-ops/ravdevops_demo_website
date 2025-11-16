import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('bg-raven-navy', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className={theme === 'dark' ? 'bg-raven-navy text-slate-100' : 'bg-white text-slate-900'}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="min-h-screen bg-gradient-to-b from-raven-navy via-raven-card/40 to-raven-navy">
        {children}
      </main>
      <Footer />
    </div>
  );
}
