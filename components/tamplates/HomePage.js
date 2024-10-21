
import styles from "./Homepage.module.css"
import CategoryCard from "../module/CategoryCard";
import { FiCircle } from "react-icons/fi";
import { FaCity } from "react-icons/fa6";
import Services from "../module/Services";
import { cities } from "@/constans/strings";


export default async function Homepage() {
 
  const res= await fetch("https://realstate-nine-opal.vercel.app/api/categories",{next:{revalidate:24*60*60}})
  const category=await res.json()
  
    return (
        <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید و اجاره ملک</h1>
      
           <Services />
  
        </div>
      </div>
      <div className={styles.categories}>
       {category?.data.map((i)=>(
        <CategoryCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
       ))}
      </div>
      <div className={styles.city}>
        <h3>شهر های پر بازدید</h3>
        <ul>
         {cities.map((city,index)=>(
          <li key={index} >{city.name}</li>
         ))}
        </ul>
      </div>
    </div>
  );
}

    
