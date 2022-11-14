// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Prisma, PrismaClient} from '@prisma/client'
import { User } from '@prisma/client';


const prisma = new PrismaClient();



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
      // res.status(200).json(await users())
    res.status(200).json({
        fulfillmentMessages: [
            {
                card: {
                    title: "card title",
                    subtitle: "card text",
                    imageUri:
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2011%2F01%2F14%2Farts%2F14MOVING-span%2FMOVING-jumbo.jpg&f=1&nofb=1&ipt=d992525934df99e762a810588c789b5e503404666ccb977d5465ddf8e75c2e95&ipo=images",
                    buttons: [
                        {
                            text: "button text",
                            postback:
                                "https://example.com/path/for/end-user/to/follow",
                        },
                    ],
                },
            },
        ],
    });
}

//Testing environmentz
const createMany = async()=> await prisma.user.createMany({
  data:[
    {name:"Bob",email:"hello213@world.com"},
    {name:"Bob 2",email:"bob2123@world.com"},
    {name:"Bob 3", email:"bob3123@world.com"},
    {name:"Bob 4", email:"bob4123@world.com"}

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