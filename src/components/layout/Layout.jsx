import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '../ChatBot';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const mainClasses =
    theme === 'dark'
      ? 'min-h-screen bg-gradient-to-b from-raven-navy/95 via-raven-card/40 to-raven-navy/95'
      : 'min-h-screen bg-gradient-to-b from-raven-navy/80 via-raven-card/30 to-raven-navy/80';

  return (
    <div className="text-slate-100">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className={mainClasses}>{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
