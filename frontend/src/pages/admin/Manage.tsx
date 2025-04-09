import React, { useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { categoryService, productService } from '../../services';

const AdminManage = () => {
  const [bannerImage, setBannerImage] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<string>('');
  const { toast } = useToast();

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = async () => {
    try {
      await categoryService.updateBanner({ image: bannerImage });
      toast('Banner atualizado com sucesso!');
    } catch (error) {
      toast('Erro ao atualizar o banner.');
    }
  };

  const handleSaveProduct = async () => {
    try {
      await productService.addProduct({ name: productName, price: productPrice, category: productCategory });
      toast('Produto adicionado com sucesso!');
    } catch (error) {
      toast('Erro ao adicionar o produto.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Gerenciar Conteúdo</h1>

      <section className="mt-6">
        <h2 className="text-lg font-medium">Alterar Banner</h2>
        <input type="file" accept="image/*" onChange={handleBannerChange} />
        {bannerImage && <img src={bannerImage} alt="Banner Preview" className="mt-4 max-w-full h-auto" />}
        <button onClick={handleSaveBanner} className="mt-2 bg-blue-500 text-white p-2 rounded">Salvar Banner</button>
      </section>

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
        <input 
          type="text" 
          value={productCategory} 
          onChange={(e) => setProductCategory(e.target.value)} 
          placeholder="Categoria" 
          className="mt-2 p-2 border rounded"
        />
        <button onClick={handleSaveProduct} className="mt-2 bg-green-500 text-white p-2 rounded">Salvar Produto</button>
      </section>
    </div>
  );
};

export default AdminManage;
