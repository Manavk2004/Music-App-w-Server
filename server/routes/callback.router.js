import express from "express"
import { callBack } from "../controllers/callback.controller.js"

export const callBackRouter = express.Router()


callBackRouter.get("", callBack)