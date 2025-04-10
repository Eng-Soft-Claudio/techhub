import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/services/dashboard.service';
import { useToast } from '@/hooks/use-toast';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import RecentProductsTable from '@/components/dashboard/RecentProductsTable';
import RecentCategoriesTable from '@/components/dashboard/RecentCategoriesTable';

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
  const [stats, setStats] = useState<Stats | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
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

  if (!stats || !Array.isArray(stats.salesGraph)) {
    return (
      <div className="p-4 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  const salesGraphData = {
    labels: stats.salesGraph.map((item) => item.month),
    datasets: [
      {
        label: 'Vendas Mensais',
        data: stats.salesGraph.map((item) => item.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-semibold">Painel Administrativo</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total de Produtos" value={stats.totalProducts} />
        <DashboardCard title="Total de Categorias" value={stats.totalCategories} />
        <DashboardCard title="Total de Vendas" value={formatCurrency(stats.totalSales)} />
      </section>

      <section>
        <h2 className="text-xl font-medium">Gráfico de Vendas Mensais</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <Bar
            data={salesGraphData}
            options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
          />
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-medium">Produtos Recentes</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <RecentProductsTable />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium">Categorias Recentes</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <RecentCategoriesTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
