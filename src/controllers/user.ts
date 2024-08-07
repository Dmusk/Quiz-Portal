// send or rescive data to/from the database via model
import { Request, Response, NextFunction } from "express";

import User from "../models/user";

interface ReturnResponse{
    status: "sucess" | "error",
    msg: String,
    data:{}
  }


//get detials route
const getUser = async (req: Request, res: Response) => {
  // console.log(req.userId);
  let resp: ReturnResponse;

  try {
    const userId = req.params.userID;
    if (userId != req.userId)
    {
      const err = new Error("Not Access");
      throw err;
    }
    const result = await User.findById(userId);
    if (!result) {
      resp = { status: "error", msg: "No data Found", data: {} };
      res.send(resp);
    } else {
      resp = {
        status: "sucess", msg: "Found Successfully", data: {
          name: result.name,
          email: result.email,
          password: result.password
        }
      };
      res.send(resp);
    }
  } catch (error) {
    console.log(error);
    resp = { status: "error", msg: "This is Catch Error Found", data: {} };
    res.status(403).send(resp);
  }
};


//Update PUT route
const updateUser = async (req: Request, res: Response, next: NextFunction) => {

  let resp: ReturnResponse;

  try {
    const userid = req.body.id;
    if (userid != req.userId)
    {
      const err = new Error("Not Access TO this");
      throw err;
    }
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

export { getUser , updateUser };


