
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Utensils, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone,
  Instagram,
  Linkedin
} from 'lucide-react';

const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent('Hola! Me gustaría conocer más sobre ChePilot.')}`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ChePilot</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              La plataforma líder en Argentina para landing pages gastronómicas 
              con menús actualizables por WhatsApp. Más de 500 restaurantes ya confían en nosotros.
            </p>
            <Button 
              className="whatsapp-btn text-white"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Empezar Gratis
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <Link href="/como-funciona" className="block text-muted-foreground hover:text-primary transition-colors">
                Cómo Funciona
              </Link>
              <Link href="/planes" className="block text-muted-foreground hover:text-primary transition-colors">
                Planes y Precios
              </Link>
              <Link href="/plantillas" className="block text-muted-foreground hover:text-primary transition-colors">
                Plantillas
              </Link>
              <Link href="/casos" className="block text-muted-foreground hover:text-primary transition-colors">
                Casos de Éxito
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+54 9 11 2345-6789</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contacto@chepilot.com</span>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">Av. Corrientes 1234<br />CABA, Argentina</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 mt-6">
              <button 
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                onClick={() => window.open('https://instagram.com/chepilot', '_blank')}
              >
                <Instagram className="h-4 w-4" />
              </button>
              <button 
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                onClick={() => window.open('https://linkedin.com/company/chepilot', '_blank')}
              >
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} ChePilot. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-xs text-muted-foreground">
                Hecho con ❤️ en Buenos Aires
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
