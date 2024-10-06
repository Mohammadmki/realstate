import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req,context) {
    
    try {
       await connectDB()
       const id=context.params.profileId
       const session= await getServerSession(req)
       
       const user= await User.findOne({email:session.user.email})
   
       if(!user||user.role!=="ADMIN"){
           return NextResponse.json({error:"دست رسی محدود است"},{status:403})
       }
       
       const profile= await Profile.findOne({ _id:id })
       profile.published=true;
       profile.save()
       
       return NextResponse.json({message:"اگهی منتشر شد"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"مشکلی پیش آمده لطفا بعدا امتحان کنید"},{status:500})
    }
}
