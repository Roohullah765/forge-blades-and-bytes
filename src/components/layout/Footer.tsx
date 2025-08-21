// Footer component with links and company information
// This provides the bottom navigation and legal information

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sword, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sword className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg gradient-text">
                Elite Blade Co.
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium knives for every purpose. Quality craftsmanship meets timeless design.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>1-800-KNIVES-1</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@eliteblade.co</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Sheffield, England</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/catalog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                All Knives
              </Link>
              <Link to="/catalog/chef" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Chef Knives
              </Link>
              <Link to="/catalog/hunting" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Hunting Knives
              </Link>
              <Link to="/catalog/pocket" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Pocket Knives
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">Customer Service</h3>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Shipping & Returns
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Size Guide
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Care Instructions
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Warranty
              </Link>
            </nav>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-2">
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/policies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Age Verification
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Elite Blade Co. All rights reserved. Must be 18+ to purchase.
          </p>
          <p className="text-sm text-muted-foreground text-center sm:text-right">
            Crafted with precision in Sheffield, England
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;