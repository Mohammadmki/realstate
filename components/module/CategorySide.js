"use client"


import styles from "./categorySide.module.css"
import { FaFilter } from "react-icons/fa";


import {  useSearchParams } from "next/navigation";
import Link from "next/link";



export default function CategorySide({data}) {
    





 const searchParams=useSearchParams()
 

 const query =searchParams.get("category")
 

    return (
        <div className={styles.container} >
         <p>انتخاب دسته بندی<FaFilter /></p>
        
         <ul>
            <li className={!query?styles.active:styles.onactive}  > <Link href="/buy-residential">همه</Link> </li>
            {data?.data.map((i)=>(
                <li className={query==i.slog?styles.active:styles.onactive} key={i._id} ><Link href={`/buy-residential?category=${i.slog}`} >{i.name}</Link></li>
            ))}
         </ul>
        </div>
    );
}