
 'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Clock, 
  Utensils,
  Trash2,
  Edit,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { formatPrice } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status: 'sending' | 'sent' | 'processed';
}

const initialMenu: MenuItem[] = [
  { id: '1', name: 'Milanesa Napolitana', price: 8500, category: 'Principales', available: true },
  { id: '2', name: 'Empanadas (docena)', price: 30000, category: 'Entradas', available: true },
  { id: '3', name: 'Asado de Tira', price: 12000, category: 'Principales', available: true },
  { id: '4', name: 'Pizza Margherita', price: 6500, category: 'Pizzas', available: false },
];

export default function DemoMenuWidget() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '¡Hola! Este es tu asistente de menú. Escribí comandos como "Agregar Pasta Casera $8000" para actualizar tu menú automáticamente.',
      isUser: false,
      timestamp: new Date(),
      status: 'sent'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const parseCommand = (command: string): { action: string; item?: MenuItem; newPrice?: number } | null => {
    const cmd = command.toLowerCase().trim();
    
    // Add item: "agregar [name] $[price]" or "agregar [category] [name] $[price]"
    const addMatch = cmd.match(/agregar\s+(.+?)\s+\$(\d+)/);
    if (addMatch) {
      const parts = addMatch[1].trim().split(' ');
      let category = 'Principales';
      let name = addMatch[1];
      
      // Check if first word might be a category
      const categories = ['entrada', 'principal', 'postre', 'bebida', 'pizza'];
      if (categories.some(cat => parts[0].includes(cat))) {
        category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + 's';
        name = parts.slice(1).join(' ');
      }
      
      return {
        action: 'add',
        item: {
          id: Date.now().toString(),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          price: parseInt(addMatch[2]),
          category,
          available: true
        }
      };
    }

    // Change price: "cambiar precio [name] $[price]"
    const priceMatch = cmd.match(/cambiar\s+precio\s+(.+?)\s+\$(\d+)/);
    if (priceMatch) {
      return {
        action: 'price',
        item: { name: priceMatch[1], price: parseInt(priceMatch[2]) } as MenuItem,
        newPrice: parseInt(priceMatch[2])
      };
    }

    // Remove item: "eliminar [name]"
    const removeMatch = cmd.match(/eliminar\s+(.+)/);
    if (removeMatch) {
      return {
        action: 'remove',
        item: { name: removeMatch[1] } as MenuItem
      };
    }

    // Available: "disponible [name]" or "disponible [name] $[price]"
    const availableMatch = cmd.match(/disponible\s+(.+?)(\s+\$(\d+))?$/);
    if (availableMatch) {
      return {
        action: 'available',
        item: { name: availableMatch[1] } as MenuItem,
        newPrice: availableMatch[3] ? parseInt(availableMatch[3]) : undefined
      };
    }

    // Not available: "no disponible [name]"
    const unavailableMatch = cmd.match(/no\s+disponible\s+(.+)/);
    if (unavailableMatch) {
      return {
        action: 'unavailable',
        item: { name: unavailableMatch[1] } as MenuItem
      };
    }

    return null;
  };

  const processCommand = (command: string): string => {
    const parsed = parseCommand(command);
    
    if (!parsed) {
      return 'No entendí el comando. Probá con: "Agregar Pasta Casera $8000" o "Cambiar precio Empanadas $1200"';
    }

    const { action, item, newPrice } = parsed;

    switch (action) {
      case 'add':
        if (item && menu.find(menuItem => menuItem.name.toLowerCase() === item.name.toLowerCase())) {
          return `El plato "${item.name}" ya existe en el menú.`;
        }
        if (item) {
          setMenu(prev => [...prev, item]);
          return `✅ Agregado: ${item.name} - $${formatPrice(item.price)}`;
        }
        break;

      case 'price':
        if (item) {
          const menuItem = menu.find(menuItem => 
            menuItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(menuItem.name.toLowerCase())
          );
          if (menuItem && newPrice) {
            setMenu(prev => prev.map(m => 
              m.id === menuItem.id ? { ...m, price: newPrice } : m
            ));
            return `✅ Precio actualizado: ${menuItem.name} - $${formatPrice(newPrice)}`;
          }
          return `No encontré "${item.name}" en el menú.`;
        }
        break;

      case 'remove':
        if (item) {
          const menuItem = menu.find(menuItem => 
            menuItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(menuItem.name.toLowerCase())
          );
          if (menuItem) {
            setMenu(prev => prev.filter(m => m.id !== menuItem.id));
            return `✅ Eliminado: ${menuItem.name}`;
          }
          return `No encontré "${item.name}" en el menú.`;
        }
        break;

      case 'available':
        if (item) {
          const menuItem = menu.find(menuItem => 
            menuItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(menuItem.name.toLowerCase())
          );
          if (menuItem) {
            setMenu(prev => prev.map(m => 
              m.id === menuItem.id 
                ? { ...m, available: true, ...(newPrice ? { price: newPrice } : {}) }
                : m
            ));
            return `✅ Disponible: ${menuItem.name}${newPrice ? ` - $${formatPrice(newPrice)}` : ''}`;
          }
          return `No encontré "${item.name}" en el menú.`;
        }
        break;

      case 'unavailable':
        if (item) {
          const menuItem = menu.find(menuItem => 
            menuItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(menuItem.name.toLowerCase())
          );
          if (menuItem) {
            setMenu(prev => prev.map(m => 
              m.id === menuItem.id ? { ...m, available: false } : m
            ));
            return `✅ No disponible: ${menuItem.name}`;
          }
          return `No encontré "${item.name}" en el menú.`;
        }
        break;

      default:
        return 'Comando no reconocido.';
    }

    return 'Hubo un error procesando el comando.';
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate processing
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ));

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'processed' } : msg
        ));

        const response = processCommand(userMessage.text);
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date(),
          status: 'sent'
        };

        setTimeout(() => {
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 500);

      }, 1000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickCommands = [
    "Agregar Pasta Casera $8000",
    "Cambiar precio Empanadas $35000",
    "No disponible Pizza Margherita",
    "Disponible Pescado del día $15000"
  ];

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <section ref={ref} className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Mirá cómo funciona en <span className="text-gradient">tiempo real</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escribí comandos en el chat y mirá cómo se actualiza el menú automáticamente
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* WhatsApp Chat Simulator */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="bg-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>ChePilot Bot</span>
                  <div className="flex space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm">En línea</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-4">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isUser
                              ? 'bg-green-500 text-white rounded-br-sm'
                              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString('es-AR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            {message.isUser && (
                              <div className="flex">
                                <CheckCircle 
                                  className={`w-3 h-3 ${
                                    message.status === 'processed' ? 'text-blue-200' : 'text-white'
                                  }`} 
                                />
                                {message.status === 'processed' && (
                                  <CheckCircle className="w-3 h-3 text-blue-200 -ml-1" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Commands */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Comandos de ejemplo:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickCommands.map((command, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(command)}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {command}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribí tu comando..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    size="sm"
                    className="whatsapp-btn text-white"
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Menu Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-[600px] overflow-y-auto">
              <CardHeader className="sticky top-0 bg-white border-b z-10">
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  <span>Menú del Restaurante</span>
                  <Badge variant="secondary" className="ml-auto">
                    Actualización en vivo
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <AnimatePresence mode="popLayout">
                  {Object.entries(groupedMenu).map(([category, items]) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-8"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-primary border-b border-primary/20 pb-2">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        <AnimatePresence>
                          {items.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              layout
                              className={`flex justify-between items-center p-4 rounded-lg border ${
                                item.available 
                                  ? 'border-gray-200 bg-white' 
                                  : 'border-gray-200 bg-gray-50 opacity-60'
                              }`}
                            >
                              <div className="flex-1">
                                <h4 className={`font-medium ${!item.available ? 'line-through' : ''}`}>
                                  {item.name}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge 
                                    variant={item.available ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {item.available ? "Disponible" : "No disponible"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`text-xl font-bold ${
                                  item.available ? 'text-primary' : 'text-muted-foreground'
                                }`}>
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {menu.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay platos en el menú</p>
                    <p className="text-sm">Agregá algunos usando el chat</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            <Clock className="inline h-4 w-4 mr-1" />
            Actualizaciones procesadas en menos de 30 segundos
          </p>
        </motion.div>
      </div>
    </section>
  );
}
