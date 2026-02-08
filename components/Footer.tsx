
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const Footer: React.FC = () => {
  const { config } = useConfig();

  return (
    <footer className="site-footer">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-surface rounded flex items-center justify-center text-white" style={{ width: 32, height: 32, background: 'var(--bg-card)' }}>
            <span className="material-symbols-outlined text-sm">deployed_code</span>
          </div>
          <span className="font-bold text-muted">{config.footer.copyright}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {config.footer.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-muted hover:text-primary transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>

        <p className="text-dim text-sm italic">{config.footer.tagline}</p>
      </div>
    </footer>
  );
};

export default Footer;
