"use client"

import { signOut } from "next-auth/react";
import styles from "./logoutbtn.module.css"
import { FiLogOut } from "react-icons/fi";

export default function Logoutbtn() {
    return (
        <button onClick={()=>signOut()} className={styles.btn} >خروج<FiLogOut/></button>
    );
}