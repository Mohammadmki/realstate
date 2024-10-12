"use client"

import { useRef, useState } from "react";
import styles from "./signup.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
import { emailRegex } from "@/utils/Valid";
 

export default function SignInpage() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [repassword,setrepassword]=useState("")
    const [Loading,setLoading]=useState(false)
    const [Valid,setValid]=useState(true)

    const pass=useRef(null)
    const Repass=useRef(null)
    const router=useRouter()
    


   
    
    const signinHandler= async (e)=>{
      e.preventDefault()
      
       setValid(emailRegex(email))

       if(!Valid){
        return
       }else{

     setLoading(false)
      if(password!==repassword){
        Repass.current.ariaDisabled="false"
        return
      }
      if(password.length<8){
        pass.current.ariaDisabled="false"
        return
      }
      setLoading(true)
     const res= await signIn("credentials",{
        password,
        email,
        redirect:false
     })
    
     if(res.error){
        setLoading(false)
       
        toast.error(res.error)
        return
     }else{
        setLoading(false)
        toast.success("ورد به حساب با موفقیت انجام شد")
        router.push("/dashboard")
     }
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
           <form className={styles.form} >
           <h3>فرم ثبت نام</h3>
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
            <p aria-disabled="true" ref={Repass} >رمز و تکرار رمز برابر نیست  </p>
         </div>
         <button onClick={signinHandler} type="submit" > {Loading?<ThreeDots color="white" height={"22px"} width={"100%"} wrapperStyle={{margin:"0px" }}/>:"ورود"} </button>
           </form>
           <p>حساب کار بری ندارید؟
        <Link href={"/signUp"} >ثبت نام</Link>
       </p>
       <p>اکانت ادمین:<span style={{margin:"2px", color:"#304ffe"}}>mohammad@gmail.com</span></p>
        </div>
    );
}