
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
   
    if(!profile) return <h2 style={{
        color:"red",
        fontWeight:"400",
        backgroundColor:"#fbbdbd",
        borderRadius:"5px",
        padding:"0px 10px"
     }}>مشکلی پیش امده است</h2>
   
     
    return (
          <DetailsPage user={JSON.parse(JSON.stringify(user))} data={JSON.parse(JSON.stringify(profile))} />
    );
}