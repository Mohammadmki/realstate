"use client"


import Link from "next/link";
import styles from "./categoryCard.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CategoryCard({data}) {
const [category,setcategory]=useState('')

const searchParams=useSearchParams()
const router=useRouter()

useEffect(()=>{
  
  if(!category&&category=="") return

  const params=new URLSearchParams(searchParams)
  if(category){
   params.set('category',category)
  }else{
   params.delete('category')
  }
  router.push(`https://realstate-steel.vercel.app/buy-residential?${params.toString()}`)
},[category])
 
return (
    <div onClick={()=>setcategory(data.slog)} className={styles.card}>
      <Image width={500} height={500} src={data.image} alt="image"  />
      <p>{data.name}</p>
    </div>
  );
}

export default CategoryCard;