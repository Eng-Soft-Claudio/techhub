// store/slices/useCategory.ts

import { create } from 'zustand';
import { getAllCategories } from '@/services/category.service';
import { CategoryState } from '@/store/types/category.types';

export const useCategory = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  fetchCategories: async () => {
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
