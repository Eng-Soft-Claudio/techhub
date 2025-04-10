import api from '@/lib/axios';

export const getDashboardStats = async () => {
  try {
    const response = await api.get('/api/dashboard/stats'); // URL fictícia da API
    return response.data; 
    } catch (error) {
    throw new Error('Erro ao buscar dados do dashboard');
  }
};
