import styles from "./datepicker.module.css"
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function CustomDatePicker({profileData,setProfileData}) {

    const changeHandler=(e,)=>{
            const date =new Date(e)
            
            setProfileData({...profileData,constructionDate:date})
    }

    return (
        <div className={styles.container} >
            <p>تاریخ ساخت</p>
            <DatePicker 
            value={profileData.constructionDate}
            onChange={changeHandler}
            calendar={persian}
            locale={persian_fa}
             calendarPosition="bottom-right"
             style={{
                color:"black"
             }}
            />
        </div>
    );
}