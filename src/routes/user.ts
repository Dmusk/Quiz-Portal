//Redirect request to particular method in the controller
import { Router } from "express";
import { registerUser , getUser ,updateUser,loginUser} from "../controllers/user";

const router = Router();
//post
router.post('/register', registerUser);

//post -> /user/login
router.post('/login', loginUser);

//get ---> when id given user
router.get('/:userID', getUser);

//put -> to do modifications
router.put('/update',updateUser);

export default router;
