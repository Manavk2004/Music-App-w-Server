import { openai } from "./config.js"
import { findMatch, tools } from "./tools.js"

async function agent(query){
    const messages = [
        {role: "system", content: "You are an expert in being an AI agent. You will take care and help the users with their preferences/desires about music. Perfer to gather information using the tools provided, but if you can't develop an answer with the tools, use your knowledge about music."},
        {role: "user", content: query}
    ]

    const MAX_ITERATIONS = 5

    for(let i = 0; i < MAX_ITERATIONS; i++){
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages,
            tools
        })
        const message = response.choices[0].message
        messages.push(message)

        if(message.tool_calls){
            for (const toolCall of message.tool_calls){
                if (toolCall.function.name === "findMatch"){
                    const args = JSON.parse(toolCall.function.arguments)
                    const result = await findMatch(args)

                    messages.push({
                        role: "tool", 
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(result)
                    })
                }
            }
        }else{
            console.log("Final Answer:", message.content)
            return message.content
        }
    }
}

agent("What type of music is house music? What does it sound like?")