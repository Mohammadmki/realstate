"use client"

import { useEffect, useState } from "react";
import styles from "./addpost.module.css"
import TextInput from "../module/TextInput";
import TextList from "../module/TextList";
import toast, { Toaster } from "react-hot-toast";
import CustomDatePicker from "../module/DatePicker";
import RadioList from "../module/RadioList";
import { ThreeDots } from "react-loader-spinner";
import { services } from "@/constans/strings";
import Map from "../module/Map";
import AddCity from "../module/AddCity";





export default function Addpost({data,categorie}) {
  
 

  const [loading,setLoading]=useState(false)
    const [profileData, setProfileData] = useState({
        title: "",
        description: "",
        location: {
          city:{
            name:"",
            slog:""
          },
          position:[]

        },
        phone: "",
        price: "",
        realState: "",
        constructionDate: new Date(),
        category: "",
        rules: [],
        amenities: [],
        target:"",
      });

      
         
     useEffect(()=>{
      if(data)setProfileData(data)
     },[])
    
     useEffect(()=>{
        if(profileData.target==""){
          return
        }
        if(profileData.target=="rent"){
          setProfileData((profileData)=>({
            ...profileData,
            price:{
              DownPayment:"",
              MonthlyRent:""
            }
          }))
          return
        }else{
          setProfileData((profileData)=>({
            ...profileData,
            price:""
          }))
          return
        }
      },[profileData.target])
    
      
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
            setProfileData({   
              title: "",
              description: "",
              location: {
                city:{
                  name:"",
                  slog:""
                },
                position:[]
              },
              phone: "",
              price: "",
              realState: "",
              constructionDate: new Date(),
              category: "",
              rules: [],
              amenities: [],
              target:"",})
            toast.success(data.message) 
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
            title="شماره تماس"
            name="phone"
            Data={profileData}
            setData={setProfileData}
          />
          <TextInput
            title="بنگاه"
            name="realState"
            Data={profileData}
            setData={setProfileData}
          />
          <RadioList data={categorie} profileData={profileData} name="category" title="دسته بندی" setProfileData={setProfileData}/>
          <RadioList data={services } profileData={profileData} name="target" title="نوع آگهی" setProfileData={setProfileData} />
         {profileData.target=="buy"&&  <TextInput
            title="قیمت(تومان)"
            name="price"
            Data={profileData}
            setData={setProfileData}
          />}
          {profileData.target=="rent"&&
          <>
            <TextInput
            title="وعدیه(تومان)"
            name="DownPayment"
            Data={profileData}
            setData={setProfileData}
            
          />
          <TextInput
          title=" ماهانه(تومان)"
          name="MonthlyRent"
          Data={profileData}
          setData={setProfileData}
        />
        </>
          }
          {profileData.target=="mortgage"&& 
           <TextInput
          title=" وعدیه(تومان)"
          name="KeyMoney"
          Data={profileData}
          setData={setProfileData}
        />}
          <AddCity Data={profileData} setData={setProfileData} name="city" />
          <Map 
          title="ادرس روی نقشه"
          name="position"
          Data={profileData}
          setData={setProfileData}
          />
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
          {data? <button type="submit" onClick={editHandler}  className={styles.submit}>{loading?<ThreeDots color="white" />:"ویرایش اگهی"}</button> : <button onClick={abbHandler} type="submit" className={styles.submit} > {loading?<ThreeDots color="white"/>:"ثبت اگهی"}</button>}
        </div>
      );
}