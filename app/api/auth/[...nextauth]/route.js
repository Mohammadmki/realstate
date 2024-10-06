import User from "@/models/User";
import { Verifypassword } from "@/utils/auth";
import connectDB from "@/utils/connect";
import CredentialsProvider from "next-auth/providers/credentials";
import nextAuth from "next-auth";

export const authOptions={ session:{strategy:"jwt"},
providers:[
    CredentialsProvider({
       async authorize(credentials){
       
        const {email,password}=credentials

        try {
          await connectDB()
             
        } catch (error) {
          throw new Error("مشکل در سرور بوجود امده")
        }
        if(!email||!password||password.length<8){
            throw new Error("لطفا رمز عبود و ایمیل معتبر وارد کنید")
        }
        const user=await User.findOne({email})
        
        if(!user){
            throw new Error("حساب کار بری وجود ندارد لطفا ثبت نام کنید")
        }
        const isValid= await Verifypassword(password,user.password)
        
        if(!isValid)  throw new Error("زمرعبور یا ایمیل اشتباه است")

          return {email}
       }
    })
]}

const handler= nextAuth(authOptions)

export {handler as GET , handler as POST}