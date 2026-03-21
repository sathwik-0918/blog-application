import {Schema,model} from "mongoose";

// define user or author schema
const userAuthorSchema=new Schema({
  role:{
    type:String,
    required:true,
  },
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  profileImgUrl:{
    type:String,
  },
  isActive:{
    type:Boolean,
    default:true,
  }
},{"strict":"throw"})

// creating and exporting model for userAuthor schema
export const userAuthor=model("userauthor",userAuthorSchema)