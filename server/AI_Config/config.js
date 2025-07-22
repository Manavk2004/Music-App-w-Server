import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})


const url = process.env.SUPA_URL
const key = process.env.SUPA_KEY

export const supabase = createClient(url, api)