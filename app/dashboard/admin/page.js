import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboardsidebar from "@/components/layout/Dashboardsidebar";
import AdminPage from "@/components/tamplates/AdminPage";
import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connect";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export const metadata = {
    title: " پنل ادمین پروژه املاک",
    description: "سامانه خرید و فروش املاک",
  };


export default async function Admin() {
     
    await connectDB()
    const session= await getServerSession(authOptions)

    if(!session) redirect("/signIn")
        const user= await User.findOne({email:session.user.email})
    if(!user) return <h3>مشکلی بوجود امده است</h3>
    
    if (user.role!=="ADMIN") {
        redirect("/dashboard")
    }
    
    const profiles= await Profile.find({published:false})

    return (
      <AdminPage profiles={JSON.parse(JSON.stringify(profiles))} />
    );
}