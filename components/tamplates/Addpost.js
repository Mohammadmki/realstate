"use client"

import { useEffect, useRef, useState } from "react";
import styles from "./addpost.module.css"
import TextInput from "../module/TextInput";
import TextList from "../module/TextList";
import toast, { Toaster } from "react-hot-toast";
import CustomDatePicker from "../module/DatePicker";
import RadioList from "../module/RadioList";
import { ThreeDots } from "react-loader-spinner";





export default function Addpost({data,categorie}) {
  
 

  const [loading,setLoading]=useState(false)
    const [profileData, setProfileData] = useState({
        title: "",
        description: "",
        location: "",
        phone: "",
        price: "",
        realState: "",
        constructionDate: new Date(),
        category: "",
        rules: [],
        amenities: [],
      });

      
         
     useEffect(()=>{
      if(data)setProfileData(data)
     },[])

    

       const abbHandler= async (e)=>{
       
         
        setLoading(true)
           const res=await fetch("/api/profile",{
             method: "POST" ,
             body:JSON.stringify(profileData),
             headers:{"Content-Type":"application/json" }
           })
           const data = await res.json()
           
           setLoading(false)
           if(data.error){
                   toast.error(data.error)
           }else{
            setProfileData({    title: "",
              description: "",
              location: "",
              phone: "",
              price: "",
              realState: "",
              constructionDate: new Date(),
              category: "",
              rules: [],
              amenities: [],})
            toast.success(data.message)
            console.log(data.data)
             
 
            
           }
            
       }
       const editHandler=async()=>{
        setLoading(true)
        const res=await fetch("/api/profile",{
          method:"PATCH",
          body:JSON.stringify(profileData),
          headers:{"Content-Type":"application/json"}
        })
        const data=await res.json()
        setLoading(false)
        if(data.error){
          return toast.error(data.error)
        }else{
          return toast.success(data.message)
        }
       }

      return (
        <div className={styles.container}>

          <h3>{data?"ویرایش اگهی":"ثبت اگهی"}</h3>
         <Toaster/>
          <TextInput
            title="عنوان آگهی"
            name="title"
            Data={profileData}
            setData={setProfileData}
          />
          <TextInput
            title="توضیحات"
            name="description"
            Data={profileData}
            setData={setProfileData}
            textarea={true}
          />
          <TextInput
            title="آدرس"
            name="location"
            Data={profileData}
            setData={setProfileData}
          />
          <TextInput
            title="شماره تماس"
            name="phone"
            Data={profileData}
            setData={setProfileData}
          />
          <TextInput
            title="قیمت(تومان)"
            name="price"
            Data={profileData}
            setData={setProfileData}
          />
          <TextInput
            title="بنگاه"
            name="realState"
            Data={profileData}
            setData={setProfileData}
          />
          <RadioList categorie={categorie} profileData={profileData} setProfileData={setProfileData}/>
          <TextList
            title="امکانات رفاهی"
            Data={profileData}
            setData={setProfileData}
            type="amenities"
          />
          <TextList
            title="قوانین"
            Data={profileData}
            setData={setProfileData}
            type="rules"
          />
          <CustomDatePicker profileData={profileData} setProfileData={setProfileData} />
          {data? <button type="submit" onClick={editHandler} disabled={loading} className={styles.submit}>{loading?<ThreeDots color="white" />:"ویرایش اگهی"}</button> : <button onClick={abbHandler} type="submit" disabled={loading} className={styles.submit} > {loading?<ThreeDots color="white"/>:"ثبت اگهی"}</button>}
        </div>
      );
}