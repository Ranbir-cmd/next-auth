import mongoose from "mongoose";

export async function connect() {
try {
     mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection;
    connection.on("connected", ()=> {
        console.log("database connected successfully");
    })
    connection.on("error", (err: any) => {
        console.log(err, "error while db connection");
        process.exit();
    })
} catch (error) {
    console.log(error, "Error connecting to Mongo");
}}