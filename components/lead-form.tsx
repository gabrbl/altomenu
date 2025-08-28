
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  UtensilsCrossed,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  restaurantName: string;
  restaurantType: string;
  location: string;
  currentSite: string;
  budget: string;
  timeline: string;
  message: string;
  acceptsWhatsApp: boolean;
  acceptsTerms: boolean;
}

const restaurantTypes = [
  { value: 'parrilla', label: '🥩 Parrilla' },
  { value: 'pizzeria', label: '🍕 Pizzería' },
  { value: 'cafe', label: '☕ Café/Cafetería' },
  { value: 'empanadas', label: '🥟 Empanadas' },
  { value: 'delivery', label: '🛵 Solo Delivery' },
  { value: 'food-truck', label: '🚚 Food Truck' },
  { value: 'heladeria', label: '🍨 Heladería' },
  { value: 'restaurante', label: '🍽️ Restaurante' },
  { value: 'otro', label: '📋 Otro' }
];

const budgetRanges = [
  { value: 'starter', label: 'Starter - $25.000/mes' },
  { value: 'pro', label: 'Pro - $45.000/mes' },
  { value: 'premium', label: 'Premium - $75.000/mes' },
  { value: 'custom', label: 'Necesito algo personalizado' },
  { value: 'no-sure', label: 'No estoy seguro' }
];

const timeframes = [
  { value: 'urgent', label: 'Lo antes posible (esta semana)' },
  { value: 'soon', label: 'En las próximas 2 semanas' },
  { value: 'month', label: 'En el próximo mes' },
  { value: 'planning', label: 'Solo estoy evaluando' }
];

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    restaurantName: '',
    restaurantType: '',
    location: '',
    currentSite: '',
    budget: '',
    timeline: '',
    message: '',
    acceptsWhatsApp: false,
    acceptsTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptsTerms) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos para continuar",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - In production, save to database
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success - redirect to WhatsApp with pre-filled message
      const whatsappMessage = `Hola! Completé el formulario de contacto en su sitio web.

📋 *Datos del restaurante:*
• Nombre: ${formData.restaurantName || 'No especificado'}
• Tipo: ${restaurantTypes.find(t => t.value === formData.restaurantType)?.label || 'No especificado'}
• Ubicación: ${formData.location || 'No especificado'}

💰 *Presupuesto:* ${budgetRanges.find(b => b.value === formData.budget)?.label || 'No especificado'}
⏰ *Timeline:* ${timeframes.find(t => t.value === formData.timeline)?.label || 'No especificado'}

📞 *Mis datos:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

${formData.message ? `💬 *Mensaje adicional:* ${formData.message}` : ''}

¡Espero su respuesta!`;

      const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(whatsappMessage)}`;
      
      setIsSubmitted(true);
      toast({
        title: "¡Formulario enviado!",
        description: "Te redirigimos a WhatsApp para continuar la conversación",
      });

      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema enviando el formulario. Intentá de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">¡Formulario Enviado!</h3>
            <p className="text-muted-foreground mb-6">
              Te estamos redirigiendo a WhatsApp para continuar la conversación...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Redirigiendo...</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>Solicitar Demo Gratis</span>
          <Badge variant="secondary">Respuesta en 2hs</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Nombre completo *</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Tu nombre y apellido"
                required
                className="pl-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>WhatsApp *</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+54 9 11 1234-5678"
                required
                className="pl-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email *</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="tu@email.com"
              required
              className="pl-12"
            />
          </div>

          {/* Restaurant Info */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 flex items-center space-x-2">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              <span>Información del Restaurante</span>
            </h4>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Nombre del restaurante *</Label>
                  <Input
                    id="restaurantName"
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                    placeholder="El nombre de tu restaurante"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restaurantType">Tipo de restaurante *</Label>
                  <Select value={formData.restaurantType} onValueChange={(value) => handleInputChange('restaurantType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {restaurantTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ubicación *</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Barrio, Ciudad, Provincia"
                  required
                  className="pl-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSite">Sitio web actual (si tenés)</Label>
                <Input
                  id="currentSite"
                  type="url"
                  value={formData.currentSite}
                  onChange={(e) => handleInputChange('currentSite', e.target.value)}
                  placeholder="https://turestaurante.com"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Detalles del Proyecto</span>
            </h4>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Presupuesto estimado</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu presupuesto" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">¿Cuándo querés empezar?</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Contanos más sobre tu proyecto (opcional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="¿Qué características especiales necesitás? ¿Tenés alguna referencia de diseño que te guste?"
                rows={4}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptsWhatsApp"
                checked={formData.acceptsWhatsApp}
                onCheckedChange={(checked) => handleInputChange('acceptsWhatsApp', !!checked)}
              />
              <Label htmlFor="acceptsWhatsApp" className="text-sm leading-5">
                Acepto recibir información comercial por WhatsApp y email
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptsTerms"
                checked={formData.acceptsTerms}
                onCheckedChange={(checked) => handleInputChange('acceptsTerms', !!checked)}
                required
              />
              <Label htmlFor="acceptsTerms" className="text-sm leading-5">
                He leído y acepto el tratamiento de mis datos personales *
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full whatsapp-btn text-white py-6 text-lg"
            disabled={isSubmitting || !formData.acceptsTerms}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar y Continuar por WhatsApp
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Al enviar el formulario serás redirigido a WhatsApp para continuar la conversación
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
