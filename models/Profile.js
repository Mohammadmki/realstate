import { model, models, Schema } from "mongoose"

const ProfileSchema=new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:""
    },
    target:{
         type:String
    },
    location:{
        type:Schema.Types.Mixed,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    price:{
        type: Schema.Types.Mixed,
        required:true
    },
    realState:{
        type:String,
        required:false,
        default:""
    },
    constructionDate:{
        type:Date,
        required:true
    },
    category:{
        type:String,
        enum:["villa","apartment","store","office"],
        required:true
    },
    rules:{
        type:[String],
        default:[]
    },
    amenities:{
        type:[String],
        default:[]
    },
    published:{
      type:Boolean,
       default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps:true}
)

const Profile=models.Profile||model("Profile",ProfileSchema)

export default Profile