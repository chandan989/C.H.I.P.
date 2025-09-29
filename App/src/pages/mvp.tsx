import { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { UniversalCart } from '@/components/cart/UniversalCart';
import { CartIcon } from '@/components/ui/CartIcon';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';

const Mvp = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQuantity } = useCart();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000); // Animation duration
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-background hero-bg ${
        isAnimating ? 'animate-fade-in-up' : ''
      }`}
    >
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center p-4">
        <div className="absolute left-4">
          <img src="/logo.svg" alt="C.H.I.P. Logo" className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-extrabold text-text-primary font-mono">C.H.I.P.</h1>
        <div className="absolute right-4">
          <CartIcon
            itemCount={items.reduce((sum, item) => sum + item.quantity, 0)}
            onClick={() => setIsCartOpen(true)}
          />
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 overflow-hidden mt-20">
        <div className="max-w-4xl mx-auto h-full">
          <ChatInterface onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Universal Cart Modal */}
      <UniversalCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Mvp;
