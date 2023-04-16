import {PrismaClient} from "@prisma/client";
import nc from "next-connect";
import authorization from "../../middleware/authorization";

const prisma = new PrismaClient();

const list = async (req, res) => {
    const {user} = req;
    const sessions = await prisma.chatSession.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    res.status(200).json(sessions);
}

const create = async (req, res) => {
    const {user} = req;
    const session = await prisma.chatSession.create({
        data: {
            userId: user.id,
            title: req.body.title,
            createdAt: new Date(),
        }
    });
    res.status(200).json(session);
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
