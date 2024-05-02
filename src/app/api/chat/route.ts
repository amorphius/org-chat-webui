import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const { messages } = await req.json();
    
    if(!process.env.OPENAI_API_KEY) {
        return new Error('Missing OPENAI_API_KEY')
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages,
    });
    
    console.log('\n~~POST, response', response, 'route.ts:19');

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
