import React from 'react';
import { NavLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { SearchContext } from '../../hooks/SearchContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ theme, toggleTheme }) {
  const { query, setQuery } = React.useContext(SearchContext);

  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-raven-border/70 bg-raven-navy/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-200">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `border-b-2 border-transparent pb-1 transition-colors hover:text-white ${
                  isActive ? 'border-raven-accent text-white' : 'text-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts & case studies..."
            className="hidden w-40 rounded-full border border-raven-border/70 bg-raven-card/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-400 shadow-inner shadow-black/20 transition-colors hover:border-raven-accent/80 hover:bg-raven-card focus:border-raven-accent focus:outline-none sm:block sm:w-56"
          />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-raven-border/70 bg-raven-card p-2 text-slate-200 hover:border-raven-accent/80 hover:text-white"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
