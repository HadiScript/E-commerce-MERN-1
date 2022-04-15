import asyncHandler from 'express-async-handler';
// instead of using try catch we are using asyncHandler 

import User from '../models/userModel.js'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}) //find everything

    // res.status(401)
    // throw new Error('not authorized')

    res.json(products);
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product Not Found');
        // res.status(404).json({message : "Product Not Found"})
    }
})


const addingComments = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);


    const newCommment = {
        text: req.body.text,
        name: user.name,
        user: req.user._id,
    };
    console.log("its user", user);

    product.comments.unshift(newCommment);
    await product.save();
    console.log('from adding post server', product)
    res.json(product.comments);

})

// const deleteComments = asyncHandler(async (req, res) => {

//     const product

// })



// delete a product 
// delete 
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: "product has been removed" })

    } else {
        res.status(404)
        throw new Error('Product Not Found');
        // res.status(404).json({message : "Product Not Found"})
    }
})


// idea we just save a sample into database 
// and immediately push user to go and update it

// create a product , private admin
// post
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "sample brand",
        category: "sample category",
        countInStock: 0,
        numReviews: 0,
        description: 'sample descriptions'
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct)
})


// update  a product , private admin
// put
const updateProduct = asyncHandler(async (req, res) => {

    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {

        product.name = name;
        product.brand = brand;
        product.category = category;
        product.image = image;
        product.countInStock = countInStock;
        product.description = description;
        product.price = price;

        const updatedProduct = await product.save();
        res.json(updatedProduct)

    } else {
        res.status(404);
        throw new Error('Product not found')
    }


})


// product by admin id
const getAllProductsByAdminId = asyncHandler(async (req, res) => {
    const product = await Product.find({ user: req.params.id });

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product Not Found');
    }
})




export {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    addingComments,
    getAllProductsByAdminId
}