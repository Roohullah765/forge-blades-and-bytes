// Age verification modal - shows on first visit
// This ensures users are 18+ before accessing the knife store

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AgeVerificationModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Check if user has already been verified
  useEffect(() => {
    const verified = localStorage.getItem('elite-blade-age-verified');
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleVerifyAge = () => {
    // Save verification status
    localStorage.setItem('elite-blade-age-verified', 'true');
    setIsVerified(true);
    setIsVisible(false);
  };

  const handleDenyAge = () => {
    // Redirect to a general site or show message
    alert('You must be 18 or older to access this website.');
    // In a real application, you might redirect to a different site
    window.location.href = 'https://www.google.com';
  };

  // Don't render if already verified
  if (isVerified) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-md"
            >
              <Card className="p-8 shadow-2xl border-2">
                <div className="text-center space-y-6">
                  {/* Warning Icon */}
                  <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </div>

                  {/* Heading */}
                  <div className="space-y-2">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Age Verification Required
                    </h2>
                    <p className="text-muted-foreground">
                      You must be 18 years or older to access this website and purchase knives.
                    </p>
                  </div>

                  {/* Legal Notice */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm text-left">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Legal age verification is required by law for knife sales</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Some products may have additional state restrictions</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Adult signature required upon delivery</span>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-foreground">
                      Are you 18 years of age or older?
                    </h3>
                    
                    {/* Buttons */}
                    <div className="flex space-x-4">
                      <Button
                        onClick={handleVerifyAge}
                        className="flex-1 bg-primary hover:bg-primary-glow text-primary-foreground"
                        size="lg"
                      >
                        Yes, I am 18+
                      </Button>
                      <Button
                        onClick={handleDenyAge}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        No, I am under 18
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  <p className="text-xs text-muted-foreground">
                    By clicking "Yes, I am 18+", you confirm that you meet the legal age requirement 
                    in your jurisdiction to purchase knives and other cutting tools.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AgeVerificationModal;