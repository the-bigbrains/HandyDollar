import OpenAI from "openai";
//const {Configuration, OpenAIApi} = require('openai');
import computerVision from "@/lib/computerVision";

/*const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);*/

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function gpt(attributes: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Given detected attributes from images to text, extract the item and categories the items in the following JSON format and determine is the following receipt, if it not return false: 
        {
          Name: {string}
          Price: {number}
          Quantity: {number}
          Category: {string}
          } : ${attributes}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  console.log(completion.choices);

  return completion.choices;
}
