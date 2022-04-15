import express from 'express';

import { protect } from '../middlewear/AuthMiddlewear.js';
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderControler.js';

const router = express.Router();

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)


export default router;