
import Header from '@/components/header';
import Hero from '@/components/hero';
import BenefitsGrid from '@/components/benefits-grid';
import DemoMenuWidget from '@/components/demo-menu-widget';
import PricingTable from '@/components/pricing-table';
import TrustBar from '@/components/trust-bar';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChePilot | Landing Pages que Venden Más para Restaurantes',
  description: 'Creamos landing pages gastronómicas con menús actualizables por WhatsApp. Tu restaurante online en días, no meses. Desde $25.000/mes.',
  openGraph: {
    title: 'ChePilot | Landing Pages que Venden Más',
    description: 'Landing pages gastronómicas con menús actualizables por WhatsApp',
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main>
        <Hero />
        <BenefitsGrid />
        <DemoMenuWidget />
        <PricingTable />
        <TrustBar />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
