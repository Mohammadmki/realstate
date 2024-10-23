"use client"

import { cities } from "@/constans/strings";
import styles from "./visitedcity.module.css"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";



export default function VIsitedCity() {

    const [city,setcity]=useState("")

    const searchparams=useSearchParams()
    const router=useRouter()


    useEffect(()=>{
       if(!city&&city=="") return

       const params=new URLSearchParams(searchparams)
          
       if(city){
        params.set('city',city)
       }

router.push(`https://realstate-steel.vercel.app/buy-residential?${params.toString()}`)

    },[city])

    return (
        <div className={styles.city}>
        <h3>شهر های پر بازدید</h3>
        <ul>
         {cities.map((city,index)=>(
          <li onClick={()=>setcity(city.slog)} key={index} >{city.name}</li>
         ))}
        </ul>
      </div>
    );
}