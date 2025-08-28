
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Upsell {
  title: string;
  description: string;
  price: string;
  badge: string | null;
}

interface InteractiveUpsellsProps {
  upsells: Upsell[];
}

export default function InteractiveUpsells({ upsells }: InteractiveUpsellsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {upsells.map((upsell, index) => (
        <Card key={index} className="relative card-hover">
          {upsell.badge && (
            <div className="absolute -top-3 left-6">
              <Badge 
                variant="secondary" 
                className="bg-primary text-primary-foreground"
              >
                {upsell.badge}
              </Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{upsell.title}</CardTitle>
            <p className="text-muted-foreground">{upsell.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-primary">
                {upsell.price}
              </p>
              <button 
                className="text-primary hover:underline font-medium"
                onClick={() => window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(`Hola! Me interesa saber más sobre ${upsell.title}.`)}`, '_blank')}
              >
                Más Info →
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
