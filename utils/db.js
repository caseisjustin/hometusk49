import mongoose, { mongo } from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/hometusk49', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(mongoose.connection.host, mongoose.connection.port)
    } catch (err) {
        console.log("Error connection to DB")
    }
}

export default connectDB;