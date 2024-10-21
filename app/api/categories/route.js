import Category from "@/models/Category"
import User from "@/models/User"
import connectDB from "@/utils/connect"
import path from 'path';
import fs from 'fs'; // برای استفاده از createWriteStream
import fsPromises from 'fs/promises'; // برای توابع ناهمزمان
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
     try {
         await connectDB()

         const category= await Category.find()
         

         return NextResponse.json({data:category},{status:200})
     } catch (error) {
        console.log(error)
        return NextResponse.json({error:"مشکلی پیش آمده لطفا بعدا امتحان کنید"},{status:500})
     }
}
export async function POST(req) {

  try {
    await connectDB()
    const formData = await req.formData();
    const name=formData.get("name")
    const slog =formData.get("slog")
    const image=formData.get("image")


    const session= await getServerSession(req)

    if(!session){
        NextResponse.json({error:"دسترسی محدود است"},{status:403})
    }

    const user= await User.findOne({email:session.user.email})
    if(!user||user.role!=="ADMIN") return NextResponse.json({error:"دسترسی محدود است"},{status:403})

   
    if(!name||!slog||!image){
        return NextResponse.json({error:"لطفا همه مقادیر را پر کنید"},{status:400})
    }
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fsPromises.access(uploadDir);
    }  catch (error) {
      console.error('Directory does not exist, creating:', error);
      await fsPromises.mkdir(uploadDir, { recursive: true });
    }
     
   
    const imageFilePath = path.join(uploadDir, image.name);


   

    const imageBuffer = await image.arrayBuffer();
    await fsPromises.writeFile(imageFilePath, Buffer.from(imageBuffer));
 
  const newcategory= await Category.create({name,slog,image:`/uploads/${image.name}`})
   

    return NextResponse.json({message:"دسته بندی اضافه شد"},{status:201})
  } catch (error) {
    console.log(error)
     return NextResponse.json({error:"مشکلی پیش امده"},{status:500})
  }
     
}