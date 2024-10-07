
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import styles from "./dashboardstyles.module.css"

import Logoutbtn from "../module/Logoutbtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function Dashboardsidebar({children,role,email}) {

    const session= await getServerSession(authOptions)

    if(!session) redirect('/signIn')
    return (
        <div className={styles.container} >
           <div className={styles.sidebar} >
            <CgProfile/>
            {role=="ADMIN"&&<span>Admin</span>}
            <p>{email}</p>
            <Link href={"/dashboard"}>حساب کاربری</Link>
            <Link href={"/dashboard/add"}>ثبت اگهی</Link>
            <Link href={"/dashboard/my-posts"}>اگهی های من</Link>
           <Link href={"/dashboard/saved-profiles"} >اگهی های ذخیره شده</Link>
            {role=="ADMIN"&&<Link href={"/dashboard/admin"} >در انتظار تایید </Link>}
            {role=="ADMIN"&&<Link href={"/dashboard/add/categorie"} >ایجاد دسته بندی</Link>}
            <Logoutbtn/>
           </div>
           <div>{children}</div>
        </div>
    );
}