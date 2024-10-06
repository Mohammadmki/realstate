import Dashboardsidebar from "@/components/layout/Dashboardsidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectDB from "@/utils/connect";
import User from "@/models/User";

export default async function DashboardLayout({children}) {
          const session= await getServerSession(authOptions)
         
          if (!session)redirect("/signIn")
               
                await connectDB()
        const user= await User.findOne({email:session.user?.email})
        if(!user) return <h3>مشکلی پیش امده</h3>

    return (
            <Dashboardsidebar role={user.role} email={user.email} >
             {children}
            </Dashboardsidebar>  
    );
}