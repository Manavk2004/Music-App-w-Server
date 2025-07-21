import express from "express"
import { randomImageGenerator } from "../controllers/randomImageGenerator.controller.js"

export const randomImage = express.Router()

randomImage.get("", randomImageGenerator)