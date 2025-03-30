import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";


const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});


const IdentificationSchema = z.object({
    object: z.string(),
    type: z.enum(["Trash", "Recycle", "Compost"]),
});


const ImageIdentificationSchema = z.object({
    garbage: z.array(IdentificationSchema)
});


function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}


export async function identifyGarbage(image: File): Promise<z.infer<typeof ImageIdentificationSchema> | null> {
    const base64Image = await fileToBase64(image);

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
                            url: `data:image/jpeg;base64,${base64Image}`,
                            detail: "low"
                        }
                    }
                ]
            },
        ],
        response_format: zodResponseFormat(ImageIdentificationSchema, "garbage")
    });


    return completion.choices[0].message.parsed;
}
