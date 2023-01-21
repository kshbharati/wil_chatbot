import { PrismaContext } from "@prismaContext";
import {ChatbotEnquiry, Prisma, PrismaClient} from '@prisma/client';
import { FulfillmentResponse } from "@/types/fulfillmentTypes";
interface EnquiryParameters{
    person : {name:String},
    email:String,
    phoneNumber:String,
}
export default async function processEnquiryForm(params): Promise<FulfillmentResponse | any> {
    let name=params.person.name;
    let email= params.email;
    let contact = params['phone-number'];
    let description = "Property";
    const chatbotEnquiry: ChatbotEnquiry = 
        await PrismaContext.chatbotEnquiry.create({
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
            ],
        };
}