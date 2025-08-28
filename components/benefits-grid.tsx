
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  Smartphone 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const benefits = [
  {
    icon: MessageCircle,
    title: 'Actualización por WhatsApp',
    description: 'Modificá precios, agregá platos o quitá items agotados con un simple mensaje',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Zap,
    title: 'Implementación Express',
    description: 'Tu página lista en 3-5 días. Sin demoras, sin vueltas, sin complicaciones',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    icon: TrendingUp,
    title: 'Más Ventas Garantizadas',
    description: 'Páginas optimizadas para conversión. Nuestros clientes aumentan ventas 150% promedio',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Shield,
    title: 'SEO Local Incluido',
    description: 'Aparecer primero en Google cuando busquen restaurantes en tu zona',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Clock,
    title: 'Carga Súper Rápida',
    description: 'Páginas que cargan en menos de 2 segundos. Tus clientes no esperan, compran',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: Smartphone,
    title: 'Mobile Perfect',
    description: 'Perfecta en celular, tablet y desktop. 80% de tus clientes navegan desde el móvil',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10'
  }
];

export default function BenefitsGrid() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Todo lo que necesitás para{' '}
            <span className="text-gradient">vender más</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No es solo una página web. Es tu herramienta de ventas más poderosa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardContent className="p-6">
                  <div className={`p-3 rounded-lg w-fit mb-4 ${benefit.bgColor}`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Más de <span className="font-semibold text-primary">500 restaurantes</span> ya 
            confían en ChePilot
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-sm font-medium">La Parrilla del Tano</span>
            <span className="text-sm font-medium">Nonna Pizza</span>
            <span className="text-sm font-medium">Empanadas del Norte</span>
            <span className="text-sm font-medium">Café Central</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
