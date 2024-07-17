//Redirect request to particular method in the controller
import { Router } from "express";
import { getUser ,updateUser} from "../controllers/user";

const router = Router();

//get ---> when id given user
router.get('/:userID', getUser);

//put -> to do modifications
router.put('/update',updateUser);

export default router;
