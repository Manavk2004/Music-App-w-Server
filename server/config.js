import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})
