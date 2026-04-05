import mongoose from "mongoose";

export async function ConnectDB(url){

    try {
       return await mongoose.connect(url)

    }

    catch
    (error) {
        console.log("Error connecting to database",error)
    }
}
