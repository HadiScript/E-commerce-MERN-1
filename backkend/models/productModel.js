import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({

    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comments: { type: String, required: true }


}, { timestamps: true })


const commentSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        name: { type: String },
        date: { type: Date, default: Date.now }
    }
)


const productSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    image: { type: Array, },
    // images: {
    //   type: Array,
    // },
    name: { type: String, },
    brand: { type: String, },
    category: { type: String, },
    description: { type: String, },

    // seperate schema which is small thatswhy we defined it here above
    // array of reviews
    reviews: [reviewSchema],
    comments: [commentSchema],

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },

}, { timestamps: true }
)

const Product = mongoose.model('Product', productSchema);

export default Product