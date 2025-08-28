
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Smartphone, Globe, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo Funciona | Menús por WhatsApp | ChePilot',
  description: 'Descubrí cómo actualizás tu menú online en segundos por WhatsApp. Sistema simple de 3 pasos para restaurantes.',
  openGraph: {
    title: 'Cómo Funciona | Menús por WhatsApp | ChePilot',
    description: 'Actualizá tu menú online en segundos por WhatsApp',
  }
};

const steps = [
  {
    icon: MessageCircle,
    title: 'Escribís por WhatsApp',
    description: 'Enviás un mensaje simple como "Agregar Milanesa Napolitana $8500" o "Cambiar precio Empanadas $1200"',
    image: 'https://cdn.abacus.ai/images/26ccb623-97fe-4f06-8d74-2490f7e585e9.png'
  },
  {
    icon: Smartphone,
    title: 'Sistema Actualiza',
    description: 'Nuestro sistema procesa tu mensaje automáticamente y actualiza el menú en tiempo real',
    image: 'https://cdn.abacus.ai/images/254ea679-4566-449b-b746-08a737f8f0f1.png'
  },
  {
    icon: Globe,
    title: 'Cliente Ve el Cambio',
    description: 'Tu cliente ve el menú actualizado al instante en tu página web, sin demoras ni complicaciones',
    image: 'https://cdn.abacus.ai/images/7cf49a89-38f2-4008-86e4-ce0824236eef.png'
  }
];

const commands = [
  { command: 'Agregar Milanesa Napolitana $8500', action: 'Agrega un nuevo plato al menú' },
  { command: 'Cambiar precio Empanadas $1200', action: 'Modifica el precio de un plato existente' },
  { command: 'Eliminar Pizza Margherita', action: 'Quita un plato del menú' },
  { command: 'Disponible Asado Tira $12000', action: 'Marca un plato como disponible con precio' },
  { command: 'No disponible Pescado del día', action: 'Marca un plato como no disponible' },
  { command: 'Categoría Entrada Provoleta $3500', action: 'Asigna categoría a un plato' },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Actualizá tu menú en <span className="text-gradient">3 segundos</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Sin complicaciones técnicas. Sin ingresar a paneles. Solo WhatsApp.
            </p>
            <Link href="/planes">
              <Button size="lg" className="whatsapp-btn text-white px-8 py-6 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ver Planes
              </Button>
            </Link>
          </div>
        </section>

        {/* Steps Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Así de Simple</h2>
              <p className="text-xl text-muted-foreground">
                Tres pasos para tener tu menú siempre actualizado
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden card-hover">
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{index + 1}</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commands Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Comandos Disponibles</h2>
              <p className="text-xl text-muted-foreground">
                Estos son algunos ejemplos de mensajes que podés enviar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {commands.map((item, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-sm bg-muted p-3 rounded-lg mb-2">
                          "{item.command}"
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {item.action}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                ¿Querés ver cómo funciona en tu restaurante?
              </p>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Solicitar Demo Gratis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
