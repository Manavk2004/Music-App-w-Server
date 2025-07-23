import express from "express"
import { dataTransfer } from "../controllers/aiConfig.controller.js"


console.log("Helli from router")
export const aiConfigRouter = express.Router()
aiConfigRouter.post("", dataTransfer)