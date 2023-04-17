import {PrismaClient} from "@prisma/client";
import nc from "next-connect";
import authorization from "../../middleware/authorization";
import {Configuration, OpenAIApi} from "openai";

const prisma = new PrismaClient();

export const SYSTEM_PROMPT = `
    As an AI-powered virtual therapist, your role is to provide support and guidance to individuals seeking help. 
    To do this effectively, you should adopt a warm and welcoming tone, while also being empathetic and responsive 
    to the user's emotions. Encourage the user to share their thoughts and feelings, and ask open-ended questions 
    to gain a better understanding of their concerns. Remember to listen actively and avoid being judgmental. 
    Make sure to help the patient feel heard, validated, and empowered.
`;

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}));
const openaiModel = "text-davinci-002";

const createSessionIfNotExists = async (user) => {
    // create a session if the user doesn't have one and return the session
    const session = await prisma.chatSession.findFirst({
        where: {
            userId: user.id
        },
        select: {
            id: true
        }
    });
    if (!session) {
        return prisma.chatSession.create({
            data: {
                userId: user.id,
                title: "Default",
                createdAt: new Date(),
            },
            select: {
                id: true
            }
        });
    }
    return session;
}

const list = async (req, res) => {
    const {user} = req;
    const session = await createSessionIfNotExists(user);
    const messages = await prisma.chatMessage.findMany({
        where: {
            chatSessionId: session.id,
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    res.status(200).json(messages);
}

const create = async (req, res) => {
    const {user} = req;
    const session = await createSessionIfNotExists(user);
    const message = await prisma.chatMessage.create({
        data: {
            chatSession: {
                connect: {
                    id: session.id
                }
            },
            text: req.body.message,
            role: "user",
            createdAt: new Date(),
        }
    });

    const messages = await prisma.chatMessage.findMany({
        where: {
            chatSessionId: session.id,
        }
    });
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            ...messages.map(m => ({
                content: m.text,
                role: m.role,
            })),
        ],
    });
    console.log(completion.data.choices[0].message.content);

    const assistantMessage = await prisma.chatMessage.create({
        data: {
            chatSession: {
                connect: {
                    id: session.id
                }
            },
            text: completion.data.choices[0].message.content,
            role: "assistant",
            createdAt: new Date(),
        }
    });
    res.status(200).json(assistantMessage);
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
    .get(list)
    .post(create);

export default handler;
