import { useEffect, useState } from 'react';
import { getAllCategories } from '@/services/category.service';
import { Skeleton } from '@/components/ui/skeleton';

interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

const RecentCategoriesTable = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data.slice(0, 5));
    };
    fetchCategories();
  }, []);

  if (!categories) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left font-medium text-gray-700">
          <th>Categoria</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id} className="border-t">
            <td>{category.name}</td>
            <td>{new Date(category.createdAt).toLocaleDateString('pt-BR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentCategoriesTable;
