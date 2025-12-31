import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

const createMessagesString=(messages)=>{
return messages.map(message=>`${message.role} : ${message.content}`).join('\n');
}
const SYSTEM_PROMPT={
    role : 'system',
    content : 'Behave like a teacher saying to its students and give message in 50 words '
}

const TITLE_PROMPT={
    role : 'system',
    content : 'Generate a title for me based on the messages in not more than 4 words'
}
export async function generateContent(prompt,model="gemini-2.5-flash",messages=[]) {
const newPrompt={
    role : 'user',
    content : prompt
}
const allMessages=[SYSTEM_PROMPT,...messages,newPrompt];
const newMessageList=createMessagesString(allMessages);
  const result = await ai.models.generateContent({
    model ,
    contents:newMessageList,
  });
  return result.text;
}


export async function generateTitle(messages) {

const allMessages=[TITLE_PROMPT,...messages];
const newMessageList=createMessagesString(allMessages);
  const result = await ai.models.generateContent({
    model :  "gemini-2.5-flash",
    contents:newMessageList,
  });
  return result.text;
}
