import React from 'react';
import { NavLink } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchContext } from '../../hooks/SearchContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
  { label: 'Partners', comingSoon: true },
];

const alertMessages = [
  'RavDevOps: Fractional DevOps and custom tooling for small teams.',
  'Tip: You can chat with Raven any time using the assistant in the bottom-right.',
  'Booking hours: 1–4pm Mon, Tue, Thu, Fri, and most federal holidays.',
  'Reminder: This site uses a local AI assistant – no external AI API keys.',
  'Fun fact: The team behind RavDevOps builds Discord bots and gaming tools too.',
];

export default function Header({ theme, toggleTheme }) {
  const { query, setQuery } = React.useContext(SearchContext);
  const [alertIndex, setAlertIndex] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (alertMessages.length === 0) return undefined;
    let timeoutId;
    const visibleDuration = 10000; // total time alert is visible
    const hiddenDuration = 60000; // delay between alerts

    const schedule = (visible) => {
      timeoutId = setTimeout(() => {
        if (visible) {
          setShowAlert(false);
          schedule(false);
        } else {
          setAlertIndex((prev) => (prev + 1) % alertMessages.length);
          setShowAlert(true);
          schedule(true);
        }
      }, visible ? visibleDuration : hiddenDuration);
    };

    setShowAlert(false);
    schedule(false);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderNavItem = (item, variant = 'desktop') => {
    const baseClasses =
      variant === 'desktop'
        ? 'border-b-2 border-transparent pb-1 transition-colors hover:text-white'
        : 'w-full rounded-xl border border-raven-border/60 bg-raven-card/80 px-3 py-2 text-left text-sm text-slate-200 hover:border-raven-accent/70 hover:text-white';

    if (item.comingSoon) {
      return (
        <div
          key={`${item.label}-${variant}`}
          className={`${baseClasses} relative group cursor-default`}
        >
          <span>{item.label}</span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-slate-900 opacity-0 shadow-soft-glow transition-opacity group-hover:opacity-100 dark:bg-raven-card/90 dark:text-slate-100">
            Coming soon!
          </span>
        </div>
      );
    }

    return (
      <NavLink
        key={`${item.to}-${variant}`}
        to={item.to}
        onClick={() => variant === 'mobile' && setMenuOpen(false)}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? 'border-raven-accent text-white' : 'text-slate-300'}`
        }
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-raven-border/70 bg-raven-navy/80 backdrop-blur relative">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 lg:px-6">
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-raven-border/70 bg-raven-card/80 text-slate-200 hover:border-raven-accent/70 hover:text-white md:hidden"
          >
            {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
          <nav className="hidden flex-wrap items-center gap-4 text-sm font-medium text-slate-200 md:flex">
            {navItems.map((item) => renderNavItem(item, 'desktop'))}
          </nav>
        </div>

        <div className="flex flex-1 justify-center px-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts & case studies..."
            className="w-full min-w-0 max-w-xs rounded-full border border-raven-border/70 bg-raven-card/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-400 shadow-inner shadow-black/20 transition-colors hover:border-raven-accent/80 hover:bg-raven-card hover:outline hover:outline-1 hover:outline-raven-accent/60 focus:border-raven-accent focus:outline-none sm:max-w-sm md:max-w-md"
          />
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-raven-border/70 bg-raven-card p-2 text-slate-200 hover:border-raven-accent/80 hover:text-white"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-40 px-4 pb-4 pt-2 md:hidden"
          >
            <div className="rounded-2xl border border-raven-border/70 bg-raven-card/95 px-3 py-2 shadow-soft-glow backdrop-blur">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => renderNavItem(item, 'mobile'))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            key="header-alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-x-0 top-full z-30 flex justify-center px-4 pb-2 pt-1 text-sm"
            aria-live="polite"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/70 bg-red-600/95 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-red-900/40">
              {alertMessages[alertIndex]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
