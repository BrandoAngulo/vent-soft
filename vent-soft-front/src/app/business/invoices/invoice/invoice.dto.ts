import { CustomerDTO } from "../../customer/customer.dto";
import { ItemInvoiceDTO } from "./itemInvoice.dto";

export interface InvoiceDTO {
  id: number;
  invoiceCode: string;
  client: CustomerDTO;
  nit: string;
  email: string;
  cellphone: string;
  address: string;
  date: string;
  total: number;
  itemInvoices: ItemInvoiceDTO[];
  status: boolean;
}

