import { Router } from "express";
import { aSummerizerCntroller } from "../controllers/ai.controler.js";


const router = Router();

router.route("/summerizer").post(aSummerizerCntroller);

export default router;