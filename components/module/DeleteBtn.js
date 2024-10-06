"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteBtn({id}) {

    const [loading,setLoading]=useState(false)
    const router=useRouter()
   
    const deleteHandler=async()=>{
        setLoading(true)
      const res=await fetch(`/api/categories/${id}`,{
            method:"DELETE"
        })
        const data=await res.json()
        setLoading(false)
        if(data.error){
            return toast.error(data.error)
        }else{
            toast.success(data.message)
           router.refresh()
        }
    }

    return (
        <>
        <Toaster />
        <button disabled={loading} onClick={deleteHandler}><RiDeleteBin6Line />حذف</button>
        </>
    );
}