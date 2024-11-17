import { FileStorage } from "./FileStorage";

type Company = {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  categories: any[];
  image: FileStorage;
  status: CompanyStatus;
  created_at: string;
  updated_at: string;
}

type CompanyStatus = "ACTIVE" | "INACTIVE";

export type { Company, CompanyStatus };