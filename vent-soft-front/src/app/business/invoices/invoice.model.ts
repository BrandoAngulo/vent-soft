/* export interface Productos {
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
} */

import { Product } from "../product/product.model";

export interface Invoice {
  id: number;
  invoiceCode: string;
  customer: string;
  nit: string;
  address: string;
  date: string;
  total: number;
  products: Product[];
}
