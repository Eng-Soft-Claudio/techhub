import React, { useState, useEffect } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getAllCategories } from "../../services/category.service";
import { addProduct } from '../../services/product.service';
import { updateBanner } from "@/services/category.service";
import { Category} from '../../store/types/category.types';

interface AddProductData {
  name: string;
  price: number;
  category: string;
}

interface UpdateBannerData {
  image: string;
}

interface LocalCategory {
  _id: string;
  name: string;
  icon: string;
}

const AdminManage = () => {
  const [bannerImage, setBannerImage] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories); 
      } catch (error) {
        toast({
          variant: 'error',
          title: 'Erro',
          description: 'Erro ao carregar as categorias.',
        });
      }
    };
    fetchCategories();
  }, [toast]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  
  const handleBannerUpdate = async () => {
    if (!bannerImage) {
      toast({
        variant: 'error',
        title: 'Erro',
        description: 'Por favor, selecione uma imagem para o banner.',
      });
      return;
    }
  
    const bannerData: UpdateBannerData = { image: bannerImage };
  
    try {
      await updateBanner(bannerData);
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Banner atualizado com sucesso!',
      });
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Erro',
        description: 'Erro ao atualizar o banner.',
      });
    }
  };
  
  const handleSaveProduct = async () => {
    if (!productName || !productPrice || !productCategory) {
      toast({
        variant: 'error',
        title: 'Erro',
        description: 'Todos os campos do produto precisam ser preenchidos.',
      });
      return;
    }
  
    const productData: AddProductData = {
      name: productName,
      price: productPrice,
      category: productCategory,
    };
  
    try {
      await addProduct(productData);
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Produto adicionado com sucesso!',
      });
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Erro',
        description: 'Erro ao adicionar o produto.',
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Gerenciar Conteúdo</h1>

      {/* Seção de Banner */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">Alterar Banner</h2>
        <input type="file" accept="image/*" onChange={handleBannerChange} />
        {bannerImage && <img src={bannerImage} alt="Banner Preview" className="mt-4 max-w-full h-auto" />}
        <button onClick={handleBannerUpdate} className="mt-2 bg-blue-500 text-white p-2 rounded">Salvar Banner</button>
      </section>

      {/* Seção de Produto */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">Adicionar Produto</h2>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nome do Produto"
          className="mt-2 p-2 border rounded"
        />
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          placeholder="Preço"
          className="mt-2 p-2 border rounded"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <button onClick={handleSaveProduct} className="mt-2 bg-green-500 text-white p-2 rounded">Salvar Produto</button>
      </section>
    </div>
  );
};

export default AdminManage;
