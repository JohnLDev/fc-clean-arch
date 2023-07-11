export interface InputListProductDto {}

interface Product {
  id: string;
  name: string;
  price: number;
}

export type OutputListProductDto = Product[];
