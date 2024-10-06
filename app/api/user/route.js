import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    
    try {
        
        await connectDB()
        const body= await req.json()

        const session= await getServerSession(req)
        if(!session) return NextResponse.json({error:"لطفا اول وارد حساب کاربری خود شوید"},{status:401})
            
        const user= await User.findOne({email:session.user.email})
           
                      

       if(!user) return NextResponse.json({error:"حساب کار بری یافت نشد"},{status:404})    
          
       let saves=user.savedpofiles.profiles
    
            const profile = await Profile.findById(body)

            if(!profile){
                return NextResponse.json({error:"آگهی وجود ندارد"},{status:404})
            }

        const issave=saves.findIndex((i)=>i._id==body)
           
        if(issave<0){
            saves=[...saves,profile]
            user.savedpofiles.profiles=saves
            await user.save()
            return NextResponse.json({message:"اگهی ذخیره شد"},{status:200})
        }else {
            saves.splice(issave,1)
            user.savedpofiles.profiles=saves
            await user.save()
            return NextResponse.json({message:"اگهی ذخیره برداشته شد"},{status:200})
        }
                
                            

          

      
    } catch (error) {
        return NextResponse.json({error:"مشکلی پیش امده لطفا دوباره امتحان کنید"},{status:500})
    }

}

