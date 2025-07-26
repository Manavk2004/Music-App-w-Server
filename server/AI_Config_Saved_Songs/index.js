import { openai } from "./config.js"
import { matchEmbeddingToDB, findMatch, tools } from "./tools.js"


export async function agent(songs){
    const messages = [
        {role: 'system', content: `You are now an expert being an AI agent. You will be going through a user's most liked songs and will be returning songs from a database based on the similarity between vector embeddings. 
            USE THE TOOL EVERY TIME AS YOU NEED TO GIVE ACCURATE ANSWERS BASED ON THE DATABASE
        `},
        {role: 'user', content: songs.join('')}
    ]

    const MAX_ITERATIONS = 5

    for(let i = 0; i < MAX_ITERATIONS; i++){
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
            tools
        })
        const message = response.choices[0].message
        messages.push(message)
        console.log(message.tool_calls)

        if(message.tool_calls){
            try{
                for(const toolCall of message.tool_calls){
                    if (toolCall.function.name === "findMatch"){
                        const args = JSON.parse(toolCall.function.arguments)
                        console.log("The args in song array", args)
                        console.log("Starting findMatch await")
                        const result = await findMatch(args)
                        console.log("Finished findMatch await")
                        if(!result){
                            console.log("There is no result")
                        }
                        console.log(result)
                        const results = result.map(({ id, song, similarity}) => ({
                            id,
                            song,
                            similarity
                        }))
                        messages.push({
                            role: 'tool',
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(results)
                        })
                    }
                }
            }catch(err){
                console.log("Unable to complete tool_call", err)
            }
        }else{
            console.log("Final Answer", message.content)
            return messages.content
        }

    }
}