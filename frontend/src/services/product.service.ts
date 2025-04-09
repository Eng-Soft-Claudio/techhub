export const addProduct = async (product: { name: string; price: number; category: string }) => {
    // Simula a adição de um produto
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Aqui você pode adicionar lógica para salvar o produto no banco de dados
        console.log('Produto adicionado:', product);
        resolve(product);
      }, 500);
    });
  };
  