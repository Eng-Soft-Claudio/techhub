import { Router } from 'express';
import { productController } from '../controllers/productController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, productController.create);
router.get('/', productController.list);
router.put('/:id', authenticateToken, productController.update);
router.delete('/:id', authenticateToken, productController.remove);

export default router;
