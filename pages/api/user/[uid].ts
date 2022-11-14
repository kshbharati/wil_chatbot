import { NextApiRequest, NextApiResponse } from "next";
import {User, Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

type UserApiRequest = NextApiRequest & {
    id:number;
}

interface UserId{
  id:number
}

//Read users
async function  user(userId:any):Promise<User | null>{
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}

//http://localhost/api/user/claf8ct4p0000dwqjpz5sqo12

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {uid} = req.query;
    const user: User| null= await prisma.user.findUnique({
        where: {
            id: uid,
        },
    });
    res.status(200).json(user);
}

