import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import ravenHomeLogo from '../../assets/raven_home_logo.png';

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
  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-raven-border/70 bg-raven-navy/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <img
            src={ravenHomeLogo}
            alt="Raven Development Operations logo"
            className="h-10 w-10 rounded-2xl border border-raven-border/70 object-contain shadow-soft-glow"
          />
          <div>
            <p className="leading-tight">Raven Development Operations</p>
            <p className="text-xs text-slate-400">DevOps Consulting & Automation</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
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
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-raven-border/70 bg-raven-card p-2 text-slate-200 hover:border-raven-accent/80 hover:text-white"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/raven-dev-ops"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-raven-border/60 bg-raven-card text-slate-200 hover:border-raven-accent/80 hover:text-white"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ravdevops/"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-raven-border/60 bg-raven-card text-slate-200 hover:border-raven-accent/80 hover:text-white"
            >
              in
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
