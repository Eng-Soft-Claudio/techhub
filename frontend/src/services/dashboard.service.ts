import axios from 'axios';

// Função que busca as métricas do dashboard
export const getDashboardStats = async () => {
  try {
    const response = await axios.get('/api/dashboard/stats'); // URL fictícia da API
    return response.data; // Retorna as estatísticas (totalProducts, totalCategories, totalSales, etc.)
  } catch (error) {
    throw new Error('Erro ao buscar dados do dashboard');
  }
};
