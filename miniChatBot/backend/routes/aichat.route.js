import {Router} from "express";
import { aiChatbot } from "../controllers/aiChat.controller.js";

const router = Router();


router.route('/ai-chat').post(aiChatbot)


export default router;