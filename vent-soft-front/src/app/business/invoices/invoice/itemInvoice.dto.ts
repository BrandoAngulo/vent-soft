import { ProductDTO } from "../../product/product.dto";
import { InvoiceDTO } from "./invoice.dto";

export interface ItemInvoiceDTO {
  id: number;
  product: ProductDTO;
  price: number;
  invoice: InvoiceDTO;
  amountSold: number;
  total: number;
}
