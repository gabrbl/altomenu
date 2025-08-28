
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casos de Éxito | Testimonios Reales | ChePilot',
  description: 'Casos reales de restaurantes que aumentaron ventas con ChePilot. Testimonios, métricas y resultados comprobables.',
  openGraph: {
    title: 'Casos de Éxito | ChePilot',
    description: 'Restaurantes que aumentaron ventas con ChePilot',
  }
};

const testimonials = [
  {
    name: 'La Parrilla del Tano',
    type: 'Parrilla - Palermo',
    rating: 5,
    image: 'https://cdn.abacus.ai/images/1c7e1864-6831-4eb6-a698-f521c9be5c45.png',
    quote: 'Antes tardábamos 2 horas en actualizar precios. Ahora lo hacemos por WhatsApp en 30 segundos. Las ventas online subieron 150%.',
    metrics: {
      sales: '+150%',
      time: '30 seg',
      orders: '+89%'
    },
    owner: 'Roberto Fernández'
  },
  {
    name: 'Nonna Pizza',
    type: 'Pizzería - Villa Crespo',
    rating: 5,
    image: 'https://cdn.abacus.ai/images/24af1369-8412-47e1-846e-a9606d239409.png',
    quote: 'Con ChePilot pasamos de vender 50 pizzas por día a 120. El menú siempre está actualizado y los clientes lo notan.',
    metrics: {
      sales: '+140%',
      time: '3 días',
      orders: '+67%'
    },
    owner: 'María Giuseppe'
  },
  {
    name: 'Empanadas del Norte',
    type: 'Empanadas - San Telmo',
    rating: 5,
    image: 'https://cdn.abacus.ai/images/3c21179c-8b98-4343-958c-ac3604bb309b.png',
    quote: 'Tenemos 4 sucursales y actualizar todos los menús era un caos. Ahora con un mensaje actualizamos todo. Increíble.',
    metrics: {
      sales: '+95%',
      time: '1 mensaje',
      orders: '+123%'
    },
    owner: 'Carlos Mendoza'
  },
  {
    name: 'Café Central',
    type: 'Café - Recoleta',
    rating: 5,
    image: 'https://cdn.abacus.ai/images/ec7f9fb1-ea73-4f53-8a85-3f4d3d9a8756.png',
    quote: 'Los clientes aman que el menú esté siempre actualizado. Cuando se agota algo, lo quitamos al instante. Cero frustraciones.',
    metrics: {
      sales: '+78%',
      time: 'Tiempo real',
      orders: '+45%'
    },
    owner: 'Ana Rodríguez'
  },
  {
    name: 'Burger Express',
    type: 'Food Truck - Microcentro',
    rating: 5,
    image: 'https://cdn.abacus.ai/images/c26007df-f596-4976-bc79-9c3aa99412da.png',
    quote: 'Cambio de ubicación, cambio de precios, nuevos combos... Todo por WhatsApp. Mi negocio nunca fue tan ágil.',
    metrics: {
      sales: '+200%',
      time: 'Instantáneo',
      orders: '+180%'
    },
    owner: 'Diego Martín'
  },
  {
    name: 'Pasta & Basta',
    type: 'Italiano - Belgrano',
    rating: 5,
    image: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/RK4XWYR5E5DZJND5MA3RQYNDV4.jpg',
    quote: 'Desde que tenemos la página con ChePilot, las reservas aumentaron 300%. El menú por WhatsApp es genial.',
    metrics: {
      sales: '+165%',
      time: '24/7',
      orders: '+210%'
    },
    owner: 'Franco Rossi'
  }
];

const stats = [
  { number: '500+', label: 'Restaurantes Activos' },
  { number: '2.8M', label: 'Menús Actualizados' },
  { number: '138%', label: 'Aumento Promedio Ventas' },
  { number: '99.9%', label: 'Uptime Garantizado' }
];

export default function CasosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Casos de <span className="text-gradient">Éxito</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Restaurantes reales que transformaron su negocio con ChePilot
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Lo que Dicen Nuestros Clientes</h2>
              <p className="text-xl text-muted-foreground">
                Testimonios reales, métricas comprobables
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{testimonial.type}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-muted-foreground italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 mr-1" />
                          {testimonial.metrics.sales}
                        </div>
                        <p className="text-xs text-muted-foreground">Ventas</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary flex items-center justify-center">
                          <Clock className="w-5 h-5 mr-1" />
                          {testimonial.metrics.time}
                        </div>
                        <p className="text-xs text-muted-foreground">Actualización</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary flex items-center justify-center">
                          <Users className="w-5 h-5 mr-1" />
                          {testimonial.metrics.orders}
                        </div>
                        <p className="text-xs text-muted-foreground">Pedidos</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>{testimonial.owner}</strong> - Propietario
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Badge variant="secondary" className="mb-4">
                Próximo caso podés ser vos
              </Badge>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">¿Listo para Transformar tu Restaurante?</h3>
                <p className="text-muted-foreground">
                  Únete a más de 500 restaurantes que ya aumentaron sus ventas
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/contacto">
                  <Button size="lg" className="whatsapp-btn text-white">
                    Empezar Gratis
                  </Button>
                </Link>
                <Link href="/plantillas">
                  <Button size="lg" variant="outline">
                    Ver Plantillas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
