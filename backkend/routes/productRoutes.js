import express from 'express';

import {
    addingComments,
    createProduct,
    deleteProduct,
    getAllProductsByAdminId,
    getProductById,
    getProducts,
    updateProduct
} from '../controllers/productControllers.js';
import { admin, protect } from '../middlewear/AuthMiddlewear.js';


const router = express.Router();


// fetching all products
router.get('/', getProducts)
// router.get('/:id', getAllProductsByAdminId)

// fetching product by id
router.get('/:id', getProductById)
router.put('/comment/:id', protect, addingComments)

router.delete('/:id', protect, admin, deleteProduct)
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)


export default router