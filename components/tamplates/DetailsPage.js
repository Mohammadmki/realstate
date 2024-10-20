
import { SiHomebridge } from "react-icons/si";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { LiaPhoneSolid } from "react-icons/lia";
import { e2p, sp } from "@/utils/replaceNumber";
import Sharedbtn from "../module/Sharedbtn";
import { icons } from "@/constans/icons";
import { categories } from "@/constans/strings";
import styles from "./DetailsPage.module.css"
import Map from "../module/Map";
import connectDB from "@/utils/connect";
import Profile from "@/models/Profile";



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
              <p>{data?.location.city.name}<HiOutlineLocationMarker /></p>
              <Map loc={data.location.position} />
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
              {data?.rules.length?(
                    <ul>
                        {data.rules.map((rules,index)=>(
                            <li key={index} >{rules}</li>
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
         {data.target=="rent"&&
      <>
      <span>وعدیه :   {sp(data.price.Downpayment)}تومان</span>
      <span>اجاره :   {sp(data.price.mountly)}تومان</span>
      </>
      }
      {data.target=="buy"&& <span>قیمت :   {sp(price)}</span>}
      {data.target=="mortgage"&& 
      <>
      <span>وعدیه :   {sp(data.price)}</span>
      <span>رهن کامل</span>
      </>
      }
                  <p><FaRegCalendarCheck/>{new Date(data?.constructionDate).toLocaleDateString("fa-IR")}</p>
            </div>
            </div>
        </div>
    );
}
