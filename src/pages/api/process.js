import {analyzeEmotions} from '../services/rekognition';
import {Configuration, OpenAIApi} from 'openai';
import multer from "multer";
import nc from "next-connect";
import authorization from "../middleware/authorization";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}));
const openaiModel = "text-davinci-002";

const handle = async (req, res) => {
    const imageBytes = req.file.buffer;
    const userPrompt = req.body.prompt;
    const emotion = await analyzeEmotions(imageBytes);

    const prompt = `I am now feeling ${emotion.emotionType}. What's your advice? ${userPrompt}`;

    const response = await openai.createCompletion({
        model: openaiModel,
        prompt: prompt,
    });
    const gptResponse = response.data.choices[0].text.trim();

    return res.status(200).json({
        emotion,
        gpt: {
            prompt,
            response: gptResponse,
        }
    });
}

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
})
    .use(authorization)
    .use(
        multer({storage: multer.memoryStorage()}).single("file")
    )
    .post(handle);

export const config = {
    api: {
        bodyParser: false
    }
};
export default handler;
