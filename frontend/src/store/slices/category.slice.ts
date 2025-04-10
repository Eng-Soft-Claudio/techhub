import { create } from 'zustand';
import { CategoryState } from '@/store/types/category.types';
import { getAllCategories } from '@/services/category.service';

export const useCategory = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  fetchCategories: async (): Promise<void> => {
    set({ isLoading: true });
    try {
      const data = await getAllCategories();
      console.log("Categorias recebidas:", data);
      set({ categories: data });
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

