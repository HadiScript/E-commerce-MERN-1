import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.token) {
        try {
            // console.log(req.headers.token)
            token = req.headers.token;
            const decode = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = await User.findById(decode.id).select('-password')

            next();

        } catch (error) {

            // console.log(error)
            res.status(401)
            throw new Error('Not Authorized');

        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorized")
    }

})


const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error('Not Authorized as in admin')
    }
}


export { protect, admin }
