//Redirect request to particular method in the controller
import { Router } from "express";
import { registerUser ,loginUser} from "../controllers/auth";

const router = Router();
//post -> /auth/register
router.post('/register', registerUser);

//post -> /auth/login
router.post('/login', loginUser);

export default router;