// this is for importting sample data 

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import products from './data/products.js'
import users from './data/user.js'

import connectDB from './config/db.js';

import User from './models/userModel.js'
import Order from './models/orderModel.js';
import Product from './models/productModel.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // await Order.deleteMany(); // del every thing
        await Product.deleteMany(); // del every thing
        await User.deleteMany(); // del every thing

        const createdusers = await User.insertMany(users);
        // createdusers will be an array
        // becouse we have relation between product and users 
        // we want here admin user

        const adminUser = createdusers[0]._id;


        //  we have products sample data
        // and every product belongs to an Admin 
        // here in this, every product owner is this adminUser
        const sampleProducts = products.map(p => {
            return { ...p, user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log('data imported');
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }


}

const destroyData = async () => {
    try {
        await Order.deleteMany(); // del every thing
        await Product.deleteMany(); // del every thing
        await User.deleteMany(); // del every thing

        console.log('data destroyed');
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }


}

// node backkend/seeder

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData();
}