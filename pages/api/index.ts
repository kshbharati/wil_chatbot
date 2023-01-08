import { NextApiRequest, NextApiResponse } from "next";
import {PrismaContext} from "@prismaContext"
import {Address, Property, PropertyImages, User} from '@prisma/client'
import processPropertyListIntent from "dialogflowComponents/processPropertyListIntent";

interface DialogflowRequest{
    responseId:string,
    queryResult:{},

}

export default async function DialogFlowRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
)
{
    if(req.method !== 'POST'){
        res.status(403).json({message:"ONLY POST METHODS ALLOWED"});
        return;
    }

    // if(!req.body('queryResult')){
    //     res.status(404);
    //     return;
    // }

    const query = req.body.queryResult;
  
    const {intent, outputContexts,parameters} = query;
    if(intent.displayName==="PropertyListing")
    {
        console.log("Property");
        const message=await processPropertyListIntent(parameters);
        res.status(200).json(message);
    }

}



