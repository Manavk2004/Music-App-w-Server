import express from "express"
import { savedTracksController } from "../controllers/savedTracks.controller.js"

export const savedTracksRouter = express.Router()

savedTracksRouter.get("", savedTracksController)