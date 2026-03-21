import { userAuthor } from '../models/userAuthorModel.js';

async function createUserOrAuthor(req,res) {
  // get user or author object from req
  const newUserAuthor=req.body;
  // find user by email id
  const userInDb=await userAuthor.findOne({email:newUserAuthor.email})
  // if user or author existed
  if(userInDb!==null){
    // check with role
    if(newUserAuthor.role===userInDb.role){
      res.status(200).send({message:newUserAuthor.role,payload:userInDb});
    }
    else{
      res.status(200).send({mesaage:"Invalid Role"});
    }
  }
  else{
    let newUser=new userAuthor(newUserAuthor);
    let newUserOrAuthorDoc=await newUser.save();
    res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
  }
}

export default createUserOrAuthor;