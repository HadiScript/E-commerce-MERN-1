import nodemailer from 'nodemailer'

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';


// auth user and get a token 
// login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid cradentials')
    }
})



// auth user profile, either is login in or not 
// Auth
const authUserProfle = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(401)
        throw new Error('User not found')
    }
})

// update the user profile
// put
const updateUserProfle = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // if password change then automatically hashed becouse we do it in our user models 
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else {
        res.status(401)
        throw new Error('User not found')
    }
})


// register a new user 
// register,,,, post
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        throw new Error('User already exist');
    }

    // when you create with mongodb method like User.create()
    // dont need to save it, to mongodb
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})



// getting all users only admin can access this, private
const getAllUser = asyncHandler(async (req, res) => {

    const users = await User.find({});
    res.json(users)

})


const sendEmail = asyncHandler(async (req, res) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hr040877@gmail.com', // generated ethereal user
            pass: '123abc', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: ' "From Merners" <hr040877@gmail.com> ', // sender address
        to: "2019cs519@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });


    if (info.messageId) {
        res.json('has been sent')
    } else {
        res.json('not send')
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

})


// delete a user 
// private
// admin can delete users
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: "User removed" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// get a user by id 
// private
// admin can delete users
const getUserById = asyncHandler(async (req, res) => {
    // pass user with password as ("-password")
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



// update the user profile by Id
// private admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else {
        res.status(401)
        throw new Error('User not found')
    }
})




export {
    authUser,
    authUserProfle,
    registerUser,
    updateUserProfle,
    getAllUser,
    sendEmail,
    deleteUser,
    getUserById,
    updateUser
}

