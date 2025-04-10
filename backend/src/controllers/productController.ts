import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const productController = {
  async create(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar produtos', error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await productService.updateProduct(id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover produto', error });
    }
  },
};
