export interface Subcategory {
  name: string;
  cost: number;
}

export interface Category {
  name: string;
  cost: number;
  subcategories: Subcategory[];
}

export interface Budget {
  name: string;
  cost: number;
  peopleCount: number;
  mainBudget: boolean;
  categories: Category[];
}

export interface Integration {
  id: number;
  name: string;
  imgUrl: string;
  budgets: Budget[];
}
