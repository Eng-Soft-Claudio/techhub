export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  createdAt: string;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}
