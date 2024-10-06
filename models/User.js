import {Schema, model, models}from "mongoose" 

const UserSchema = new Schema({
  email:{
    minLength:8,
    type:String,
    required:true
  },
  password:{
    type:String,
    minLength:8,
    required:true
  },
  role:{
    type:String,
    default:"USER"
  },
  savedpofiles:{
    profiles:[]
  }
});

const User =models.User || model("User",UserSchema)

export default User