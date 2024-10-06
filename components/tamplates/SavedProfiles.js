"use client"

import { AiOutlineDelete } from "react-icons/ai";
import Card from "../module/Card";
import styles from "./savedProfile.module.css"
import { LuShare2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";


export default function SavedProfiles({data}) {
    
    const [Loading,setLoading]=useState(false)

    const router =useRouter()

    const deleteHandler=async(id)=>{
        setLoading(true)
        const res=await fetch("/api/user",{
            method:"PATCH",
            body:JSON.stringify(id),
            headers:{"Content-Type":"application/json" }
           })
           const data= await res.json()
           setLoading(false)
           if(data.error){
            router.refresh()
             return toast.error(data.error)
             
           }else {
            router.refresh()
           }
    }

    return (
        <div className={styles.container} >
            <Toaster />
            {data?.savedpofiles.profiles.map((profile)=>(
                <div key={profile._id} className={styles.card} >
                <Card data={profile} />
                <div className={styles.btn} >
                <button disabled={Loading} onClick={()=>deleteHandler(profile._id)} ><AiOutlineDelete/>حذف</button>
                <button><LuShare2 />اشتراک گذاری</button>
                </div>
                </div>
            ))}
        </div>
    );
}