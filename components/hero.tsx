
'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const whatsappMessage = encodeURIComponent(
  '¡Hola! Vi su página y me interesa crear una landing page para mi restaurante. ¿Podrían darme más información sobre los planes?'
);

const whatsappUrl = `https://wa.me/5491123456789?text=${whatsappMessage}`;

export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              +500 restaurantes ya confían en nosotros
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Landing pages que{' '}
              <span className="text-gradient">venden más</span>.{' '}
              <br />
              Menús que se actualizan por{' '}
              <span className="text-gradient">WhatsApp</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Creamos tu web en días y te damos un menú online editable desde tu chat. 
              Sin complicaciones técnicas, sin actualizaciones manuales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button
                size="lg"
                className="whatsapp-btn text-white px-8 py-6 text-lg group"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Quiero mi Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-white group"
              >
                <Link href="/planes" className="flex items-center">
                  Ver Planes
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center text-sm text-muted-foreground"
            >
              <span className="flex items-center mr-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Sin setup inicial
              </span>
              <span className="flex items-center mr-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                30 días garantía
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Desde $25.000/mes
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/7cf49a89-38f2-4008-86e4-ce0824236eef.png"
                alt="Landing page gastronómica con menú por WhatsApp"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay with Play Button */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                  onClick={() => window.open('/como-funciona', '_blank')}
                >
                  <Play className="h-6 w-6 text-primary ml-1" />
                </motion.button>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border"
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-semibold text-sm">Actualización instantánea</p>
                  <p className="text-xs text-muted-foreground">Por WhatsApp en segundos</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">+150%</p>
                <p className="text-xs text-muted-foreground">Aumento promedio</p>
                <p className="text-xs text-muted-foreground">en ventas online</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
