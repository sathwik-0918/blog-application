import {Schema,model} from "mongoose";

// create author schema
const authorDataSchema=new Schema({
  nameOfAuthor:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  profileImageUrl:{
    type:String,
  }
},{"strict":"throw"})

// create user comment schema
const userCommentSchema=new Schema({
  nameOfUser:{
    type:String,
    required:true,
  },
  comment:{
    type:String,
    required:true,
  },
},{"strict":"throw"})

// create article schema
const articleSchema=new Schema({
  authorData: authorDataSchema,
  articleId:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true,
  },
  dateOfCreation:{
    type:String,
    required:true,
  },
  dateOfModification:{
    type:String,
    required:true,
  },
  comments: [userCommentSchema],
  isArticleActive:{
    type:Boolean,
    required:true
  }
},{"strict":"throw"})


// create and export model
export const Article=model('article',articleSchema);