import { NextApiRequest, NextApiResponse } from "next";

import { PrismaContext } from "prisma/prismaContext";

interface LoginParams{
    username:string;
    password:string;
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method!='POST')
    {
        res.status(401).json({message:"Unauthorized"});
        return;
    }

    if(!req.body)
    {
        res.status(403).json({message:"Forbidden"});
        return;
    }

    const data:LoginParams=JSON.parse(req.body);
    if(!data.username || !data.password)
    {
        res.status(403).json({ message: "Forbidden" });
        return;   
    }


    // if(data.password!==process.env.PASSWORD)
    // {
    //     res.status(404).json({ message: "Not Found" });
    //     return;
    // }
    try{
        const result = await PrismaContext.user.findUnique({
            where: {
                email: data.username,
            },
            select:{
                id:true
            }
        });


        if (!result) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        const returnData={id:result.id}
        res.status(200).json(returnData);
    }
    catch(error){
        res.status(500).json({"message":"Server Error"})
    }



    // res.status(200).json({message:"OK"});
}