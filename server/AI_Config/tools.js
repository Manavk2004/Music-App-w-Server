import OpenAI from "openai"
import { openai, supabase } from "./config.js"
import dotenv from "dotenv"

dotenv.config()


export async function getEmbedding({text}){
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    })

    return { embedding: response.data[0].embedding }
}

export async function matchEmbeddingToDB({ embedding, matchThreshold = 0.75, matchCount = 5 }){
    const { data, error } = await supabase.rpc('match_songs', {
        query_embedding: embedding,
        match_threshold: matchThreshold,
        match_count: matchCount
    })
    if (error) throw new Error(error.message)
    return data
}

export async function findMatch({text}){
    const { embedding } = await getEmbedding({text})
    const getEmbedding = await matchEmbeddingToDB({embedding, matchThreshold, matchCount})
    return getEmbedding
}


export const tools =[
    {
        type: "function",
        function: {
            name: "findMatch",
            description: "Retrieves songs based on the vector embedding of the user's input. These songs will give the most closely correlated songs to the users preferences/desires.",
            parameters: {
                type: "object",
                properties:{
                    text:{
                        type: "string",
                        description: "This is the user's input about their preferences/desires"
                    }
                }
            },
            required: ["text"]
        }
    }
]