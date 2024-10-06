import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SavedProfiles from "@/components/tamplates/SavedProfiles";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export default async function page() {

    const session= await getServerSession(authOptions)

    if (!session) redirect("/signIn")
     
        await connectDB()

        const user= await User.findOne({email:session.user.email})
       
        if(!user) return <h3>مشگلی بوجود آمده لطفا دوباره امتحان کنید</h3>

    return (
        <SavedProfiles data={JSON.parse(JSON.stringify(user))} />
    );
}