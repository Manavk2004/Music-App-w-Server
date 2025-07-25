import express from "express"
import { topArtistsController } from "../controllers/topArtists.controller.js"

export const topArtistsRouter = express.Router()

topArtistsRouter.get("", topArtistsController)