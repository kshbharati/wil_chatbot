import { PrismaContext } from "@prismaContext";
import {ChatbotEnquiry, Prisma, PrismaClient} from '@prisma/client';
import { FulfillmentResponse } from "@/types/fulfillmentTypes";


export default async function processEnquiryForm(params:any): Promise<FulfillmentResponse> {
    let name=params.person.name;
    let email= params.email;
    let contact = params['phone-number'];
    let description = "Property";

    /*
        Looks for a property Id from output context and if it finds it appends it to description variable to add in database.
    */


    if(params.propertyId) description = params.propertyId;
    const chatbotEnquiry: ChatbotEnquiry | undefined = 
        await PrismaContext?.chatbotEnquiry.create({
            data: {
                name: name,
                email: email,
                phoneNumber: contact,
                enquiryDescription: description,
            },
        });
    
    if(!chatbotEnquiry)
    {
        return {
            followupEventInput: {
                name: "FORM",
            },
        };
    }

    return {
        fulfillmentMessages: [
            {
                text: {
                    text: [
                        "Thank you " +
                            chatbotEnquiry.name +
                            " for leaving us with your contact detail. Our Agents will try to contact you within the business day.",
                        "Is that all for today?",
                    ],
                },
            },
            {
                payload: {
                    richContent: [
                        [
                            {
                                type: "chips",
                                options: [
                                    {
                                        text: "Yes",
                                    },
                                    {
                                        text: "No",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        ],
    };
}