
import Card from "../module/Card";
import CategorySide from "../module/CategorySide";
import styles from "./byresidential.module.css"
export default function Byresiedential({data,Categorie}) {

  

    return (
        <div className={styles.container} >

            <div className={styles.sidebar} ><CategorySide data={Categorie} /></div>
            <div className={styles.profiles}>
            {data.length?( <> {
               data.map((profile)=>(
                <Card key={profile._id} data={profile} />
               ))
           }</>):<h3 className="error">اگهی ثبت نشده</h3>}
           </div>
        </div>
    );
}