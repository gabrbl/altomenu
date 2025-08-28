
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const whatsappMessage = encodeURIComponent(
  '¡Hola! Vi su página web de ChePilot y me interesa crear una landing page para mi restaurante. ¿Podrían ayudarme?'
);

const whatsappUrl = `https://wa.me/5491123456789?text=${whatsappMessage}`;

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Show tooltip after button appears
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 1000);

      // Hide tooltip after 5 seconds
      const hideTooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 6000);

      return () => {
        clearTimeout(tooltipTimer);
        clearTimeout(hideTooltipTimer);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <div className="bg-white rounded-lg shadow-xl border p-4 max-w-xs relative">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-1">
                    ¿Necesitás ayuda?
                  </p>
                  <p className="text-xs text-gray-600">
                    Escribinos por WhatsApp y te respondemos al instante 💬
                  </p>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <Button
          size="lg"
          className="w-14 h-14 rounded-full whatsapp-btn text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          <MessageCircle className="h-6 w-6" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></div>
        </Button>

        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
          <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
