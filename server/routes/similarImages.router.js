import express from "express"
import { similarImagesController } from "../controllers/similarImages.controller.js"

export const similarImagesRouter = express.Router()

similarImagesRouter.post("", similarImagesController)