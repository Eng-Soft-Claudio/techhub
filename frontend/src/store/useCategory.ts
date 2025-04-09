import { create } from 'zustand';
import { Category, getAllCategories } from '@/services/categoryService';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}

export const useCategory = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllCategories();
      set({ categories: data });
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
