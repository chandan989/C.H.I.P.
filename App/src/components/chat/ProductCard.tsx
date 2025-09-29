import { Button } from '@/components/ui/button';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  url: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Added to Universal Cart!",
      description: `${product.name} is ready for checkout`,
      duration: 3000,
    });
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="p-4 w-80 border border-border rounded-xl flex flex-col">
      <div className="relative mb-4 h-48">
        <img
          src={product.image}
          alt={`${product.name} - ${product.brand}`}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-bold">
            -{discountPercent}%
          </div>
        )}
      </div>

      <div className="space-y-3 flex-grow flex flex-col">
        <div className="flex-grow">
          <p className="text-text-secondary text-sm font-medium uppercase tracking-wide">
            {product.brand}
          </p>
          <h3 className="text-text-primary font-bold text-lg leading-tight">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-warning fill-current' 
                    : 'text-border'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-text-primary font-extrabold text-xl">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-text-secondary line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-black text-white hover:bg-gray-800 flex-1 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(product.url, '_blank')}
            className="rounded-full border-border hover:border-primary hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
