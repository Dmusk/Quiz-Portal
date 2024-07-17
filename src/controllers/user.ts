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

const updateUser = (req: Request, res: Response) => {
  
}

export { registerUser ,getUser , updateUser};


