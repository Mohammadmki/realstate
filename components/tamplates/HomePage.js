
import styles from "./Homepage.module.css"
import CategoryCard from "../module/CategoryCard";
import Services from "../module/Services";
import VIsitedCity from "../module/VIsitedCity";


export default async function Homepage() {
 
  const res='' //await fetch("http://localhost:3000/api/categories",{next:{revalidate:1*24*60*60}})
  const category=''//await res.json()
  
    return (
        <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید و اجاره ملک</h1>
      
           <Services />
  
        </div>
      </div>
      <div className={styles.categories}>
    {category==''?null:<>
      {category?.data.map((i)=>(
        <CategoryCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
       ))}</>}
      </div>
          <VIsitedCity />
    </div>
  );
}

    
