import Category from "@/models/Category";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req,context) {
    try {
       await connectDB()
        
       
         const id=context.params.categoryId
       const session= await getServerSession(req)
       if(!session) return NextResponse.json({error:"اول وارد حساب کاربری خود شوید"},{status:401})
            
        const user=await User.findOne({email:session.user.email})

        if(!user||user.role!=="ADMIN") return NextResponse.json({error:"دسترسی محدود است" },{status:403})
       
         await Category.deleteOne({_id:id})
         
         return NextResponse.json({message:'دسته بندی حذف شد'},{status:200})

        } catch (error) {
           console.log(error)
       return NextResponse.json({error:"مشکلی در اتصال به سرور پیش امده"})
    }
}