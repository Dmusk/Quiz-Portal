//Redirect request to particular method in the controller
import { Router } from "express";
import { getUser ,updateUser} from "../controllers/user";
import { isAuthenticated } from "../middlewares/isAuth";

const router = Router();

//get ---> when id given user
router.get('/:userID', isAuthenticated, getUser);

//put -> to do modifications
router.put('/update',isAuthenticated, updateUser);

export default router;
