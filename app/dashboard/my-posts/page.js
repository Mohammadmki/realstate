
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Myprofiles from "@/components/tamplates/Myprofiles";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";




export default async function MPosts() {

    const session= await getServerSession(authOptions)

   await connectDB()
         
   const [user]= await User.aggregate([{$match:{email:session.user.email}},{
    $lookup:{
        from:"profiles",
        foreignField:"userId",
        localField:"_id",
        as:"profiles"
    }
   }])

    return (
       <Myprofiles profiles={user.profiles} />
    );
}