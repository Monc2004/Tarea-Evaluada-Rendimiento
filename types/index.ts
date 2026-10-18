// types/index.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  total: number;
  status: string;
  items: {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  created_at: string;
}