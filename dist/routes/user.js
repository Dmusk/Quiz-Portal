"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Redirect request to particular method in the controller
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/register', user_1.registerUser);
exports.default = router;
