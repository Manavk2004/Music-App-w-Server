import express from "express"
import { songTransfer } from "../controllers/aiConfig.controller.js"


console.log("Helli from router")
export const aiConfigRouter = express.Router()
aiConfigRouter.post("", songTransfer)