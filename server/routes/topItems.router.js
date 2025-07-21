import express from "express"
import { topItemsController } from "../controllers/topItems.controller.js"

export const topItemsRouter = express.Router()

topItemsRouter.get("", topItemsController)