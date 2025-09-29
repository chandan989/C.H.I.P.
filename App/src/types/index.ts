export interface Product {
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
  category?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  content: string | React.ReactNode;
  isUser: boolean;
  timestamp: Date;
}

export interface ProductSearchRequest {
  query: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
}