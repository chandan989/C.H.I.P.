import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="relative rounded-full border-border hover:border-primary hover:text-primary transition-all duration-200"
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full bg-chip-cyan text-white border-0"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
};