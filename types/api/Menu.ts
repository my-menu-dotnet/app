import { Category } from "./Category";
import { Company } from "./Company"
import { Food } from "./Food";

type Menu = {
  company: Company;
  categories: MenuCategory[];
}

type MenuCategory = Category & {
  food: Food[];
}

export type { Menu, MenuCategory };