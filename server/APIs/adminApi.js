import exp from 'express'
export const adminApp=exp.Router();

// API
adminApp.get("/",(req,res)=>{
  res.send({message:"from admin api"})
})