import {Router} from  "express"
import { getMeUserController, userLoginRegister, userLogOutController, userRegisterController } from "../controllers/auth.controller.js";
import { authVerify } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/register").post(userRegisterController)
router.route("/login").post(userLoginRegister)
router.route("/logout").post( authVerify , userLogOutController)
router.route("/me").get( authVerify , getMeUserController)

export default router;