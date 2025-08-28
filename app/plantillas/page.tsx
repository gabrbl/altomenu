
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import TemplatesGrid from '@/components/templates-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plantillas | Demos por Rubro | ChePilot',
  description: 'Mirá nuestras plantillas por rubro: parrillas, pizzerías, cafeterías, delivery y más. Diseños gastronómicos que convierten.',
  openGraph: {
    title: 'Plantillas | Demos por Rubro | ChePilot',
    description: 'Plantillas gastronómicas que convierten por rubro',
  }
};

export default function PlantillasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Plantillas por <span className="text-gradient">Rubro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Diseños probados que convierten. Optimizados para cada tipo de negocio gastronómico.
            </p>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="section-padding">
          <TemplatesGrid />
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
