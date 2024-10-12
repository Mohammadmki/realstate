
import styles from "./categorylist.module.css"
import DeleteBtn from "./DeleteBtn";

export default async function CategoryList() {
   
    const res= await fetch("https://realstate-nine-opal.vercel.app/api/categories",{next:{revalidate:24*60*60}})
    const data=await res.json()
    

    if(!data.data.length) return <h3 className="error" >هیچ دسته بندیی وجود ندارد</h3>
    return (
        <ul className={styles.container} >
            {data?.data.map((i)=>(
               <div   className={styles.categoryCard} key={i._id} >
               <div>
                <p> {i.name}</p>
             <p>اسلاگ:<span >{i.slog}</span></p>
             </div>
         
               <DeleteBtn h id={i._id} />
               </div>
            ))}
        </ul>
    );
}