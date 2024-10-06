"use client"

import { LuShare2 } from "react-icons/lu";
import styles from "./sharedbtn.module.css"
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { FaBookmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Sharedbtn({id,saves}) {

    const [thereis,setThereis]=useState(false)
    const [url,seturl]=useState()
    useEffect(()=>{
        seturl(window.location.href)
    },[])

    useEffect(()=>{
     
        if(!saves) return

        const isSaved= saves.filter((i)=>i._id==id)
       console.log(isSaved)
        if(isSaved.length){
            setThereis(true)
        }else{
            setThereis(false)
        }
    

    },[saves])

   const router=useRouter()
    
    const saveHandler=async()=>{
       const res=await fetch("/api/user",{
        method:"PATCH",
        body:JSON.stringify(id),
        headers:{"Content-Type":"application/json" }
       })
       const data= await res.json()
       
       if(data.error){
        router.refresh()
         return toast.error(data.error)
         
       }else {
        router.refresh()
       }
          
    }

    return (
        <div className={styles.share}>
            <Toaster />
        <CopyToClipboard text={url}>
        <div  >
            <p> <LuShare2 />اشتراک گذاری</p>
        </div>
        </CopyToClipboard>
       {!thereis?
        <p className={styles.bookmark} onClick={saveHandler} ><FaRegBookmark/>ذخیره اگهی</p>
       :
       <p className={styles.bookmark} onClick={saveHandler} ><FaBookmark/>برداشتن اگهی</p>
       }
        </div>
    );
}