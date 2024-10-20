"use client"
import { cities } from "@/constans/strings";
import { useRouter, useSearchParams } from "next/navigation";
import {Suspense, useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";


export default function Showcity() {
     const [City,setCity]=useState("")
  
     const btn=useRef(null) 
     const list=useRef(null)
     const searchParams=useSearchParams()
     const router=useRouter()
    
     useEffect(()=>{
        const params=new URLSearchParams(searchParams)
        if(!City) {
           params.delete('city')
            return
        }
        params.set('city',City)
        
        router.push(`http://localhost:3000/buy-residential?${params.toString()}`)
     },[City])
   
     const showHandler=(e)=>{
    const ul =list.current.ariaDisabled
    if(ul=="false"){
        list.current.ariaDisabled="true"
      return
    }
       if(ul=="true"){
        list.current.ariaDisabled="false"
        return
       }
      }
      const paramsHandler=(city)=>{
        list.current.ariaDisabled="true"
        setCity(city.slog)
        btn.current.childNodes[1].data=city.name
      }
     

    return (
      <Suspense fallback={<div>Loading</div>}>
        <div>
        <button ref={btn} onClick={showHandler} ><FaLocationDot />شهر</button>
        <ul ref={list} aria-disabled="true" >
          {cities.map((city,index)=>(
            <li onClick={()=>paramsHandler(city)} key={index} >{city.name}</li>
          ))}
        </ul>
     </div>
     </Suspense>
    );
}