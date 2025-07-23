import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log("Current directory:", __dirname)
console.log("Looking for .env at:", path.resolve(__dirname, "../.env"))
dotenv.config({path: path.resolve(__dirname, "../.env")})




export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})


const url = process.env.SUPA_URL
const api = process.env.SUPA_KEY

export const supabase = createClient(url, api)