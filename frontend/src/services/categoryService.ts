import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // ajuste se necessário

export interface Category {
  icon: ReactNode;
  _id: string;
  name: string;
  imageUrl: string;
}

export async function getAllCategories(): Promise<Category[]> {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
}
