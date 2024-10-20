"use client"

import { cities } from "@/constans/strings";
import styles from "./addcity.module.css"
import { useRef, useState } from "react";

export default function AddCity({Data,setData,name}) {
 console.log(Data)
    const [show,setShow]=useState(false)
   
    const showitem=()=>{
        if(!show){
            setShow(true)
        }else{
            setShow(false)
        }  
    }
   
    const setHnadler=(city)=>{
       setData((Data)=>({
        ...Data,
        location:{
            city:{
                name:city.name,
                slog:city.slog,
            },
            position:city.position
        }
       }))
  
        
    }
   


    return (
        <div className={styles.container} >
         <button onClick={showitem} >{Data.location.city.name?Data.location.city.name:"لیست شهر ها"}</button>
         <ul className={styles.city}  aria-disabled={show}>
            {cities.map((city,index)=>(
                <li onClick={()=>setHnadler(city)}  key={index} >{city.name}</li>
            ))}
         </ul>

        </div>
    );
}