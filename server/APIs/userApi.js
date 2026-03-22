import exp from 'express'
import { userAuthor } from '../models/userAuthorModel.js';
import expressAsyncHandler from 'express-async-handler'
import  createUserOrAuthor  from './createUserOrAuthor.js';
import {Article} from '../models/articleModel.js'
export const userApp=exp.Router();

// API

// create new user
userApp.post("/user",expressAsyncHandler(createUserOrAuthor));

// read all articles
userApp.get("/articles",expressAsyncHandler(async(req,res)=>{
  // read all articles from db
  const listOfArticles=await Article.find({isArticleActive:true});
  res.status(200).send({message:"articles",payload:listOfArticles})
}))

// add comment
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
  // get comment obj
  const commentObj=req.body;
  // add commentObj to comments array of article
  const articleWithComments=await Article.findOneAndUpdate
  (
    {articleId:req.params.articleId},
    {$push:{comments:commentObj}},
    {returnOriginal:false}
  )
  // send res
  res.send({message:"comment added",payload:articleWithComments})
}))