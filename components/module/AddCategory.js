"use client"

import { useState, useRef } from "react"
import TextInput from "./TextInput"
import styles from "./addcategorie.module.css"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";





export default function AddCategory() {
    const uploadFile = useRef();
    const [Categorie,setCategorie]=useState({name:"",slog:"",image:""})
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

    return (
       <div className={styles.container} >
        <Toaster />
        <TextInput Data={Categorie} setData={setCategorie} name={"name"} title={"اسم دسته بندی"} />
        <TextInput Data={Categorie} setData={setCategorie} name={"slog"} title={"اسلاگ"} />
        <label>افزودن عکس</label>
        <input ref={uploadFile} type="file" name="image" id="image" />
        
        <button disabled={loading} onClick={addHandler} >ثبت دسته بندی</button>
       </div>
    )
}