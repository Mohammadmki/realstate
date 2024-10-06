import styles from "./Adminpage.module.css"
import AdminCard from "../module/AdminCard";

export default function AdminPage({profiles}) {

    return (
        <div className={styles.container} >
          {profiles.length?
          <>
            {profiles.map((i)=>(
              <AdminCard key={i._id} data={i} />
            ))}
          
            </>
          :
          <h4>هیچ اگهی در انتظاری وجود ندارد</h4>
          }
        </div>
           
    );
}