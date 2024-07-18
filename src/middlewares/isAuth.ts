// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   //header --> token
//   const authHeader = req.get("Authorization");

//   if (!authHeader) {
//     return res.status(403).send("User Not Authenticated");
//   }

//   //jwt --> decode using the "mysecretkey";
//   let decodedToken: { userId: String, iat: Number, exp: Number } | null = null;
//   const token = authHeader.split(" ")[1];
//   try {
//     decodedToken = <any>jwt.verify(token, "mysecretkey");
//   } catch (error) {
//     return res.status(403).send("User Not Authenticated");
//   }

//   if (!decodedToken) {
//     return res.status(403).send("User Not Authenticated");
//   }

//   req.userId = decodedToken.userId;
//   next();
// };


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  //header --> token
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(403).send("User Not Authenticated");
  }

  //jwt --> decode using the "mysecretkey";
  let decodedToken: { userId: String, iat: Number, exp: Number } | null = null;
  const token = authHeader.split(" ")[1];
  try {
    decodedToken = <any> jwt.verify(token, "mysecretkey") as { userId: String, iat: Number, exp: Number };
  } catch (error) {
    return res.status(403).send("User Not Authenticated");
  }

  if (!decodedToken) {
    return res.status(403).send("User Not Authenticated");
  }

  req.userId = decodedToken.userId;
  next();
};

export { isAuthenticated };
