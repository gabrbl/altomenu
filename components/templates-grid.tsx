
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter,
  ExternalLink,
  MessageCircle,
  UtensilsCrossed,
  Coffee,
  Pizza,
  Truck,
  IceCream
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  demoUrl: string;
  popular?: boolean;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'La Parrilla Moderna',
    category: 'parrilla',
    image: 'https://cdn.abacus.ai/images/1c7e1864-6831-4eb6-a698-f521c9be5c45.png',
    description: 'Diseño elegante para parrillas premium con focus en cortes de carne',
    features: ['Galería de cortes', 'Reservas online', 'Carta de vinos'],
    demoUrl: '/demo/parrilla',
    popular: true
  },
  {
    id: '2',
    name: 'Nonna Pizzería',
    category: 'pizzeria',
    image: 'https://cdn.abacus.ai/images/24af1369-8412-47e1-846e-a9606d239409.png',
    description: 'Estilo tradicional italiano con horno a leña y masa madre',
    features: ['Constructor pizzas', 'Delivery integrado', 'Promociones'],
    demoUrl: '/demo/pizzeria'
  },
  {
    id: '3',
    name: 'Café Boutique',
    category: 'cafe',
    image: 'https://cdn.abacus.ai/images/ec7f9fb1-ea73-4f53-8a85-3f4d3d9a8756.png',
    description: 'Ambiente acogedor para cafeterías de especialidad y brunch',
    features: ['Menú digital', 'Wi-Fi info', 'Eventos'],
    demoUrl: '/demo/cafe'
  },
  {
    id: '4',
    name: 'Food Truck Express',
    category: 'food-truck',
    image: 'https://cdn.abacus.ai/images/c26007df-f596-4976-bc79-9c3aa99412da.png',
    description: 'Diseño mobile-first para food trucks con ubicación GPS',
    features: ['Ubicación live', 'Horarios', 'Pre-pedidos'],
    demoUrl: '/demo/food-truck',
    popular: true
  },
  {
    id: '5',
    name: 'Delivery Master',
    category: 'delivery',
    image: 'https://cdn.abacus.ai/images/3ef1317e-3162-4116-8bd4-96fda0d0da16.png',
    description: 'Optimizado para delivery con integración múltiples apps',
    features: ['Multi-delivery', 'Tracking pedidos', 'Promociones'],
    demoUrl: '/demo/delivery'
  },
  {
    id: '6',
    name: 'Empanadas Tradicionales',
    category: 'empanadas',
    image: 'https://cdn.abacus.ai/images/3c21179c-8b98-4343-958c-ac3604bb309b.png',
    description: 'Diseño regional con tradición familiar y recetas ancestrales',
    features: ['Recetas familia', 'Variedades', 'Catering'],
    demoUrl: '/demo/empanadas'
  },
  {
    id: '7',
    name: 'Heladería Artesanal',
    category: 'heladeria',
    image: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/IOZSXJBPD5DTLLZQOHBGN6N7HI.jpg',
    description: 'Colores vibrantes para heladerías con sabores artesanales',
    features: ['Sabores temporada', 'Tortas heladas', 'Descuentos'],
    demoUrl: '/demo/heladeria'
  },
  {
    id: '8',
    name: 'Restaurante Fino',
    category: 'restaurante',
    image: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/RK4XWYR5E5DZJND5MA3RQYNDV4.jpg',
    description: 'Diseño sofisticado para restaurantes de alta cocina',
    features: ['Menú degustación', 'Maridajes', 'Chef\'s table'],
    demoUrl: '/demo/restaurante'
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: Filter, count: templates.length },
  { id: 'parrilla', name: 'Parrillas', icon: UtensilsCrossed, count: templates.filter(t => t.category === 'parrilla').length },
  { id: 'pizzeria', name: 'Pizzerías', icon: Pizza, count: templates.filter(t => t.category === 'pizzeria').length },
  { id: 'cafe', name: 'Cafeterías', icon: Coffee, count: templates.filter(t => t.category === 'cafe').length },
  { id: 'food-truck', name: 'Food Trucks', icon: Truck, count: templates.filter(t => t.category === 'food-truck').length },
  { id: 'delivery', name: 'Delivery', icon: ExternalLink, count: templates.filter(t => t.category === 'delivery').length },
  { id: 'empanadas', name: 'Empanadas', icon: UtensilsCrossed, count: templates.filter(t => t.category === 'empanadas').length },
  { id: 'heladeria', name: 'Heladerías', icon: IceCream, count: templates.filter(t => t.category === 'heladeria').length },
  { id: 'restaurante', name: 'Restaurantes', icon: UtensilsCrossed, count: templates.filter(t => t.category === 'restaurante').length }
];

const whatsappMessage = encodeURIComponent(
  'Hola! Me interesa la plantilla [TEMPLATE] que vi en su sitio. ¿Podrían darme más información?'
);

export default function TemplatesGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const getWhatsAppUrl = (templateName: string) => {
    const message = whatsappMessage.replace('[TEMPLATE]', templateName);
    return `https://wa.me/5491123456789?text=${message}`;
  };

  return (
    <div ref={ref} className="container">
      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span className="font-medium">{category.name}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="card-hover group relative overflow-hidden h-full">
              {template.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                </div>
              )}

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="space-x-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-black hover:bg-white"
                      onClick={() => window.open(getWhatsAppUrl(template.name), '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Demo
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {template.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => window.open(getWhatsAppUrl(template.name), '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Demo Live
                  </Button>
                  <Button
                    className="w-full whatsapp-btn text-white"
                    onClick={() => window.open(getWhatsAppUrl(template.name), '_blank')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Quiero Esta Plantilla
                  </Button>
                </div>
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
        <div className="bg-muted/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">¿No encontrás lo que buscás?</h3>
          <p className="text-muted-foreground mb-6">
            Creamos diseños 100% personalizados para tu marca y necesidades específicas
          </p>
          <Button
            size="lg"
            className="whatsapp-btn text-white"
            onClick={() => window.open(`https://wa.me/5491123456789?text=${encodeURIComponent('Hola! Necesito un diseño personalizado para mi restaurante.')}`, '_blank')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar Diseño Personalizado
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
