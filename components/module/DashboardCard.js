"use client"

import { FiEdit } from "react-icons/fi";
import styles from "./DashboardCard.module.css"
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function DashboardCard({data}) {

 const [Loading,setLoading]=useState(false)
 console.log(data.published?"lkj":"ss")
  const router=useRouter()

   const editHandler=()=>{
    router.push(`/dashboard/my-posts/${data._id}`) 
   }
   

   const deleteHandler=async()=>{
    
    setLoading(true) 
 
    const res =await fetch(`/api/profile/delete/${data._id}`,{
      method:"DELETE",
    })
    const Data= await res.json()
     setLoading(false)
    if(Data.error){
       return toast.error(Data.error)
    }else{
      toast.success(Data.message)
      router.refresh()
    }
   }
    return (
        <div className={styles.container}>
        <Card data={data} />
        <div className={styles.main}>

          {data.published?
          <p className={styles.success} >
            منتشر شد
          </p>
          :
          <p className={styles.pending} > در صف انشار ... </p>
          }

          <button onClick={editHandler} >
            ویرایش
            <FiEdit />
          </button>
          <button disabled={Loading} onClick={deleteHandler} >
            حذف آگهی
            <AiOutlineDelete />
          </button>
        </div>
        <Toaster />
      </div>
    );
}