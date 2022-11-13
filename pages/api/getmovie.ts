// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Prisma, PrismaClient} from '@prisma/client'
import { User } from '@prisma/client';


const prisma = new PrismaClient();


type Data = {
  fulfillmentText: string,
  source:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
      // res.status(200).json(await users())
    res.status(200).json({
        fulfillmentText:"Movie",
        source: "getmovie",
    })
}


//Testing environmentz
const createMany = async()=> await prisma.user.createMany({
  data:[
    {name:"Bob",email:"hello@world.com"},
    {name:"Bob 2",email:"bob2@world.com"},
    {name:"Bob 3", email:"bob3@world.com"},
    {name:"Bob 4", email:"bob4@world.com"}

  ],
  skipDuplicates:true
})

//Read users
const user = async (userEmail:string):Promise<User | null> =>
    await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });

const users = async (): Promise<User[] | null> => await prisma.user.findMany();

//Create users
const addUser = async (user:User):Promise<User | null>=>{
  return await prisma.user.create({data:user});
}

//Delete user
const deleteUser = async (id:number)=>{
  return await prisma.user.delete({
    where:{
      id: id
    }
  })
}