import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';

const router = Router();

router.post('/buy', OrderController.buy);

export default router;
