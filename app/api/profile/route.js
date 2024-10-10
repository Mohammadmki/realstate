import Profile from "@/models/Profile"
import User from "@/models/User"
import connectDB from "@/utils/connect"
import { orgnumber } from "@/utils/replaceNumber"
import { Types } from "mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
    try {
       await connectDB()
       const profiles= await Profile.find({published:true}).select("-userId")
       return NextResponse.json({data:profiles},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"مشکلی در سرور رخ داده لطفا دوباره امتحان کنید"},{status:500})
    }
}

export async function POST (req) {
    try {
       await connectDB()
        const body= await req.json()
        const {title
            ,description
            ,location
            ,phone
            ,price
            ,realState
            ,constructionDate
            ,category
            ,rules
            ,amenities}=body
          
            const RawPrice=orgnumber(price)


            const session= await getServerSession(req)
            if(!session) return NextResponse.json({error:"اول وارد حساب کاربری خود شوید"},{status:401})
              
                const user=await User.findOne({email:session.user.email})
             
                if(!user) return NextResponse.json({error:"حساب کار بری یافت نشد لطفا ثبت نام کنید" },{status:404})

                if(!title||!description||!location||!phone||!RawPrice||!constructionDate||!category){
                    return NextResponse.json({error:"لطفا مقادیر فرم را کامل کنید"},{status:400})
                }
                const newprofile= await Profile.create({
                    title
                    ,description
                    ,location
                    ,phone
                    ,price:+RawPrice
                    ,realState
                    ,constructionDate
                    ,category
                    ,rules
                    ,amenities
                    ,userId:new Types.ObjectId(user._id),
                })

                return NextResponse.json({message:"اگهی اضافه شد",data:newprofile},{status:201})
            } catch (error) {
        console.log(error)
        NextResponse.json({error:"مشکلی در اتصال به سرور پیش امده"})
    }
};

 export async function PATCH(req) {
    try {
       await connectDB()
        const body= await req.json()
        const {
            _id
            ,title
            ,description
            ,location
            ,phone
            ,price
            ,realState
            ,constructionDate
            ,category
            ,rules
            ,amenities}=body
            const session= await getServerSession(req)
            if(!session) return NextResponse.json({error:"اول وارد حساب کاربری خود شوید"},{status:401})
               
                const user=await User.findOne({email:session.user.email})
             
                if(!user) return NextResponse.json({error:"حساب کار بری یافت نشد لطفا ثبت نام کنید" },{status:404})
            
                if(!_id||!title||!description||!location||!phone||!price||!constructionDate||!category){
                        return NextResponse.json({error:"لطفا مقادیر فرم را کامل کنید"},{status:400})
                    }
                    
                 const profile= await Profile.findOne({_id})
                
                 if(!user._id.equals(profile.userId)){
                    return NextResponse.json({eroor:"دست رسی شما به این اگهی محدود شده"},{status:403})
                 }

                    profile.title=title
                    profile.description=description
                    profile.location=location
                    profile.realState=realState
                    profile.constructionDate=constructionDate
                    profile.category=category
                    profile.rules=rules
                    profile.amenities=amenities
                   await profile.save()

                    return NextResponse.json({message:"اگهی ویرایش شد"},{status:200})
    } catch (error) {
        console.log(error)
        NextResponse.json({error:"مشکلی در اتصال به سرور پیش امده"})
    }
    
}