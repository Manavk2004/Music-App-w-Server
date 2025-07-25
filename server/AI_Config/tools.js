import OpenAI from "openai"
import { openai, supabase } from "./config.js"
import dotenv from "dotenv"

dotenv.config()


export async function getEmbedding(text){
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    })

    return { embedding: response.data[0].embedding }
}

export async function matchEmbeddingToDB( {text, matchThreshold = 0.75, matchCount = 5} ){
    const theEmbedding = await getEmbedding(text)
    console.log("The Embeddingg", theEmbedding.embedding)
    const { data, error } = await supabase.rpc('match_songs', {
        query_embedding: theEmbedding.embedding,
        match_threshold: matchThreshold,
        match_count: matchCount
    })
    if (error) throw new Error(error.message)
    return data
}

export async function findMatch({text, matchThreshold=0.75, matchCount=5}){
    const getEmbeddings = await matchEmbeddingToDB({text, matchThreshold, matchCount})
    return getEmbeddings
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
                    },
                    matchThreshold: {
                        type: "number",
                        description: "Similarity threshold (default: 0.75)"
                    },
                    matchCount: {
                        type: "number", 
                        description: "Number of matches to return (default: 5)"
                    }
                }
            },
            required: ["text"]
        }
    }
]