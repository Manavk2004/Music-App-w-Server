import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()


export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})


const url = process.env.SUPA_URL
const api = process.env.SUPA_KEY

export const supabase = createClient(url, api)