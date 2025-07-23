
import OpenAI from "openai"
import dotenv from "dotenv"


dotenv.config({path: "../.env"})

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})


export async function getCurrentWeather() {
    const weather = {
        temperature: "75",
        unit: "F",
        forecast: "sunny"
    }
    return JSON.stringify(weather)
}


export async function getLocation() {
    return "San Diego, CA"
}

const availableFunctions = {
    getCurrentWeather,
    getLocation
}

async function agent(query){
    const messages = [
        {role: "system", content: "You are a helpful AI agent. Give highly specific answers based on the information you're provided. Prefer to gather information with the tools provided to you rather than giving basic, generic answers."},
        {role: "user", content: query}
    ]

    const MAX_ITERATIONS = 5

    for(let i = 0; i < MAX_ITERATIONS; i++){
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages,
            tools: [
                {
                    type: "function",
                    function: {
                        name: "getCurrentWeather",
                        description: "Get the current weather",
                        parameters:{
                            type: "object",
                            properties: {}
                        }
                    }
                },
                {
                    type: "function",
                    function: {
                        name: "getLocation",
                        description: "Get the user's current location",
                        parameters:{
                            type: "object",
                            properties: {}
                        }
                    }
                }
            ]
        })
        const responseText = response.choices[0]
        console.log(response)

        const { finish_reason: finishReason, message } = response.choices[0]
        const { tool_calls: toolCalls } = message
        
        if (finishReason === "stop"){
            console.group(message.content)
            console.log("AGENT ENDING")
            return
        }else if (finishReason === "tool_calls"){
            for (const toolCall of toolCalls){
                const functionName = toolCall.function.name
                const functionToCall = availableFunctions[functionName]
                const functionResponse = await functionToCall()
                console.log(functionResponse)
            }
        }
        }
}

await agent("Whats the weather today?")