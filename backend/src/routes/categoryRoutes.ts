import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Listar categorias (público)
router.get('/', categoryController.list);

// Rotas protegidas (admin)
router.post('/', authenticateToken, categoryController.create);
router.put('/:id', authenticateToken, categoryController.update);
router.delete('/:id', authenticateToken, categoryController.remove);

export default router;
