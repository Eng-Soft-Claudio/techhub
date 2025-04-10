import { useEffect, useState } from 'react';
import { getAllProducts } from '@/services/product.service';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  _id: string;
  name: string;
  price: number;
  createdAt: string;
}

const RecentProductsTable = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data.slice(0, 5));
    };
    fetchProducts();
  }, []);

  if (!products) {
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
          <th>Produto</th>
          <th>Preço</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="border-t">
            <td>{product.name}</td>
            <td>R$ {product.price.toFixed(2)}</td>
            <td>{new Date(product.createdAt).toLocaleDateString('pt-BR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentProductsTable;
