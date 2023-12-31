import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function gpt(attributes: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Analyze the following OCR-detected text to determine if it represents a receipt. Print ONLY the JSON format. If the text is NOT a receipt, the JSON format should only be:
        { 
          "IsReceipt": false
        }. 
        If it IS a receipt, proceed to extract the item details and categorize each item in the following JSON format :  
        {
          "Name": {string},
          "Price": {number},
          "Quantity": {number},
          "Category": {string},
        } You may also include additional JSON format transaction information if found in the text:
        {
          "TransactionID": {string},
          "TransactionDate": {string}
        }
        NOTE: Ensure that no additional information is added to the output, and only extract and categorize the requested data:
        ${attributes}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
