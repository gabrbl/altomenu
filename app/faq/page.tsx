
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import FAQAccordion from '@/components/faq-accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Preguntas Frecuentes | ChePilot',
  description: 'Todas las respuestas sobre landing pages gastronómicas, menús por WhatsApp, precios y más. Resolvé todas tus dudas.',
  openGraph: {
    title: 'FAQ | Preguntas Frecuentes | ChePilot',
    description: 'Todas las respuestas sobre ChePilot',
  }
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Todo lo que necesitás saber sobre ChePilot y nuestros servicios
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <FAQAccordion />
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
