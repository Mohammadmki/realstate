
import DetailsPage from "@/components/tamplates/DetailsPage";
import Profile from "../../../models/Profile";
import connectDB from "../../../utils/connect";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({params:{profileId}}) {
   
    const session = await getServerSession(authOptions)

    await connectDB()
    const profile= await Profile.findOne({_id:profileId})
   let user=""

    if(session) {
         user=await User.findOne({email:session.user.email})
     }else {
        user=""
     }
   
    if(!profile) return <h2 className="error">مشکلی پیش امده است</h2>
   
     
    return (
          <DetailsPage user={JSON.parse(JSON.stringify(user))} data={JSON.parse(JSON.stringify(profile))} />
    );
}
export async function generateMetadata({params}) {
    const {profileId}=params

    await connectDB()
   
    const profile= await Profile.findOne({_id:profileId})
console.log(profile)
    return {
        title:profile.title,
        description:profile.description

    }
    
}