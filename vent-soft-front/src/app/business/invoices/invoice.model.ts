/* export interface InvoiceProduct {
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Invoice {
  id: number;
  invoiceCode: string;
  customer: string;
  nit: string;
  address: string;
  date: string;
  total: number;
  products: InvoiceProduct[];
}
 */

export interface InvoiceProduct {
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Invoice {
  id: number;
  invoiceCode: string;
  customer: string;
  nit: string;
  address: string;
  date: string;
  total: number;
  products: InvoiceProduct[];
}
