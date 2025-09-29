import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage, Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { searchProducts, generateSearchSummary } from '@/services/mockProductService';
import { ProductCard } from './ProductCard';

const welcomeMessage = "Hello! I'm C.H.I.P., your AI commerce companion!"
const suggestedQueries = [
  "I need new running shoes, Nike preferred, budget around $100",
  "Show me the latest Apple products",
  "Looking for wireless headphones under $250",
  "Find me a lightweight laptop for work"
];

interface ChatInterfaceProps {
  onAddToCart: (product: Product) => void;
}

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
  const [isInitializingChat, setIsInitializingChat] = useState(true);
  const [replicaUUID, setReplicaUUID] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      setIsInitializingChat(true);
      try {
        const response = await fetch('https://c-h-i-p-server.vercel.app/init-chat', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Failed to initialize chat session');
        }
        const data = await response.json();
        if (data.replica_uuid) {
          setReplicaUUID(data.replica_uuid);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        const errorMessage: ChatMessage = {
          id: 'error-init',
          content: "Sorry, I couldn't connect to the server. Please refresh the page to try again.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsInitializingChat(false);
      }
    };
    initChat();
  }, []);

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
    if (!replicaUUID) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm not connected yet. Please wait a moment and try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('https://c-h-i-p-server.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          replica_uuid: replicaUUID,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Sorry, I didn't get a response.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);

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
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: query,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);

    setTimeout(() => {
      const products = searchProducts(query);
      const summary = generateSearchSummary(query, products);

      const mockAIResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: summary,
        isUser: false,
        timestamp: new Date(),
        products: products
      };
      setMessages(prev => [...prev, mockAIResponse]);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second search time
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 sm:px-6 no-scrollbar">
        <div className="py-6 space-y-8">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatBubble
                message={message.content}
                isUser={message.isUser}
              />
              {message.products && message.products.length > 0 && (
                <div className="flex flex-col space-y-4 py-4">
                  {message.products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <ChatBubble
              message="C.H.I.P. Is searching..."
              isUser={false}
            />
          )}
          
          {isInitializingChat && (
            <ChatBubble
              message="C.H.I.P. is setting things up..."
              isUser={false}
            />
          )}

          {messages.length === 1 && !isInitializingChat && (
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
                    disabled={isLoading || !replicaUUID || isInitializingChat}
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
        isLoading={isLoading || !replicaUUID || isInitializingChat}
        placeholder={isInitializingChat ? "Connecting to C.H.I.P...." : "Ask C.H.I.P. to find anything..."}
      />
    </div>
  );
};