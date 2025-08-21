// Main navigation header component
// This provides the top navigation with logo, menu, and cart icon

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Sword } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCartItemCount } from '@/utils/cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemCount = getCartItemCount();

  // Navigation links with display names
  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/catalog', label: 'All Knives' },
    { path: '/catalog/chef', label: 'Chef' },
    { path: '/catalog/hunting', label: 'Hunting' },
    { path: '/catalog/pocket', label: 'Pocket' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  // Check if current path is active
  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Close mobile menu when link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={handleLinkClick}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sword className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              Elite Blade Co.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveLink(link.path) 
                    ? 'text-primary font-semibold' 
                    : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`block py-2 px-4 rounded-lg transition-colors hover:bg-muted ${
                      isActiveLink(link.path)
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;