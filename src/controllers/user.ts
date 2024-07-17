// send or rescive data to/from the database via model
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface ReturnResponse{
    status: "sucess" | "error",
    msg: String,
    data:{}
  }

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  
  let resp: ReturnResponse;

  try {
    const user = new User(req.body);
  const result = await user.save();
  if (!result)
  {
    resp = {status:"error",msg:"No data Found",data:{}}
    res.send(resp);
  }
  else {
    resp = {status:"sucess",msg:"Registered Successfully",data:{userID:result._id}}
    res.send(resp);
  }
  } catch (error) {
    resp = {status:"error",msg:"No data Found",data:{}}
    res.status(403).send(resp);
  }
  
};

const getUser = async (req: Request, res: Response) => {
  let resp: ReturnResponse;

  try{
  const userid = req.params.userID;
  const result = await User.findById(userid);
  if (!result)
  {
    resp = {status:"error",msg:"No data Found",data:{}}
    res.send(resp);
  }
  else {
    resp = {
      status: "sucess", msg: "Found Successfully", data: {
        name: result.name,
        email: result.email,
        password: result.password
    }}
    res.send(resp);
  }
  } catch (error) {
    console.log(error);
    resp = {status:"error",msg:"No data Found",data:{}}
    res.status(403).send(resp);
  }
}


const updateUser = async (req: Request, res: Response, next: NextFunction) => {

  let resp: ReturnResponse;

  try {
    const userid = req.body.id;
    const user = await User.findById(userid);
    if (!user)
    {
      resp = {status:"error",msg:"No data Found",data:{}}
      res.send(resp);
    }
    else {
      user.name = req.body.name;
      await user.save();
      resp = { status: "sucess", msg: "Modified Successfully", data: {} };
      res.send(resp);
    }
    

  } catch (error) {
    console.log(error);
    resp = {status:"error",msg:"No data Found",data:{}}
    res.status(403).send(resp);
  }
};

export { registerUser ,getUser , updateUser};


