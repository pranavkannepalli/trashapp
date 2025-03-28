import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";


const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});


const IdentificationSchema = z.object({
    object: z.string(),
    type: z.string(),
    confidence: z.number(),
});


const ImageIdentificationSchema = z.object({
    garbage: z.array(IdentificationSchema)
});


export async function identifyGarbage(image_url: string): Promise<void> {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Can you identify what type of garbages are in this image, what type of disposing their are, and your confidence in this reading?" },
                    {
                        type: "image_url",
                        image_url: {
                            url: image_url,
                            detail: "low"
                        }
                    }
                ]
            },
        ],
        response_format: zodResponseFormat(ImageIdentificationSchema, "garbage")
    });


    console.log(completion.choices[0].message.parsed);
}
