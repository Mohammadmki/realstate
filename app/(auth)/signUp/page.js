import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpForm from "@/components/tamplates/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function page() {
  const session= await getServerSession(authOptions)
if(session)redirect('/dashboard')
    return (
      <SignUpForm/>
    );
}