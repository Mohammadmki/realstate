import {compare, hash} from "bcrypt"

const HashPassword= async (password)=>{
  const hashedpass= await hash(password,12)
  return hashedpass
}

const Verifypassword=async(password,hashpassword)=>{
    const isValid=await compare(password,hashpassword)
    return isValid
}

export {HashPassword,Verifypassword}