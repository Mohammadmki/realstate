import User from "@/models/User";
import { HashPassword } from "@/utils/auth";
import connectDB from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
       await connectDB()
       const Body= await req.json()
       const {email,password}=Body

       if(!email||!password||password.length<8){
       return NextResponse.json({status:422,error:"لطفا ایمیل و رمز معتبر وارد کنید"})
       }
         const existinguser= await User.findOne({email:email})
         if(existinguser){
           return NextResponse.json({error:"حساب کاربری وجود دارد",status:422})
         }
         const Hashedpassword= await HashPassword(password)
         const NewUser=await User.create({email,password : Hashedpassword})
       console.log(NewUser)
        return NextResponse.json({message:"حساب کاربری ایجاد شد",status:201})
    } catch (error) {
        console.log(error)
       return NextResponse.json({error:"مشکلی در سرور رخ داده است",status:500})
    }
}
