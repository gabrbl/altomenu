
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, TrendingUp, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    icon: TrendingUp,
    number: '500+',
    label: 'Restaurantes Activos',
    description: 'Confían en ChePilot'
  },
  {
    icon: Clock,
    number: '2.8M',
    label: 'Menús Actualizados',
    description: 'Por WhatsApp este año'
  },
  {
    icon: Star,
    number: '138%',
    label: 'Aumento Promedio',
    description: 'En ventas online'
  },
  {
    icon: Shield,
    number: '99.9%',
    label: 'Uptime Garantizado',
    description: 'Tu página siempre online'
  }
];

const testimonialLogos = [
  'La Parrilla del Tano',
  'Nonna Pizza',
  'Empanadas del Norte',
  'Café Central',
  'Burger Express',
  'Pasta & Basta'
];

export default function TrustBar() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding bg-muted/30">
      <div className="container">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center card-hover">
                <CardContent className="p-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="font-semibold mb-1">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-8">
            Restaurantes de toda Argentina confían en ChePilot
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {testimonialLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 0.6, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {logo}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center space-x-2 mt-8"
          >
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.9/5 promedio en satisfacción del cliente
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
