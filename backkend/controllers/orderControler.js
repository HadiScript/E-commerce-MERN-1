import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'
// instead of using try catch we are using asyncHandler 



// create new order ,,,post api/post/order
const addOrderItems = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPice,
        totalPrice
    } = req.body;

    let order;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new error('No order items')
        return;
    }
    else {
        order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPice,
            totalPrice
        })
    }
    const createdOrder = await order.save();

    res.status(201).json(createdOrder)


})


// get orders by id 
// get 
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})


// update order to paid
// private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = date.now()

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.user.email
        }

        const updateOrder = await order.save()
        res.json(updateOrder)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid
}