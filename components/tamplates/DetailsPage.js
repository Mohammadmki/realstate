
import { SiHomebridge } from "react-icons/si";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { LiaPhoneSolid } from "react-icons/lia";
import { e2p, sp } from "@/utils/replaceNumber";
import Sharedbtn from "../module/Sharedbtn";
import { icons } from "@/constans/icons";
import { categories } from "@/constans/strings";
import styles from "./DetailsPage.module.css"


export default function DetailsPage({data,user}) {

    let saves

    if(user){
         saves=user?.savedpofiles.profiles
    }else {
        saves=""
    }

    return (
        <div className={styles.container} >
            <div className={styles.desc} >
              <h3>{data?.title}</h3>
              <p>{data?.location}<HiOutlineLocationMarker /></p>
              <h3>توضیحات</h3>
              <p>{data?.description}</p>
              <h3>امکانات</h3>
              {data?.amenities.length?(
              <ul>
                {data?.amenities.map((amenities,index)=>(
                    <li key={index} >{amenities}</li>
                ))}
              </ul>       
              ):<span>هیچ موردی ذکر نشده</span>}
              <h3>قوانین</h3>  
              {data?.rules.length<0?(
                    <ul>
                        {data.rules.map((i)=>(
                            <li>{i}</li>
                        ))}
                    </ul>
              ):<span>هیچ موردی ذکر نشده</span>}
            </div>
            
            <div className={styles.descside} >
               
              <div className={styles.reatstate} >
              <SiHomebridge />
              <h4> املاک {data?.realState}</h4>
              <p>{e2p(data?.phone)}<LiaPhoneSolid/></p>
              </div>
              <Sharedbtn id={data._id} saves={saves} />
            <div className={styles.info} >
                <h5>
                    {icons[data?.category]}
                    {categories[data?.category]}
                </h5>
                  <span>{sp(data?.price)}تومان</span>
                  <p><FaRegCalendarCheck/>{new Date(data?.constructionDate).toLocaleDateString("fa-IR")}</p>
            </div>
            </div>
        </div>
    );
}