import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req,context) {
    try {
        await connectDB()

        const id=context.params.profileId
        const session= await getServerSession(req)
        if(!session) return NextResponse.json({error:"اول وارد حساب کاربری خود شوید"},{status:401})
           
            const user=await User.findOne({email:session.user.email})
         
            if(!user) return NextResponse.json({error:"حساب کار بری یافت نشد لطفا ثبت نام کنید" },{status:404})
        
                const profile= await Profile.findOne({_id:id})

                if(!user._id.equals(profile.userId)||user.role!=="ADMIN"){
                    return NextResponse.json({error:"دسترسی شما به اگهی محدود شده است"},{status:403})
                } 
                
               await profile.deleteOne({_id:id})

                return NextResponse.json({message:"اگهی حذف شد"},{status:200})

    } catch (error) {
        console.log(error)
        NextResponse.json({error:"مشکلی در اتصال به سرور پیش امده"})
    }
    
}