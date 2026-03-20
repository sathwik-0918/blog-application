import exp from 'express'
import { userAuthor } from '../models/userAuthorModel.js';
export const userApp=exp.Router();

// API
userApp.get("/users",async(req,res)=>{
  // get users
  let usersList=await userAuthor.find();
  // display users
  res.send({message:"users",payload:usersList})
})