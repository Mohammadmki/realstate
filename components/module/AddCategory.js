"use client"

import { useState, useRef } from "react"
import TextInput from "./TextInput"
import styles from "./addcategorie.module.css"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { orgnumber } from "@/utils/replaceNumber";




export default function AddCategory() {
    const uploadFile = useRef();
    const [Categorie,setCategorie]=useState({name:"",slog:"",image:null})
    const [loading,setloading]=useState(false)

    const formData = new FormData();
    const router=useRouter() 
     
    const addHandler=async()=>{
      setloading(true)
      formData.append("image", uploadFile.current.files[0])
      formData.append("name", Categorie.name)
      formData.append("slog", Categorie.slog)

      const res=await fetch("/api/categories",{
        method:"POST",
        body:formData,
      })  
      const data =await res.json()
      setloading(false)
      if(data.error){
        return toast.error(data.error)
      }else{
        toast.success(data.message)
        setCategorie({name:"",slog:"",image:""})
        router.refresh()

      }
    }
  console.log(Categorie)
    return (
       <div className={styles.container} >
        <Toaster />
        <TextInput Data={Categorie} setData={setCategorie} name={"name"} title={"اسم دسته بندی"} />
        <TextInput Data={Categorie} setData={setCategorie} name={"slog"} title={"اسلاگ"} />
       <div className={styles.image}>
        <p>افزودن عکس</p>
        <label htmlFor="image">{Categorie.image?
      <img src={URL.createObjectURL(Categorie.image)} alt="" />  
      :<MdOutlineAddHomeWork /> } </label>
        <input onChange={()=>setCategorie({...Categorie,['image']:uploadFile.current.files[0]})}  ref={uploadFile} type="file" name="image" id="image" />
        </div>
        <button disabled={loading} onClick={addHandler} >ثبت دسته بندی</button>
       </div>
    )
}