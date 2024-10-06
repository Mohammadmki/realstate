"use client"

import Link from "next/link";
import styles from "./layout.module.css"
import { MdOutlineLogin } from "react-icons/md";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";

export default function Layout({children}) {
  const{data}=useSession()
  
    return (
       <div className={styles.container} >
        <header className={styles.header} >
        <div className={styles.pages} >
        <Link href={"/"} >صفحه اصلی</Link>
        <Link href={"/buy-residential"} > اگهی ها</Link>
        </div>
        <div className={styles.login}>
         {data?<Link href={"/dashboard"} ><FaUser/></Link>:<Link href={"/signIn"} >ورود<MdOutlineLogin/></Link>}
        </div>
        </header>
       <div  style={{minHeight:"100vh"}} className={styles.children}>{children}</div>
       <footer  className={styles.footer} >
       <ul>
          <li>تعرفه قانونی</li>
          <li>دسترسی سریع</li>
          <li>مشاورین خبره</li>
          <li>قولنامه محضری</li>
        </ul>
        <div className={styles.desc}>
        <h3>سامانه خرید و اجاره ملک</h3>
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است.
        </p>
      </div>
       </footer>
       </div>
    );
}