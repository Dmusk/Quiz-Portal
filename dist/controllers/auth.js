"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
//registration route
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = yield bcryptjs_1.default.hash(req.body.password, 12);
        const user = new user_1.default({ email, name, password });
        const result = yield user.save();
        if (!result) {
            resp = { status: "error", msg: "No data Found", data: {} };
            res.send(resp);
        }
        else {
            resp = { status: "sucess", msg: "Registered Successfully", data: { userID: result._id } };
            res.status(200).send(resp);
        }
    }
    catch (error) {
        console.log(error);
        resp = { status: "error", msg: "No data Found", data: {} };
        res.status(403).send(resp);
    }
});
exports.registerUser = registerUser;
//login route
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        const email = req.body.email;
        const password = req.body.password;
        // Check the user in the DB
        const result = yield user_1.default.findOne({ email });
        // Check if the user exists
        if (result) {
            const status = yield bcryptjs_1.default.compare(password, result.password);
            if (status) {
                //jwt tokenization
                const token = jsonwebtoken_1.default.sign({ userid: result._id }, "mysecretkey", { expiresIn: '1h' });
                resp = { status: "sucess", msg: "Logged In SuccessFully", data: { token } };
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
    }
    catch (error) {
        console.log(error);
        resp = { status: "error", msg: "Error Occurred", data: {} };
        res.status(500).send(resp);
    }
});
exports.loginUser = loginUser;
