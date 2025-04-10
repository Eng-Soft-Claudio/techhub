import { Category } from "@/store/types/category.types";
import api from '@/lib/axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await fetch('/api/categories');
  const data = await response.json();
  return data;
};

export async function updateBanner(bannerData: { image: string }): Promise<void> {
  const response = await api.put(`${API_URL}/banner`, bannerData);
  return response.data;
}

export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

export const createCategory = async (category: { name: string }) => {
  try {
    const response = await api.post("/categories", category);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar categoria');
  }
};

export const editCategory = async (category: { _id: string; name: string }) => {
  try {
    const response = await api.put(`/categories/${category._id}`, category);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar categoria', error);
    throw new Error(error.response?.data?.message || 'Erro desconhecido');
  }
};

export async function deleteCategory(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir categoria');
    }
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    throw error; 
}
}