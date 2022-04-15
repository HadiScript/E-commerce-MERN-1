import express from 'express'
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';


import usersRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadsRoutes.js'
import { errorHandler, notFound } from './middlewear/errors.js';

connectDB()
dotenv.config()

app.use(cors())
app.use(express.json())

// // it will run before any request
// app.use((req, res, next) => {
//     console.log("");
//     next();
// })  

app.get('/', (req, res) => {
    res.send('api running')
})

app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);



// upload folder make static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// for not found
app.use(notFound)

// // CastError: Cast to ObjectId failed for value &quot;1&quot;
app.use(errorHandler)


app.listen(5000 || process.config.PORT, console.log(`server running ${process.env.NODE_ENV} on port ${process.env.PORT}`))