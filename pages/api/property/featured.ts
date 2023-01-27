import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaContext } from "prisma/prismaContext";
import { Address, ChatbotEnquiry, Property, PropertyImages, PropertyInformation } from "@prisma/client";

interface FacingProperty extends Property{
    propertyInformation:PropertyInformation;
    address:Address;
    propertyImages:PropertyImages[];
}
/**
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async function FeaturedHandler(req:NextApiRequest, res:NextApiResponse)
{
    const enquiries:ChatbotEnquiry[] = await PrismaContext?.chatbotEnquiry.findMany(
        {
            where:{
                enquiryDescription:{
                    not:"Property",
                    
                }
            }
        }
    );


    if(!enquiries){
        res.status(404).json({ message: "No Featured can be found" });
        return;
    }


    let properties:string[]=[];

    for(let enquiry of enquiries)
    {

        if(!enquiry.enquiryDescription) continue;


        let alreadyHasItem=false;
        if(properties.length!=0)
        {
            for (let propId of properties) {
                if (propId === enquiry.enquiryDescription) {
                    alreadyHasItem = true;
                    break;
                }
            }
        }


        if(alreadyHasItem) continue;
        properties.push(enquiry.enquiryDescription);
    }

    if(!properties){
        res.status(404).json({ message: "No Featured can be found" });
        return;
    }

    let featuredList:FacingProperty[]=[];
    for(let propId of properties)
    {  
        const prop= await PrismaContext?.property.findUnique({
            where:{
                id:propId
            },
            include:{
                propertyInformation:true,
                address:true,
                propertyImages:true
            }
        });

        if(prop) featuredList.push(prop);
    }
    res.status(200).json(featuredList);
    return;
}