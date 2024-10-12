import { cities, services } from "../../constans/strings"
import styles from "./Homepage.module.css"
import CategoryCard from "../module/CategoryCard";
import { FiCircle } from "react-icons/fi";
import { FaCity } from "react-icons/fa6";

export default async function Homepage() {
 
  const res= await fetch("https://realstate-nine-opal.vercel.app/api/categories",{next:{revalidate:24*60*60}})
  const category=await res.json()
  
    return (
        <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید و اجاره ملک</h1>
          <ul className={styles.services}>
            {services.map((i) => (
              <li  key={i}>
                <FiCircle />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.categories}>
       {category?.data.map((i)=>(
        <CategoryCard key={i._id} data={i} />
       ))}
      </div>
      <div className={styles.city}>
        <h3>شهر های پر بازدید</h3>
        <ul>
          {cities.map((i) => (
            <li key={i}>
              <FaCity />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

    
