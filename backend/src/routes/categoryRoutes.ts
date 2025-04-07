import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';

const router = Router();

router.post('/', categoryController.create);
router.get('/', categoryController.list);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);

export default router;
