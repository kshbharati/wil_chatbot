import { NextApiRequest, NextApiResponse } from "next";
import { Property } from '@prisma/client';
import { PrismaContext } from "prisma/prismaContext";

export default async function propertyHandler(req:NextApiRequest, res:NextApiResponse){
    const {pid} = req.query;
    if(!pid){
        res.status(403).json({message:"Forbidden"});
        return;
    }

    let returnVal=await getPropertyById(pid as string)
    if(!returnVal || returnVal===null){
        res.status(404).json({message:"Item not found!"});
        return;
    }

    res.status(200).json(returnVal);
    return;

}

async function getPropertyById(pid:string): Promise<Property>{


    const property= await PrismaContext?.property.findUnique({
        where: {
            id: pid,
        },
        include:{
            propertyImages:true,
            enquiry:true,
            address:true,
            propertyInformation:true,
            agent:{
                include:{
                    contact:true
                }
            }
            
        }
    });
    if (!property) return null;
    return property;

}