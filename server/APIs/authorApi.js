import exp from 'express'
import { userAuthor } from '../models/userAuthorModel.js';
import expressAsyncHandler from 'express-async-handler';
import  createUserOrAuthor  from './createUserOrAuthor.js';
import {Article} from '../models/articleModel.js'
export const authorApp=exp.Router();


// API

// create new author
authorApp.post("/author",expressAsyncHandler(createUserOrAuthor));

// create new article
authorApp.post("/article",expressAsyncHandler(async(req,res)=>{
  // get new article obj from req
  const newArticleObj=req.body;
  const newArticle=new Article(newArticleObj);
  const articleObj=await newArticle.save();
  res.status(201).send({message:":article published",payload:articleObj});
}))

// read all articles
authorApp.get("/articles",expressAsyncHandler(async(req,res)=>{
  // read all articles from db
  const listOfArticles=await Article.find({isArticleActive:true});
  res.status(200).send({message:"articles",payload:listOfArticles})
}))

// modify an article by article Id
authorApp.put("/article/:articleId",expressAsyncHandler(async(req,res)=>{
  // get the modified article
  const modifiedArticle=req.body;
  // update article by article Id
  const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,
    {...modifiedArticle},
    {returnOriginal:false})
  // send res
  res.status(200).send({message:"article modified",payload:dbRes})
}))

// delete(soft delete) an article by article Id
// modify an article by article Id
authorApp.put("/articles/:articleId",expressAsyncHandler(async(req,res)=>{
  // get the modified article
  const modifiedArticle=req.body;
  // update article by article Id
  const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,
    {...modifiedArticle},
    {returnOriginal:false})
  // send res
  res.status(200).send({message:"article deleted",payload:dbRes})
}))