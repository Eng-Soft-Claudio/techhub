import { Request, Response } from 'express';
import { Category } from '../models/Category';
import slugify from 'slugify';

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log('🚀 Recebido no createCategory:', req.body);

    if (!name) {
      console.log('⚠️ Nome não fornecido');
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const slug = slugify(name, { lower: true });

    // Verifica se já existe uma categoria com o mesmo slug
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ error: 'Já existe uma categoria com esse nome.' });
    }

    const category = await Category.create({ name, slug });

    return res.status(201).json(category);
  } catch (err: any) {
    console.error('❌ Erro no createCategory:', err);
    return res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};


const listCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch {
    return res.status(500).json({ error: 'Erro ao listar categorias' });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const slug = slugify(name, { lower: true });
    const category = await Category.findByIdAndUpdate(id, { name, slug }, { new: true });

    return res.json(category);
  } catch {
    return res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};

const removeCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.json({ message: 'Categoria removida com sucesso' });
  } catch {
    return res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
};

export const categoryController = {
  create: createCategory,
  list: listCategories,
  update: updateCategory,
  remove: removeCategory
};
