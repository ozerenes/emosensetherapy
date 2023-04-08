import {PrismaClient} from '@prisma/client'
import nc from "next-connect"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const handler = async (req, res) => {
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        res.status(400).json({message: 'User does not exist'})
        return
    }

    const passwordHash = await bcrypt.hash(password, user.passwordSalt);

    bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err || !result) {
            res.status(400).json({message: 'Password is incorrect'})
            return
        }

        const accessToken = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {
                expiresIn: 86400 // 24 hours
            }
        );

        res.status(200).json({
            message: 'User logged in successfully',
            accessToken
        })
    })
}

export default nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Error while logging in user");
    }
}).post(handler);