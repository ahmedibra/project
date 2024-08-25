import { Product1 } from "./Product1";

export interface Order {
    userId: string;
    products: CartItem[];
    total: number;
    livraison: string;
    status: number;
  }

  export interface CartItem {
    productId: Product1,
    quantity: number
  }