import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost/5thSems', {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })

        console.log(`DB connected ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

export default connectDB