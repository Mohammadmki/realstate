
import styles from "./categorylist.module.css"
import DeleteBtn from "./DeleteBtn";

export default async function CategoryList() {
   
    const res= await fetch("http://localhost:3000/api/categories",{cache:"no-store"})
    const data=await res.json()
    
    const showHandler=(e)=>{
        console.log(e)
    }

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