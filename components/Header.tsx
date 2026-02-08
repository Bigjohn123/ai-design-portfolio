
import React from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';

interface HeaderProps {
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const { config } = useConfig();

  return (
    <header className="site-header">
      <div className="container h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform" style={{ width: 40, height: 40 }}>
            <span className="material-symbols-outlined">deployed_code</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">{config.header.logoText}</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {config.header.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onContactClick}
            className="btn btn-primary text-sm"
          >
            {config.header.ctaLabel}
          </button>
        </nav>

        <button className="md:hidden text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
