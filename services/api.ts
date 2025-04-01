import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";


const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});


const IdentificationSchema = z.object({
    object: z.string(),
    type: z.enum(["Trash", "Recycle", "Compost"]),
    index: z.string()
});


const GarbageIdentificationSchema = z.object({
    data: z.array(IdentificationSchema)
});


export type GarbageResponseType = z.infer<typeof GarbageIdentificationSchema> | null;
export type GarbageIdentification = z.infer<typeof IdentificationSchema>;


export async function identifyGarbage(base64Image: string): Promise<GarbageResponseType> {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "developer",
                content: "You are an AI garbage classifier. Your job is to detect different " +
                    "disposable items in an image and identify them and whether they are trash, " +
                    "recycle, or compost. Make sure to have a single classification for each disposable " +
                    "object (e.g. Do not classify a water bottle as a water bottle and a soda bottle)."
            },
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: base64Image,
                            detail: "low"
                        }
                    }
                ]
            },
        ],
        response_format: zodResponseFormat(GarbageIdentificationSchema, "garbage")
    });

    return completion.choices[0].message.parsed;
}
