
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInpage from "@/components/tamplates/SignInpage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function signIn() {
const session= await getServerSession(authOptions)
if(session)redirect('/dashboard')

    return (
      <SignInpage/>
    );
}