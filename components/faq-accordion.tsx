
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Script from 'next/script';

const faqs = [
  {
    id: 'implementacion',
    question: '¿Cuánto tarda la implementación de mi página?',
    answer: 'Tu página estará lista en 3-5 días hábiles. El proceso incluye: análisis de tu menú actual, diseño personalizado, configuración del sistema de WhatsApp, y pruebas finales. Una vez aprobada, queda online inmediatamente.'
  },
  {
    id: 'whatsapp-funcionamiento',
    question: '¿Cómo funciona exactamente la actualización por WhatsApp?',
    answer: 'Es muy simple. Enviás mensajes como "Agregar Milanesa Napolitana $8500" o "Cambiar precio Empanadas $1200" a nuestro número. Nuestro sistema procesa automáticamente tu mensaje y actualiza el menú en tu página en menos de 30 segundos.'
  },
  {
    id: 'costos-adicionales',
    question: '¿Hay costos adicionales o sorpresas?',
    answer: 'No. El precio mensual incluye hosting, SSL, actualizaciones, soporte, y todas las funcionalidades del plan. Solo pagás extras si pedís servicios adicionales como fotografía profesional o diseño personalizado.'
  },
  {
    id: 'conocimientos-tecnicos',
    question: '¿Necesito conocimientos técnicos?',
    answer: 'Para nada. Si sabés usar WhatsApp, ya sabés usar ChePilot. Nos encargamos de toda la parte técnica. Vos solo te enfocás en tu restaurante, nosotros en que tu página funcione perfecta.'
  },
  {
    id: 'cambiar-plan',
    question: '¿Puedo cambiar de plan después?',
    answer: 'Sí, podés cambiar de plan en cualquier momento. Si upgradeas, pagás la diferencia prorrateada. Si downgradeas, el cambio se aplica en tu próximo período de facturación.'
  },
  {
    id: 'garantia',
    question: '¿Qué incluye la garantía de 30 días?',
    answer: 'Si no estás 100% satisfecho en los primeros 30 días, te devolvemos todo el dinero. Sin preguntas, sin vueltas. Queremos que estés completamente feliz con tu inversión.'
  },
  {
    id: 'integraciones',
    question: '¿Se integra con PedidosYa, Rappi y otras apps?',
    answer: 'Sí, en los planes Pro y Premium incluimos integración con las principales apps de delivery. También podemos conectar con tu sistema de gestión actual si tenés uno.'
  },
  {
    id: 'dominio-propio',
    question: '¿Puedo usar mi dominio propio?',
    answer: 'Sí, desde el plan Pro podés usar tu dominio personalizado (ejemplo: turestaurante.com). Te ayudamos con toda la configuración técnica sin costo adicional.'
  },
  {
    id: 'soporte',
    question: '¿Qué tipo de soporte ofrecen?',
    answer: 'Plan Starter: soporte por chat. Plan Pro: soporte prioritario con respuesta en menos de 2 horas. Plan Premium: soporte 24/7 y account manager dedicado. Siempre en español, siempre por gente real.'
  },
  {
    id: 'actualizaciones-simultaneas',
    question: '¿Puedo actualizar múltiples sucursales a la vez?',
    answer: 'En el plan Premium sí. Con un solo mensaje actualizás el menú en todas tus sucursales. Perfect para cadenas y franquicias que necesitan consistencia en precios y productos.'
  },
  {
    id: 'backup-datos',
    question: '¿Qué pasa con mis datos si cancelo?',
    answer: 'Todos tus datos quedan respaldados por 90 días después de la cancelación. Te enviamos una copia completa de tu menú y estadísticas. También podés exportar todo antes de cancelar.'
  },
  {
    id: 'tipos-restaurante',
    question: '¿Funciona para cualquier tipo de restaurante?',
    answer: 'Sí, tenemos plantillas optimizadas para parrillas, pizzerías, cafeterías, food trucks, heladerías, delivery, empanaderías y restaurantes gourmet. Si tenés algo específico, también hacemos diseños personalizados.'
  }
];

const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent('Hola! Tengo una consulta que no está en el FAQ.')}`;

// Schema.org structured data for FAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQAccordion() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div ref={ref} className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Todas las respuestas que necesitás para tomar la mejor decisión
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    >
                      <AccordionItem value={faq.id}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-primary/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">¿No encontrás tu respuesta?</h3>
              <p className="text-muted-foreground mb-6">
                Escribinos por WhatsApp y te respondemos al instante
              </p>
              <Button
                size="lg"
                className="whatsapp-btn text-white"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Hacer Consulta por WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
