//Redirect request to particular method in the controller
import { Router } from "express";
import { registerUser } from "../controllers/user";

const router = Router();
//post
router.post('/register', registerUser);



export default router;
