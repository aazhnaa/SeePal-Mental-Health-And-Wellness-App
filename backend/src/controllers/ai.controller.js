//import OpenAI from "openai";
import fetch from "node-fetch";
import { config } from "dotenv";
config()
import OpenAI from "openai"
const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

export const getResponse = async (req, res) => {    
    
    try {
        const {text} = req.body;
        console.log(text);

        const raw = await client.chat.completions.create({
            messages:[
                { role: "system", content: "You are a caring and understanding assistant who will help user with whatever they have on their mind. Please provide short response with bullet points. avoid using emojis" },
                { role: "user", content: `${text}` },
            ],
            model:modelName
        })
        const response = raw;
        return res.status(200).json({res: response.choices[0].message.content});
    } catch (error) {
        //console.log("error in controller : ", error);
        res.status(500).json({error: error.message});
    }
};

