import React from 'react';
import { Category } from '@/store/types/category.types';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => Promise<void>;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">Categoria</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">
                <button onClick={() => onEdit(category)} className="text-primary hover:underline">Editar</button>
                <button onClick={() => onDelete(category._id)} className="text-danger hover:underline ml-4">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
