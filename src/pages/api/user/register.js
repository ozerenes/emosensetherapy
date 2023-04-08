import {PrismaClient} from '@prisma/client'
import nc from "next-connect"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const handler = async (req, res) => {
    const {name, email, password} = req.body

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (existingUser) {
        res.status(400).json({message: 'User already exists'})
        return
    }

    // create password hash and salt from password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHash: passwordHash,
            passwordSalt: salt
        },
        select: {
            id: true,
        }
    })
    const userId = user.id;

    const accessToken = jwt.sign(
        {id: userId, email: email},
        process.env.JWT_SECRET,
        {
            expiresIn: 86400 // 24 hours
        }
    );

    res.status(200).json({
        message: 'User created successfully',
        accessToken
    })
}

export default nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Error while registering user");
    }
}).post(handler);
