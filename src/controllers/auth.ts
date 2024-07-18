// send or rescive data to/from the database via model
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";

interface ReturnResponse{
    status: "sucess" | "error",
    msg: String,
    data:{}
  }

//registration route
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  
  let resp: ReturnResponse;

  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password, 12);

    const user = new User({ email, name, password });
    const result = await user.save();
    if (!result)
    {
      resp = { status: "error", msg: "No data Found", data: {} };
      res.send(resp);
    }
    else {
      resp = { status: "sucess", msg: "Registered Successfully", data: { userID: result._id } };
      res.status(200).send(resp);
  }
  } catch (error) {
    console.log(error);
    resp = { status: "error", msg: "No data Found", data: {} };
    res.status(403).send(resp);
  }
};

//login route
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  let resp: ReturnResponse;

  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check the user in the DB
    const result = await User.findOne({ email });

    // Check if the user exists

    if (result)
    {
      const status = await bcrypt.compare(password, result.password);
      if (status) {
        //jwt tokenization
        const token = jwt.sign({ userid: result._id }, "mysecretkey",{expiresIn:'1h'});

        resp = { status: "sucess", msg: "Logged In SuccessFully", data: {token} };
        res.status(200).send(resp);
      }
      else {
        resp = { status: "error", msg: "Incorrect Password", data: {} };
        res.status(500).send(resp);
      }
    }
    else {
      resp = { status: "error", msg: "Username Not Found", data: {} };
      res.status(500).send(resp);
    }
    
      
  } catch (error) {
    console.log(error);
    resp = { status: "error", msg: "Error Occurred", data: {} };
    res.status(500).send(resp);
  }
};

export { registerUser , loginUser};