import dotenv from 'dotenv';
dotenv.config();//process.env

import exp from 'express'
const app=exp();
import mongoose from 'mongoose'
import { userApp } from './APIs/userApi.js';
import { authorApp } from './APIs/authorApi.js';
import { adminApp } from './APIs/adminApi.js';


const port=process.env.PORT || 4000;


// db connection
mongoose.connect(process.env.DBURL)
  .then(()=>{
    app.listen(port,()=>console.log(`server listening on port ${port}..`))
    console.log("db connection success")
  })
  .catch(err=>console.log("Error in DB connection",err))



app.use(exp.json())
// connecting api routes
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)