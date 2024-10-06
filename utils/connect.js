import mongoose from "mongoose";


export default async function connectDB(){
        if (mongoose.connections[0].readyState) return
        mongoose.set ("strictQuery",false)
         await mongoose.connect(process.env.URL_DB)
        console.log("Connect to BD")
   
} 