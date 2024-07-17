//Redirect request to particular method in the controller
import { Router } from "express";
import { registerUser , getUser ,updateUser} from "../controllers/user";

const router = Router();
//post
router.post('/register', registerUser);

//get ---> when id given user
router.get('/:userID', getUser);

//put -> to do modifications
router.put('/',updateUser);

export default router;
