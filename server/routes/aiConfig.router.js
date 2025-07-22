import express from "express"
import { aiConfig } from "../controllers/aiConfig.controller.js"

export const aiConfigRouter = express.Router()
aiConfigRouter.get("", aiConfig)