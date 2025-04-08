import { CategoryDTO } from "../category/category.dto";
import { SupplierDTO } from "../supplier/supplier.dto";

export interface ProductDTO {
  id: number;
  date: string;
  name: string;
  itemCode: number;
  description: string;
  price: number;
  stock: number;
  category: CategoryDTO;
  supplier: SupplierDTO;
  status: boolean;
}
