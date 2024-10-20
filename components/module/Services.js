"use client"

import { services } from "@/constans/strings";
import styles from "./services.module.css"
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



export default function Services() {
const [Service,setService]=useState("")

   const searchParams=useSearchParams()
   const pathName=usePathname()
   const router=useRouter()
   
  


   useEffect(()=>{
    if(!Service) return
   const params=new URLSearchParams(searchParams);
   if(Service&&Service!=="All"){
    params.set('service',Service)
   }else {
    params.delete('service')
   } 
   router.push(`http://localhost:3000/buy-residential?${params.toString()}`)
   },[Service])
 
   const select=searchParams.get('service')
    return (
      <Suspense fallback={<div>Loading</div>}>
      
        <div className={styles.services}>
       <div>
        <label htmlFor="All" >همه</label>
        <input checked={Service=="All"} type="radio" onChange={()=>setService("All")} />
       </div>
        {services.map((i,index) => (
            <div key={index}>
             <label htmlFor={i.slog} >{i.name}</label>
             <input value={i.slog}  checked={i.slog===select} type="radio" name={i.slog} id={i.slog}  onChange={(e)=>setService(e.target.value)} />
            </div>
        ))}
      </div>
      </Suspense>
    );
}