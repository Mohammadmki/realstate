"use client"


import styles from "./categorySide.module.css"
import { FaFilter } from "react-icons/fa";


import {  usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";



export default function CategorySide({data}) {
    
const [category,setCategory]=useState("")

 const searchParams=useSearchParams()
 const pathName=usePathname()
 const router=useRouter()
 

 const query =searchParams.get("category")

 useEffect(()=>{

   const params=new URLSearchParams(searchParams)
   if(category){
    params.set('category',category)
   }else{
    params.delete('category')
   }
   router.push(`http://localhost:3000/buy-residential?${params.toString()}`)
 },[category])

    return (
        <Suspense fallback={<div>Loading</div>}>
        <div className={styles.container} >
         <p>انتخاب دسته بندی<FaFilter /></p>
        
         <ul>
            <li onClick={()=>setCategory("")} className={!query?styles.active:styles.onactive}  > <Link href="/buy-residential">همه</Link> </li>
            {data?.data.map((i)=>(
                <li onClick={()=>setCategory(i.slog)} className={query==i.slog?styles.active:styles.onactive} key={i._id} >{i.name}</li>
            ))}
         </ul>
        </div>
        </Suspense>
        
    );
}