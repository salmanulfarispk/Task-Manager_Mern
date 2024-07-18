import mongoose from "mongoose";

export const DBconnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
         
        console.log("DB connected.."); 
        
    } catch (error) {
        console.log("DB ERRor :",error);
    }
}

