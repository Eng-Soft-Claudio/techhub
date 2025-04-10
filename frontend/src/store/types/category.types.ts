export interface Category {
  _id: string;
  name: string;
  icon: string;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}
