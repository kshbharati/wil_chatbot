import { NextApiRequest, NextApiResponse } from "next";
import {User, Prisma, PrismaClient, ChatbotEnquiry} from '@prisma/client'
import { PrismaContext } from "prisma/prismaContext";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {uid} = req.query;
    if(!uid)
    {
      res.status(403).json({message:"Forbidden"});
      return;
    }
    const user: User| null= await PrismaContext.user.findUnique({
        where: {
            id: uid as string,
        },
        include:{
          contact:true
        }
    });

    if(!user){
      res.status(404).json({message:"Not Found"});
      return;
    }
    const enquiries: ChatbotEnquiry[] =
        await PrismaContext?.chatbotEnquiry.findMany();



    res.status(200).json({user:user,enquiries:enquiries});
}

