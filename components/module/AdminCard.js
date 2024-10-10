"use client"


import toast, { Toaster } from "react-hot-toast";
import styles from "./adminCard.module.css"
import { sp } from "@/utils/replaceNumber";
import { useState } from "react";

import { useRouter } from "next/navigation";



  export default  function AdminCard({ data}) {

    const [loading,setLoading]=useState(false)
      
    const Router=useRouter()

      const publishHandler=async()=>{
        setLoading(true)
        const res= await fetch(`/api/profile/publish/${data?._id}`,{method:"PATCH"})
         
        const resulat=await res.json()
         setLoading(true)

         if(resulat.error) return toast.error(resulat.error)
 
            toast.success(resulat.message)
            Router.refresh()
      }
      const deleteHandler=async()=>{
        const res =await fetch(`/api/profile/delete/${data._id}`,{
          method:"DELETE",
        })
        const resualt= await res.json()
        if(resualt.error) return toast.error(resualt.error)
          toast.success(resualt.message)
          Router.refresh()
    }
      
      
      
        return (
          <div className={styles.container}>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <div className={styles.properties}>
              <span>{data.location}</span>
              <span>{sp(data.price)}</span>
            </div>
            <button disabled={loading} onClick={publishHandler} >انتشار</button>
            <button disabled={loading} onClick={deleteHandler} >حذف</button>
            <Toaster toastOptions={{
              duration:3000
            }} />
          </div>
        ) };
      
     
