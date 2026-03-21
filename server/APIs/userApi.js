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
  const listOfArticles=await Article.find();
  res.status(200).send({message:"articles",payload:listOfArticles})
}))