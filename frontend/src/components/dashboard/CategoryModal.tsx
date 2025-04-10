import React, { useState, useEffect } from 'react';
import { Category } from '@/store/types/category.types';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: { name: string ; _id: string }) => void;
  category: Category | null;
  isEditing: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  onClose,
  onSave,
  category,
  isEditing,
}) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSave = () => {
    if (name.trim() === '') {
      toast.error('O nome da categoria não pode estar vazio.');
      return;
    }
    const categoryToSave = isEditing ? { name, _id: category?._id || '' } : { name, _id: 'temp-id' };
    onSave(categoryToSave);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Editar Categoria' : 'Criar Categoria'}</h2>
        <div className="mb-4">
          <label htmlFor="category-name" className="block text-sm font-medium">
            Nome da Categoria
          </label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Nome da categoria"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>{isEditing ? 'Salvar' : 'Criar'}</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
