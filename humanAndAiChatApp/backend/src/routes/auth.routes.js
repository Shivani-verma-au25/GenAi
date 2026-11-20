import {Router} from  "express"
import { userLoginRegister, userRegisterController } from "../controllers/auth.controller.js";

const router = Router();


router.route("/register").post(userRegisterController)
router.route("/login").post(userLoginRegister)

export default router;