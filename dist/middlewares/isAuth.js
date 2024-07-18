"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    //header --> token
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(403).send("User Not Authenticated");
    }
    //jwt --> decode using the "mysecretkey";
    let decodedToken = null;
    const token = authHeader.split(" ")[1];
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, "mysecretkey");
    }
    catch (error) {
        return res.status(403).send("User Not Authenticated");
    }
    if (!decodedToken) {
        return res.status(403).send("User Not Authenticated");
    }
    req.userId = decodedToken.userId;
    next();
};
exports.isAuthenticated = isAuthenticated;
