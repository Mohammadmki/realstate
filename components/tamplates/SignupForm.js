"use client"

import toast, { Toaster } from "react-hot-toast";
import styles from "./signup.module.css"
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { emailRegex } from "@/utils/Valid";

export default function SignUpForm() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [repassword,setrepassword]=useState("")
  const [Loading,setLoading]=useState(false)
  const [Valid,setValid]=useState(true)

  const router=useRouter()

  const Repass=useRef(null)
  const pass=useRef(null)


  const signUpHandler= async (e)=>{
    e.preventDefault()

    setValid(emailRegex(email))

    if(!Valid){
     return
    }

    if(password.length<8){
      pass.current.ariaDisabled="false"
      return
    }
    if(password!==repassword){
      Repass.current.ariaDisabled="false"
      return
    }
    setLoading(true)
    const res=  await  fetch("/api/auth/signup",{
      method:"POST",
      body:JSON.stringify({password,email}),
      headers:{ "Content-Type":"application/json" }
    })
    const data= await res.json()
   setLoading(true)
    if(data.status==201){
        toast.success("ثبت نام و ورد با موفقیت انجام شد")
        signIn("credentials",{
          email,
          password,
          redirect:false
        })
        setLoading(false)
        router.push("/")
        return
    }else if(data.status!==201){
      setLoading(false)
      return toast.error(data.error)
     
    }
  
  }

    return (
      <div className={styles.container} >
        <Toaster
        toastOptions={{
          style:{
            fontSize:'0.8rem',
          }
        }}
        />
      <form   className={styles.form} >
        <h3>فرم ورود</h3>
          <div className={styles.formitem} >
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" autoComplete="off"  />
            <label htmlFor="email" >ایمیل</label>
            <p aria-disabled={Valid} >لطفا ایمیل معتبر وارد کنید</p>
         </div>
         <div className={styles.formitem} >
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" id="password"  autoComplete="off"  />
            <label htmlFor="password" >رمز عبور</label>
            <p ref={pass} aria-disabled="true">رمز عبور باید بیشتر از هشت حرف باشد</p>
         </div>
         <div className={styles.formitem} >
            <input value={repassword} onChange={(e)=>setrepassword(e.target.value)} type="text" id="repassword" autoComplete="off"  />
            <label htmlFor="repassword" >تکرار رمز عبور</label>
            <p aria-disabled="true" ref={Repass} >رمز و تکرار رمز اشتباه است</p>
         </div>
         <button onClick={signUpHandler} type="submit" > {Loading?<ThreeDots
          color="white" height={"22px"} width={"100%"} wrapperStyle={{margin:"0px" }}/>:"ثبت نام"} </button>
      </form>
      <p className={styles.link} >حساب کار بری دارید؟
        <Link href={"/signIn"} >ورود</Link>
      </p>
      </div>
    )}