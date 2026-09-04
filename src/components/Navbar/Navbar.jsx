import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Flame, ArrowRight, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/components/navbar.css';

export const Navbar = ({ 
  brandName = "RepFuelAI", 
  navLinks = [], 
  ctaText = "Get Started", 
  ctaLink = "#categories" 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Wordmark */}
        <a href="#hero" className="navbar-brand" aria-label={`${brandName} Home`}>
          <div className="brand-icon-wrap" aria-hidden="true">
            <Flame size={22} />
          </div>
          <span>RepFuel<span className="brand-accent">AI</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          <ul className="nav-menu-desktop">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions: Theme Toggle + CTA Button + Mobile Toggle */}
        <div className="navbar-actions">
          {/* User-Controlled Theme Toggle */}
          <button 
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Primary Action Button */}
          <a href={ctaLink} className="navbar-cta-btn">
            <span>{ctaText}</span>
            <ArrowRight size={16} />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <ul className="mobile-nav-links">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={18} opacity={0.6} />
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-footer">
            <a 
              href={ctaLink} 
              className="mobile-cta-btn"
              onClick={closeMobileMenu}
            >
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
