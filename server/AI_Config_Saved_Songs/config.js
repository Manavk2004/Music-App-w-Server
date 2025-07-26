import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
console.log(path.resolve(__dirName, "../.env"))
dotenv.config({path: path.resolve(__dirName, "../.env")})



export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

const url = process.env.SUPA_URL
if(!url){
    console.log("No URL")
}
const api = process.env.SUPA_KEY
if(!api){
    console.log("No api")
}
export const supabase = createClient(url, api)