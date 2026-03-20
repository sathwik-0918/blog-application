import exp from 'express'
export const authorApp=exp.Router();

// API
authorApp.get("/",(req,res)=>{
  res.send({message:"from author api"})
})