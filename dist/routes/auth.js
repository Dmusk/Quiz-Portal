"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Redirect request to particular method in the controller
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
//post -> /auth/register
router.post('/register', auth_1.registerUser);
//post -> /auth/login
router.post('/login', auth_1.loginUser);
exports.default = router;
