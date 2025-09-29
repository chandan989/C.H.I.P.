import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { ProductCard } from './ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage, Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import {generateSearchSummary, searchProducts} from "@/services/mockProductService.ts";

interface ChatInterfaceProps {
  onAddToCart: (product: Product) => void;
}

const welcomeMessage = "Hello! I'm C.H.I.P., your AI commerce companion!\n\nI'm here to help you find exactly what you're looking for. Just tell me what you need - like \"I need running shoes from Nike under $100\" or \"Show me the latest smartphones\" - and I'll find the perfect products for you!";

const suggestedQueries = [
  "I need new running shoes, Nike preferred, budget around $100",
  "Show me the latest Apple products",
  "Looking for wireless headphones under $250",
  "Find me a lightweight laptop for work"
];

export const ChatInterface = ({ onAddToCart }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: welcomeMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Search for products
      const products = searchProducts(message);
      const summary = generateSearchSummary(message, products);

      // Add AI response with summary
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: summary,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);

      // Add product cards if any found
      if (products.length > 0) {
        const productMessages: ChatMessage[] = products.map((product, index) => ({
          id: `${Date.now() + 2 + index}`,
          content: (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ),
          isUser: false,
          timestamp: new Date(),
        }));

        setMessages(prev => [...prev, ...productMessages]);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble processing your request right now. Please try again!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 sm:px-6 no-scrollbar">
        <div className="py-6 space-y-8">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              isUser={message.isUser}
            />
          ))}
          {isLoading && (
            <ChatBubble
              message="C.H.I.P. Is searching..."
              isUser={false}
            />
          )}
          
          {messages.length === 1 && (
            <div className="mt-8 space-y-4">
              <div className="text-center">
                <p className="text-text-secondary font-medium mb-4">Try asking C.H.I.P. something like:</p>
              </div>
              <div className="space-y-2">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleSuggestedQuery(query)}
                    className="w-full text-left justify-start h-auto p-4 rounded-xl border-border hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <Sparkles className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-text-primary">{query}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder="Ask C.H.I.P. to find anything..."
      />
    </div>
  );
};