

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Addpost from "@/components/tamplates/Addpost";
import Category from "@/models/Category";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";


export default async function Add() {
  
    const session= await getServerSession(authOptions)  
     if(!session) redirect("/signIn")
       await connectDB()
    const categorie= await Category.find()
    console.log(categorie)
    return (
       <Addpost categorie={JSON.parse(JSON.stringify(categorie))} />
       
    );
}