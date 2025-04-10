import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CategoryTable from '@/components/dashboard/CategoryTable';
import CategoryModal from '@/components/dashboard/CategoryModal';
import { useCategory } from '@/store/slices/category.slice';
import { ToastContainer, toast } from 'react-toastify';
import { createCategory, editCategory, deleteCategory } from '@/services/category.service';

interface Category {
    _id: string;
    name: string;
    slug: string;
    icon: string;
    createdAt: string;
}

export default function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { categories, fetchCategories } = useCategory();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true);
    fetchCategories().finally(() => setLoading(false)); // .finally() agora deve funcionar corretamente
  }, [fetchCategories]);

  const handleCreateCategory = async (category: { name: string; _id: string }) => {
    try {
      await createCategory(category);
      toast.success('Categoria criada com sucesso!');
      fetchCategories();  // Recarregar as categorias após a criação
      setModalOpen(false);
    } catch (error) {
      toast.error('Erro ao criar categoria');
    }
  };
  
  const handleEditCategory = async (category: { name: string; _id: string }) => {
    try {
      await editCategory(category);
      toast.success('Categoria editada com sucesso!');
      fetchCategories();  // Recarregar as categorias após a edição
      setModalOpen(false);
    } catch (error) {
      toast.error('Erro ao editar categoria');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id); // Função deleteCategory que você precisa implementar
      toast.success('Categoria excluída com sucesso!');
      fetchCategories();  // Recarregar as categorias após a exclusão
    } catch (error) {
      toast.error('Erro ao excluir categoria');
    }
  };

  if (loading) return <div>Carregando categorias...</div>;

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Gerenciar Categorias</h1>
        <Button onClick={() => setModalOpen(true)}>Criar Categoria</Button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={(category) => {
          setEditingCategory(category);
          setIsEditing(true);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={isEditing ? handleEditCategory : handleCreateCategory} 
        category={editingCategory}
        isEditing={isEditing}
     />
    </div>
  );
}
