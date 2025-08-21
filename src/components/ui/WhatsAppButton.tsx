// WhatsApp floating action button (bottom-left)
// This opens WhatsApp chat with a predefined message

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  // WhatsApp phone number (replace with actual business number)
  const phoneNumber = '1234567890'; // Example number
  
  // Predefined message for WhatsApp
  const message = encodeURIComponent(
    'Hello! I\'m interested in your knives and would like more information.'
  );
  
  // WhatsApp deep link URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
        aria-label="Contact us on WhatsApp"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>
      </Button>
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg"
        >
          <p className="text-sm text-card-foreground whitespace-nowrap">
            Chat with us on WhatsApp
          </p>
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-2 h-2 bg-card border-l border-t border-border rotate-45 -mr-1"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;