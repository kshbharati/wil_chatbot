import { NextApiRequest, NextApiResponse } from "next";
import { Property, Address, Enquiry } from '@prisma/client';
import { PrismaContext } from "prisma/prismaContext";

export default async function propertyHandler(req:NextApiRequest, res:NextApiResponse){
    const {pid} = req.query;

    if(!pid){
        res.status(404).json({message:"Item Id is missing!"});
        return;
    }

    let returnVal=await getPropertyById(pid as string)
    if(!returnVal || returnVal===null){
        res.status(404).json({message:"Item not found!"});
        return;
    }

    res.status(200).json(returnVal);

}

async function getPropertyById(pid:string): Promise<Property | null>{
    try {

            const property= await PrismaContext.property.findUnique({
                where: {
                    id: pid,
                },
                include:{
                    propertyImages:true,
                    enquiry:true,
                    address:true,
                    propertyInformation:true
                    
                }
            });

            if (!property) return null;
            return property;
    } catch (error) {
        console.trace(error);
    }

}