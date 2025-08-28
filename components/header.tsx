
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageCircle, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Cómo Funciona', href: '/como-funciona' },
  { name: 'Planes', href: '/planes' },
  { name: 'Plantillas', href: '/plantillas' },
  { name: 'Casos', href: '/casos' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contacto', href: '/contacto' },
];

const whatsappMessage = encodeURIComponent(
  '¡Hola! Me interesa crear una landing page para mi restaurante. ¿Podrían darme más información?'
);

const whatsappUrl = `https://wa.me/5491123456789?text=${whatsappMessage}`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">ChePilot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/contacto">Demo Gratis</Link>
            </Button>
            <Button 
              size="sm" 
              className="whatsapp-btn text-white"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex items-center space-x-2 mb-8">
                <div className="p-2 bg-primary rounded-lg">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">ChePilot</span>
              </div>

              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                      Demo Gratis
                    </Link>
                  </Button>
                  <Button 
                    className="w-full whatsapp-btn text-white"
                    onClick={() => {
                      window.open(whatsappUrl, '_blank');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
}
