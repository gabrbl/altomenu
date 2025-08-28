
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import LeadForm from '@/components/lead-form';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | ChePilot | Hablemos de tu Restaurante',
  description: 'Contactanos para crear la landing page perfecta para tu restaurante. WhatsApp, formulario o presencial en Buenos Aires.',
  openGraph: {
    title: 'Contacto | ChePilot',
    description: 'Hablemos de tu restaurante',
  }
};

const contactInfo = [
  {
    icon: Phone,
    title: 'WhatsApp',
    details: '+54 9 11 2345-6789',
    action: 'Escribinos ahora'
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'contacto@chepilot.com',
    action: 'Envianos un mail'
  },
  {
    icon: MapPin,
    title: 'Oficina',
    details: 'Av. Corrientes 1234, CABA',
    action: 'Visitanos'
  },
  {
    icon: Clock,
    title: 'Horarios',
    details: 'Lun a Vie 9:00 - 18:00hs',
    action: 'Horario de atención'
  }
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Hablemos de tu <span className="text-gradient">Restaurante</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Contanos sobre tu negocio y te armamos una propuesta personalizada
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Solicitar Demo Gratis</h2>
                <p className="text-muted-foreground mb-8">
                  Completá el formulario y nos pondremos en contacto en menos de 2 horas hábiles.
                </p>
                <LeadForm />
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Otras Formas de Contacto</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                            <p className="text-muted-foreground mb-2">{info.details}</p>
                            <p className="text-primary text-sm font-medium">{info.action}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-4">Respuesta Garantizada</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">&lt; 2hs</div>
                      <p className="text-sm text-muted-foreground">Tiempo de respuesta</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <p className="text-sm text-muted-foreground">Consultas respondidas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas Rápidas</h2>
              <p className="text-muted-foreground">
                Las consultas más comunes antes de contratar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Cuánto tarda la implementación?</h3>
                  <p className="text-muted-foreground">
                    Entre 3 y 5 días hábiles tenés tu página funcionando con menú por WhatsApp.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Qué necesito para empezar?</h3>
                  <p className="text-muted-foreground">
                    Solo tu menú actual, algunas fotos y 20 minutos para una llamada de onboarding.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Funciona para delivery?</h3>
                  <p className="text-muted-foreground">
                    Sí, podemos integrar con PedidosYa, Rappi o tu sistema de delivery propio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">¿Hay garantía?</h3>
                  <p className="text-muted-foreground">
                    30 días de garantía total. Si no estás conforme, te devolvemos el 100% del dinero.
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
