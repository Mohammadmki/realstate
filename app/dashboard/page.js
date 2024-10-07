import DashboardPage from "@/components/tamplates/DashboardPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";



export default async function Dashboard() {

 
    return (
         <DashboardPage/>
    );
}