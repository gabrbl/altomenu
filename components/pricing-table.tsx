
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  MessageCircle, 
  Star,
  Zap,
  Crown,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const whatsappMessage = encodeURIComponent(
  '¡Hola! Me interesa el plan [PLAN] de ChePilot. ¿Podrían darme más información?'
);

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  icon: typeof Zap;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge?: string;
  color: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    icon: Zap,
    description: 'Para empezar a vender online',
    monthlyPrice: 25000,
    yearlyPrice: 20000,
    color: 'blue',
    features: [
      { text: 'Landing page optimizada', included: true },
      { text: 'Menú por WhatsApp', included: true },
      { text: 'Hosting incluido', included: true },
      { text: 'SSL y seguridad', included: true },
      { text: 'Soporte por chat', included: true },
      { text: 'Hasta 50 productos', included: true },
      { text: 'Analytics básicos', included: false },
      { text: 'Integración delivery', included: false },
      { text: 'Dominio personalizado', included: false },
      { text: 'Reservas online', included: false }
    ]
  },
  {
    name: 'Pro',
    icon: Star,
    description: 'Para restaurantes en crecimiento',
    monthlyPrice: 45000,
    yearlyPrice: 36000,
    badge: 'Más Popular',
    color: 'primary',
    popular: true,
    features: [
      { text: 'Todo del plan Starter', included: true },
      { text: 'Analytics avanzados', included: true },
      { text: 'Integración delivery', included: true },
      { text: 'Dominio personalizado', included: true },
      { text: 'Hasta 200 productos', included: true },
      { text: 'Fotos profesionales (5)', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Reservas online', included: false },
      { text: 'App móvil', included: false },
      { text: 'Multi-sucursal', included: false }
    ]
  },
  {
    name: 'Premium',
    icon: Crown,
    description: 'Para cadenas y franquicias',
    monthlyPrice: 75000,
    yearlyPrice: 60000,
    badge: 'Completo',
    color: 'purple',
    features: [
      { text: 'Todo del plan Pro', included: true },
      { text: 'Reservas online', included: true },
      { text: 'App móvil nativa', included: true },
      { text: 'Multi-sucursal', included: true },
      { text: 'Productos ilimitados', included: true },
      { text: 'Fotos profesionales (20)', included: true },
      { text: 'Soporte 24/7', included: true },
      { text: 'Gestión de inventario', included: true },
      { text: 'Reportes personalizados', included: true },
      { text: 'Account manager dedicado', included: true }
    ]
  }
];

export default function PricingTable() {
  const [isYearly, setIsYearly] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getWhatsAppUrl = (planName: string) => {
    const message = whatsappMessage.replace('[PLAN]', planName);
    return `https://wa.me/5491123456789?text=${message}`;
  };

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Planes que se adaptan a tu{' '}
            <span className="text-gradient">Restaurante</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Desde páginas básicas hasta soluciones enterprise. Sin contratos anuales obligatorios.
          </p>

          {/* Yearly/Monthly Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Mensual
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Anual
            </span>
            <Badge variant="secondary" className="ml-2">
              20% OFF
            </Badge>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card 
                className={`relative h-full card-hover ${
                  plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      className={`px-4 py-1 ${
                        plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`p-3 rounded-lg w-fit mx-auto mb-4 ${
                    plan.color === 'primary' ? 'bg-primary/10' :
                    plan.color === 'purple' ? 'bg-purple-500/10' : 'bg-blue-500/10'
                  }`}>
                    <plan.icon className={`h-8 w-8 ${
                      plan.color === 'primary' ? 'text-primary' :
                      plan.color === 'purple' ? 'text-purple-500' : 'text-blue-500'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-bold">
                        {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                      </span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {formatPrice(plan.yearlyPrice * 12)} facturado anualmente
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check 
                          className={`h-4 w-4 ${
                            feature.included ? 'text-green-500' : 'text-gray-300'
                          }`} 
                        />
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 text-lg ${
                      plan.popular 
                        ? 'whatsapp-btn text-white' 
                        : 'border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => window.open(getWhatsAppUrl(plan.name), '_blank')}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {plan.popular ? 'Empezar Ahora' : 'Consultar Plan'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Sin setup • 30 días garantía • Cancela cuando quieras
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-primary/5 rounded-xl p-8 max-w-4xl mx-auto">
            <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">¿Necesitás algo personalizado?</h3>
            <p className="text-muted-foreground mb-6">
              Para cadenas grandes, franquicias o requerimientos especiales, 
              armamos una solución a medida.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => window.open(`https://wa.me/5491123456789?text=${encodeURIComponent('Hola! Necesito una solución personalizada para mi cadena de restaurantes.')}`, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar con Ventas
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
