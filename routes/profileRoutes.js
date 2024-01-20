import { Router } from "express"
import { getProfile } from "../controllers/profileController.js"
import { verifyAccessToken } from "../middleware/.js"

const router = Router();

router.get("/", verifyAccessToken, getProfile)