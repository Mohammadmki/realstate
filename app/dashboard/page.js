import DashboardPage from "@/components/tamplates/DashboardPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";


export const metadata = {
    title: " پنل کاربری پروژه املاک",
    description: "سامانه خرید و فروش املاک",
  };

export default async function Dashboard() {

 
    return (
         <DashboardPage/>
    );
}