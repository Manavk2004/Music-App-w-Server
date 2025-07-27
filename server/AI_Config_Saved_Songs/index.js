import { openai } from "./config.js"
import { matchEmbeddingToDB, findMatch, tools } from "./tools.js"


export async function agent(songs){
    console.log("🤖Inside agent function")
    const messages = [
        {role: 'system', content: `You are now an expert being an AI agent. You will be going through a user's most liked songs and will be returning songs from a database based on the similarity between vector embeddings. 
            PROCESS:
            1. Use the findMatch tool to search for similar songs based on the songs passed. I want one similar song per input song.
            2. DO NOT return any identical songs. All songs that are returned must be different from those found in the input. Similarity should never be 1.
            3. Return the songs, but do not give any explanations. All I need is the info about the songs.
            4. DO NOT call tools repeatedly. Use them once to get the data, and then provide your final answer.
            5. RETURN THE SONG NAME
            6. DO NOT PUT IT IN A LIST FORM WITH (" - ")

            Your goal is to give personalized music recommendations based on their history of liked songs.
        `},
        {role: 'user', content: `Find similar songs to ${songs.join(', ')}`}
    ]

    const MAX_ITERATIONS = 5

    for(let i = 0; i < MAX_ITERATIONS; i++){
        console.log("4️⃣Inside 4 foru loop")
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
            tools,
            tool_choice: 'auto'
        })
        console.log("👷Built the response")
        const message = response.choices[0].message //Actual Message output from AI
        console.log("The message variable", message)
    
        messages.push(message)
        console.log("Messages log", messages, "|||||||||||||")
        console.log("The tool calls", messages[2].tool_calls, "||||||||||||||")
        console.log(message)
        console.log("Tool Calls", message.tool_calls)

        if(message.tool_calls){
            console.log(`📝Accessing tool call ${i} for tool call`)
            console.log(`Here is the content for ${i}`, message.content)
            try{
                for(const toolCall of message.tool_calls){
                    console.log("🔨Inside tool four loop")
                    if (toolCall.function.name === "findMatch"){
                        const args = JSON.parse(toolCall.function.arguments)
                        console.log("The args in song array", args)
                        console.log("🍀Starting findMatch await")
                        const result = await findMatch(args)
                        console.log("✅Finished findMatch await")
                        if(!result){
                            console.log("There is no result")
                        }
                        // console.log("RAW RESULTS", result)
                        const results = result.map(({ id, content, similarity, song}) => ({
                            id,
                            song: song || content,
                            similarity
                        }))
                        if(!results){
                            console.log("❌No results")
                        }
                        messages.push({
                            role: 'tool',
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(results)
                        })
                        console.log("Finished pushing to messages")
                    }
                }
            }catch(err){
                console.log("Unable to complete tool_call", err)
            }
        }else{
            console.log("Final Answer", message.content)
            return message.content
        }

    }
}