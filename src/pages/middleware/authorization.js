import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        res.status(401).json({message: 'Not authorized'});
        return;
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        res.status(401).json({message: 'Not authorized'});
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    });

    if (!user) {
        res.status(401).json({message: 'Not authorized'});
        return;
    }

    req.user = user;
    next();
}