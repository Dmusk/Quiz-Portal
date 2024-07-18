"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Redirect request to particular method in the controller
const express_1 = require("express");
const user_1 = require("../controllers/user");
const isAuth_1 = require("../middlewares/isAuth");
const router = (0, express_1.Router)();
//get ---> when id given user
router.get('/:userID', isAuth_1.isAuthenticated, user_1.getUser);
//put -> to do modifications
router.put('/update', isAuth_1.isAuthenticated, user_1.updateUser);
exports.default = router;
