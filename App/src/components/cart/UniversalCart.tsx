import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, ExternalLink, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  url: string;
  quantity: number;
}

interface UniversalCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const UniversalCart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity 
}: UniversalCartProps) => {
  const { toast } = useToast();

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // For MVP: Open all product links for manual checkout
    items.forEach(item => {
      window.open(item.url, '_blank');
    });
    
    toast({
      title: "Redirecting to checkout!",
      description: `Opening ${items.length} product page(s) for manual purchase`,
      duration: 5000,
    });
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center space-x-2 text-xl font-extrabold">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <span>Universal Cart</span>
          </DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 space-y-4">
            <ShoppingBag className="w-16 h-16 text-text-secondary" />
            <div className="text-center">
              <h3 className="font-bold text-lg text-text-primary mb-2">Your cart is empty</h3>
              <p className="text-text-secondary">Ask C.H.I.P. to find some amazing products!</p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 max-h-96">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border h-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-text-secondary text-xs font-medium uppercase tracking-wide">
                        {item.brand}
                      </p>
                      <h4 className="font-bold text-text-primary truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-text-primary font-bold">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-6 w-6 p-0 rounded"
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0 rounded"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(item.url, '_blank')}
                        className="p-1 h-8 w-8"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 pt-4 space-y-4">
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-text-secondary text-sm">Total ({totalItems} items)</p>
                  <p className="text-text-primary font-extrabold text-xl">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="btn-primary w-full py-3 text-lg"
              >
                Proceed to Checkout
              </Button>
              
              <p className="text-text-secondary text-xs text-center">
                MVP: Links will open for manual checkout
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
