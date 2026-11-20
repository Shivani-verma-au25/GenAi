import express , {Router} from "express"
import { aiMessageResponseController ,deleteChatsController,getAllChatOFUserController, getMessages} from "../controllers/chat.controller.js";
const router = Router();

router.route("/ai-chat/response").post(aiMessageResponseController);
router.route("/get-all-chats").get(getAllChatOFUserController)
router.route("/:chatId/messages").get(getMessages);
router.route("/delete/:chatId").delete(deleteChatsController)



export default router;