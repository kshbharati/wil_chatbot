// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {PrismaContext} from 'prisma/prismaContext'
import { Property } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const property = await PrismaContext?.property.findMany();
    res.status(200).json(property);
}
