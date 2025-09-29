import { Product } from '@/types';

// Mock product database for MVP demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Zoom Pegasus 40',
    brand: 'Nike',
    price: 98.00,
    originalPrice: 110.00,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1abaae51-d7c4-4ca6-8e2b-8133b90d168b/AIR+ZOOM+PEGASUS+40.png',
    rating: 4.5,
    reviewCount: 409,
    url: 'https://www.nike.com/in/t/pegasus-40-road-running-shoes-3JpHzl',
    inStock: false,
    category: 'running shoes',
    description: 'Responsive cushioning in the Pegasus provides versatility and performance for any runner.'
  },
  {
    id: '2',
    name: 'Juniper Trail 3',
    brand: 'Nike',
    price: 80.00,
    originalPrice: 80.00,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4769b22e-a105-4053-b2b3-22eb55683f25/NIKE+JUNIPER+TRAIL+3.png',
    rating: 4,
    reviewCount: 41,
    url: 'https://www.nike.com/in/t/juniper-trail-3-trail-running-shoes-b0qq1T/FQ0904-003',
    inStock: true,
    category: 'running shoes',
    description: 'Helps keep you upright for your trails and hilly terrain'
  },
  {
    id: '3',
    name: 'Pegasus EasyOn',
    brand: 'Nike',
    price: 99.00,
    originalPrice: 100.00,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bb30a43a-61ff-44d4-98c8-f362b8e3556b/PEGASUS+EASYON.png',
    rating: 4.7,
    reviewCount: 14,
    url: 'https://nike.com/react-infinity-run-flyknit-3',
    inStock: true,
    category: 'running shoes',
    description: 'Dual-layered responsive cushioning for an energised and comfortable ride, with easy step-in.'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999.00,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop&crop=center',
    rating: 4.8,
    reviewCount: 3421,
    url: 'https://apple.com/iphone-15-pro',
    inStock: true,
    category: 'smartphone',
    description: 'Pro camera system. Pro performance. Pro display. Forged in titanium.'
  },
  {
    id: '5',
    name: 'AirPods Pro (2nd generation)',
    brand: 'Apple',
    price: 229.00,
    originalPrice: 249.00,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop&crop=center',
    rating: 4.6,
    reviewCount: 2156,
    url: 'https://apple.com/airpods-pro',
    inStock: true,
    category: 'headphones',
    description: 'Adaptive Audio. Dynamic Head Tracking. Up to 2x more Active Noise Cancellation.'
  },
  {
    id: '6',
    name: 'MacBook Air 15"',
    brand: 'Apple',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center',
    rating: 4.9,
    reviewCount: 1678,
    url: 'https://apple.com/macbook-air-15',
    inStock: true,
    category: 'laptop',
    description: 'Impressively thin and light with M2 chip. More room for what you love.'
  }
];

// Simple AI-like intent extraction for MVP
export const extractSearchIntent = (query: string): {
  productType: string;
  brand?: string;
  budget?: number;
  keywords: string[];
} => {
  const lowerQuery = query.toLowerCase();
  
  // Extract product type
  let productType = 'general';
  if (lowerQuery.includes('shoe') || lowerQuery.includes('footwear') || lowerQuery.includes('running')) {
    productType = 'running shoes';
  } else if (lowerQuery.includes('phone') || lowerQuery.includes('iphone') || lowerQuery.includes('smartphone')) {
    productType = 'smartphone';
  } else if (lowerQuery.includes('headphone') || lowerQuery.includes('earbuds') || lowerQuery.includes('airpods')) {
    productType = 'headphones';
  } else if (lowerQuery.includes('laptop') || lowerQuery.includes('macbook') || lowerQuery.includes('computer')) {
    productType = 'laptop';
  }
  
  // Extract brand
  let brand: string | undefined;
  if (lowerQuery.includes('nike')) brand = 'Nike';
  if (lowerQuery.includes('apple')) brand = 'Apple';
  
  // Extract budget
  let budget: number | undefined;
  const budgetMatch = lowerQuery.match(/(\$)?(\d+)/);
  if (budgetMatch) {
    budget = parseInt(budgetMatch[2]);
  }
  
  return {
    productType,
    brand,
    budget,
    keywords: lowerQuery.split(' ').filter(word => word.length > 2)
  };
};

export const searchProducts = (query: string): Product[] => {
  const intent = extractSearchIntent(query);
  
  let filteredProducts = mockProducts.filter(product => {
    // Match category/product type
    if (intent.productType !== 'general' && product.category !== intent.productType) {
      return false;
    }
    
    // Match brand
    if (intent.brand && product.brand !== intent.brand) {
      return false;
    }
    
    // Match budget
    if (intent.budget && product.price > intent.budget * 1.2) { // Allow 20% over budget
      return false;
    }
    
    // Match keywords in name or description
    const searchText = `${product.name} ${product.description} ${product.brand}`.toLowerCase();
    const hasKeywordMatch = intent.keywords.some(keyword => 
      searchText.includes(keyword) || keyword.includes(product.category || '')
    );
    
    return hasKeywordMatch || intent.productType !== 'general';
  });
  
  // Sort by relevance (in stock first, then by rating)
  filteredProducts.sort((a, b) => {
    if (a.inStock !== b.inStock) {
      return a.inStock ? -1 : 1;
    }
    return b.rating - a.rating;
  });
  
  // Return top 3 results for MVP
  return filteredProducts.slice(0, 3);
};

export const generateSearchSummary = (query: string, results: Product[]): string => {
  const intent = extractSearchIntent(query);
  
  if (results.length === 0) {
    return `I couldn't find any ${intent.productType} matching your criteria. Try adjusting your budget or brand preferences!`;
  }
  
  let summary = `Found ${results.length} great ${intent.productType} option${results.length > 1 ? 's' : ''}`;
  
  if (intent.brand) {
    summary += ` from ${intent.brand}`;
  }
  
  if (intent.budget) {
    summary += ` within your $${intent.budget} budget`;
  }
  
  summary += `. Here are my top recommendations:`;
  
  return summary;
};