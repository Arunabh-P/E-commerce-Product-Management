import mongoose from "mongoose";

export default function connectDatabase() {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((connect) => console.log(`Database Connected : ${connect.connection.host}`))
        .catch((error) => console.log(error))
}