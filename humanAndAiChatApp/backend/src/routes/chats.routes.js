import {Router} from "express"
import { aiMessageResponseController } from "../controllers/chat.controller.js";
const router = Router();

router.route("/ai-message-response").post(aiMessageResponseController);

export default router;