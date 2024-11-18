import { Address } from "./Address";
import { Category } from "./Category";
import { FileStorage } from "./FileStorage";

type Company = {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  categories: Category[];
  image: FileStorage;
  delivery: boolean;
  delivery_price: number;
  delivery_radius: number;
  address: Address;
  status: CompanyStatus;
  created_at: string;
  updated_at: string;
}

type CompanyStatus = "ACTIVE" | "INACTIVE";

export type { Company, CompanyStatus };