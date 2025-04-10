interface Product {
  _id: string;
  name: string;
  price: number;
  createdAt: string;
  category: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: '1',
          name: 'Notebook Gamer',
          price: 4500,
          createdAt: new Date().toISOString(),
          category: 'Computadores',
        },
        {
          _id: '2',
          name: 'Mouse Logitech G305',
          price: 250,
          createdAt: new Date().toISOString(),
          category: 'Acessórios',
        },
        {
          _id: '3',
          name: 'Monitor LG 29"',
          price: 1200,
          createdAt: new Date().toISOString(),
          category: 'Monitores',
        },
        {
          _id: '4',
          name: 'Teclado Mecânico',
          price: 350,
          createdAt: new Date().toISOString(),
          category: 'Acessórios',
        },
        {
          _id: '5',
          name: 'Fone de Ouvido Bluetooth',
          price: 180,
          createdAt: new Date().toISOString(),
          category: 'Áudio',
        },
      ]);
    }, 500);
  });
};

export const addProduct = async (product: { name: string; price: number; category: string }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Produto adicionado:', product);
      resolve(product);
    }, 500);
  });
};
