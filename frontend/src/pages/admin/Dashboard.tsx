import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/services/dashboard.service';
import { useToast } from '@/hooks/use-toast';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface SalesData {
  month: string;
  totalSales: number;
}

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalSales: number;
  salesGraph: SalesData[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    totalSales: 0,
    salesGraph: [],
  });

  const [salesData, setSalesData] = useState<SalesData[]>([]); 

  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats(); 
        setStats(data);
        setSalesData(data.salesGraph);
      } catch (error) {
        toast({
          variant: 'error',
          title: 'Erro',
          description: 'Erro ao carregar as informações do dashboard.',
        });
      }
    };

    fetchStats();
  }, [toast]);

  if (!Array.isArray(salesData) || salesData.length === 0) {
    return (
      <div>Carregando dados...</div> 
    );
  }

  const salesGraphData = {
    labels: salesData.map((item) => item.month),
    datasets: [
      {
        label: 'Vendas Mensais',
        data: salesData.map((item) => item.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Painel Administrativo</h1>

      {/* Seção de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total de Produtos */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-medium">Total de Produtos</h3>
          <p className="text-2xl font-bold mt-2">{stats.totalProducts}</p>
        </div>

        {/* Total de Categorias */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-medium">Total de Categorias</h3>
          <p className="text-2xl font-bold mt-2">{stats.totalCategories}</p>
        </div>

        {/* Total de Vendas */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-medium">Total de Vendas</h3>
          <p className="text-2xl font-bold mt-2">{stats.totalSales}</p>
        </div>
      </div>

      {/* Gráfico de Vendas */}
      <div className="mt-8">
        <h2 className="text-xl font-medium">Gráfico de Vendas Mensais</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <Bar data={salesGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>

      {/* Tabelas de Produtos e Categorias */}
      <div className="mt-8">
        <h2 className="text-xl font-medium">Produtos Recentes</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          {/* Aqui pode ser uma tabela de produtos */}
        </div>

        <h2 className="text-xl font-medium mt-8">Categorias Recentes</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          {/* Aqui pode ser uma tabela de categorias */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
