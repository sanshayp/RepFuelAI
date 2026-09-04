import React from 'react';
import { Flame, Twitter, Instagram, Youtube, Github, Heart } from 'lucide-react';
import '../../styles/components/footer.css';

const getSocialIcon = (iconName) => {
  switch (iconName) {
    case 'Twitter':
      return <Twitter size={18} />;
    case 'Instagram':
      return <Instagram size={18} />;
    case 'Youtube':
      return <Youtube size={18} />;
    case 'Github':
      return <Github size={18} />;
    default:
      return <Twitter size={18} />;
  }
};

export const Footer = ({
  brandName = "RepFuelAI",
  tagline = "The premier AI-driven ecosystem for athletic performance, progressive resistance, and metabolic fueling.",
  columns = [],
  socialLinks = []
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-top">
          {/* Brand & Social Media Column */}
          <div className="footer-brand-col">
            <a href="#hero" className="footer-brand-link" aria-label={`${brandName} Home`}>
              <div className="brand-icon-wrap" aria-hidden="true">
                <Flame size={22} />
              </div>
              <span>RepFuel<span className="brand-accent">AI</span></span>
            </a>
            <p className="footer-brand-tagline">{tagline}</p>
            
            {socialLinks.length > 0 && (
              <div className="footer-social-links" aria-label="Social Media Links">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links Columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="footer-links-col">
              <h4 className="footer-col-title">{col.title}</h4>
              <ul className="footer-link-list">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.href} className="footer-nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar with Dynamic Year */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {brandName}. All rights reserved. Precision Fitness Engineering.
          </p>
          <div className="footer-bottom-badge">
            <span>Powered by AI Overload Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
