import {config} from "dotenv"
config()

import {Configuration, OpenAIApi} from "openai"
import readline from "readline"

const OpenAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY
    })
)

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()
userInterface.on("line", async input => {
    const response = await OpenAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        message: [{role: "user", content: input}]
    })
    console.log(response.data.choices[0].message.content)
    userInterface.prompt()
})