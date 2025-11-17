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

  const wrapperClasses =
    theme === 'dark'
      ? 'min-h-screen text-slate-100'
      : 'min-h-screen text-slate-900';

  const mainClasses =
    theme === 'dark'
      ? 'bg-gradient-to-b from-raven-navy/95 via-raven-card/40 to-raven-navy/95'
      : 'bg-gradient-to-b from-raven-navy/70 via-raven-card/25 to-raven-navy/60';

  return (
    <div className={wrapperClasses}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className={mainClasses}>{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
