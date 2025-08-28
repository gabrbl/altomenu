
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import PricingTable from '@/components/pricing-table';
import InteractiveUpsells from '@/components/interactive-upsells';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, TrendingUp, Shield, Clock, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planes y Precios | Landing Pages Gastronómicas | ChePilot',
  description: 'Planes desde $25.000/mes. Starter, Pro y Premium. Landing pages gastronómicas con menús por WhatsApp. Sin setup, sin complicaciones.',
  openGraph: {
    title: 'Planes y Precios | ChePilot',
    description: 'Planes desde $25.000/mes con menús por WhatsApp',
  }
};

const features = [
  {
    icon: Zap,
    title: 'Implementación Express',
    description: 'Tu página lista en 3-5 días hábiles'
  },
  {
    icon: Users,
    title: 'Soporte Dedicado',
    description: 'Atención personalizada por WhatsApp'
  },
  {
    icon: TrendingUp,
    title: 'Analytics Incluidos',
    description: 'Reportes mensuales de rendimiento'
  },
  {
    icon: Shield,
    title: 'Hosting Seguro',
    description: 'SSL, backups y 99.9% uptime'
  },
  {
    icon: Clock,
    title: 'Actualizaciones 24/7',
    description: 'Menú editable cualquier día y hora'
  },
  {
    icon: Award,
    title: 'Garantía Total',
    description: '30 días de garantía o te devolvemos el dinero'
  }
];

const upsells = [
  {
    title: 'Fotografía Profesional',
    description: 'Sesión de fotos para tus platos más vendidos',
    price: 'Desde $45.000',
    badge: 'Popular'
  },
  {
    title: 'Campaña Google Ads',
    description: 'Setup + gestión del primer mes gratis',
    price: 'Desde $60.000/mes',
    badge: 'Recomendado'
  },
  {
    title: 'App Móvil Nativa',
    description: 'Tu app en Google Play y App Store',
    price: 'Desde $180.000',
    badge: 'Premium'
  },
  {
    title: 'Sistema de Reservas',
    description: 'Reservas online integradas a tu web',
    price: 'Desde $25.000/mes',
    badge: null
  }
];

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Elegí tu <span className="text-gradient">Plan Perfecto</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Desde páginas básicas hasta soluciones completas. Sin contratos, sin letra chica.
            </p>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="section-padding">
          <PricingTable />
        </section>

        {/* Features Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Todo Incluido</h2>
              <p className="text-xl text-muted-foreground">
                Lo que necesitás para vender más, sin sorpresas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit mx-auto">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upsells Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Potenciá tu Restaurante</h2>
              <p className="text-xl text-muted-foreground">
                Servicios adicionales para llevar tu negocio al siguiente nivel
              </p>
            </div>

            <InteractiveUpsells upsells={upsells} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Puedo cambiar de plan después?</h3>
                  <p className="text-muted-foreground">
                    Sí, podés cambiar de plan en cualquier momento. Si upgradeas, pagás la diferencia prorrateada. Si downgradeas, el cambio se aplica en el siguiente período.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Hay costos de setup?</h3>
                  <p className="text-muted-foreground">
                    No. Todo está incluido en el precio mensual. Solo pagás cuando tu página esté lista y funcionando.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Qué pasa si no estoy satisfecho?</h3>
                  <p className="text-muted-foreground">
                    Tenés 30 días de garantía completa. Si no te gusta, te devolvemos el 100% del dinero.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Necesito conocimientos técnicos?</h3>
                  <p className="text-muted-foreground">
                    Para nada. Solo necesitás saber usar WhatsApp. Nosotros nos encargamos de todo lo técnico.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
