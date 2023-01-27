import { NextApiRequest, NextApiResponse } from "next";
import {User, Prisma, PrismaClient, ChatbotEnquiry} from '@prisma/client'
import { PrismaContext } from "@prismaContext";

const prisma = new PrismaClient();

type UserApiRequest = NextApiRequest & {
    id:number;
}

interface UserId{
  id:number
}

// //Read users
// async function  user(userId:any):Promise<User | null>{
//     return await prisma.user.findUnique({
//         where: {
//             id: userId,
//         },
//     });
// }

//http://localhost/api/user/claf8ct4p0000dwqjpz5sqo12

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {uid} = req.query;
    const user: User| null= await prisma.user.findUnique({
        where: {
            id: uid as string,
        },
        include:{
          contact:true
        }
    });

    const enquiries: ChatbotEnquiry[] =
        await PrismaContext?.chatbotEnquiry.findMany();



    res.status(200).json({user:user,enquiries:enquiries});
}

