import express from 'express';
import { authUser, authUserProfle, deleteUser, getAllUser, getUserById, registerUser, sendEmail, updateUser, updateUserProfle } from '../controllers/userControllers.js';
import { admin, protect } from '../middlewear/AuthMiddlewear.js';

const router = express.Router();

// register a user 
router.post('/', registerUser)

// auth user and get a token 
// login
router.post('/login', authUser)

// Auth & get user profile and upload user profile
router.get('/profile', protect, authUserProfle);
router.put('/profile', protect, updateUserProfle);

// admin can does this
router.put('/:id', protect, admin, updateUser);
router.get('/:id', protect, admin, getUserById);

// user admin can delete users
router.delete('/:id', protect, admin, deleteUser);




router.post('/email', sendEmail);
// getting all users 
router.get('/', protect, admin, getAllUser);



export default router