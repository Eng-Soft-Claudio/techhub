import { Category } from "@/store/types/category.types";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllCategories(): Promise<Category[]> {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  }
  