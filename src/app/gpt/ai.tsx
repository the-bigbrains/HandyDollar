const { Configuration, OpenAIApi } = require("openai");
const attributes = require("../gpt/ai");

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
    
    const prompt = ` Given a receipt, extract the item and categories the items in the following JSON format: 
    {
        Name: {string}
        Price: {number}
        Quantity: {number}
        Category: {string}
   }`;

    const result = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        maxTokens: 300,
        temperature: 0.7,

    });


};


