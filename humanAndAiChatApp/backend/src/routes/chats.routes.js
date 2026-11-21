import express , {Router} from "express"
import { aiMessageResponseController ,deleteChatsController,getAllChatOFUserController, getMessages} from "../controllers/chat.controller.js";
import { authVerify } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/ai-chat/response").post(authVerify, aiMessageResponseController);
router.route("/get-all-chats").get(authVerify , getAllChatOFUserController)
router.route("/:chatId/messages").get(authVerify , getMessages);
router.route("/delete/:chatId").delete(authVerify , deleteChatsController)



export default router;