import { FulfillmentResponse } from "@/types/fulfillmentTypes";

import {Address, Property, PropertyImages, PropertyInformation } from "@prisma/client";
import { PrismaContext } from "@prismaContext";
import {API_URI} from "../constants";
import {randomBetween} from "../helpers";
import * as IntentEvent from "../constants";

type PropertyListIntentParameters = {
    postCode: string;
    city: string;
};

interface FacingProperty extends Property{
    propertyImages?:PropertyImages[],
    propertyInformation?: PropertyInformation
}
export default async function processPropertyListIntent(
    parameters: PropertyListIntentParameters,outputContexts:any
): Promise<FulfillmentResponse>{
    

    if(!parameters || parameters===null || parameters===undefined)
    {
        let message: FulfillmentResponse = {
            followupEventInput:{
                name:IntentEvent.PropertyListingIntent
            }
        };

        return message;

    }



    const result = await PrismaContext?.address.findMany({
        where: {
            postCode: parameters.postCode,
            AND: {
                suburb: {
                    contains:parameters.city,
                },
            },
        },
        include: {
            property: {
                include: {
                    propertyImages: true,
                    agent: true,
                    propertyInformation: true,
                },
            },
        },
    });

    if (!result || result.length === 0) {
        return NotFoundMessageResponse();
    }

    
    const address = result[randomBetween(0, result.length-1)];
    let property: FacingProperty = address.property as FacingProperty;
    
    if (!property || property === undefined) {


        return NotFoundMessageResponse();
    }

    return FormatPropertyResponse(address, property,parameters,outputContexts);

}

function FormatPropertyResponse(address:Address, property:FacingProperty, parameters:any, outputContexts:any){
        //Format Address and Property Information for Response Message
    let msgAddress =
        address.addressLine1 + ", " + address.suburb + ", " + address.postCode;

    let propertyInformation = "";
    let propertyName = "";

    if (property.propertyInformation?.propertyDescription)
        propertyInformation = property.propertyInformation
            .propertyDescription as string;

    if (property.name) propertyName = property.name as string;

    //Formats thumbnail image link and alt description
    let thumbnailImageLink="";
    let altText="Image of a Property";
    
    if(property.propertyImages!==undefined && property.propertyImages.length>0)
    {
        let image:PropertyImages=property.propertyImages[0];
        thumbnailImageLink=image.imageLink as string;
        altText=image.imageDescription as string;
    }

    //Unique property URL
    let productUrl=API_URI+"/property/" +property.id;

    //Create fulfillmentMessage
    let message: FulfillmentResponse = {
        outputContexts: outputContexts,
        fulfillmentMessages: [
            {
                payload: {
                    richContent: [
                        [
                            {
                                type: "image",
                                rawUrl: thumbnailImageLink,
                                accessibilityText: altText,
                            },
                            {
                                type: "accordion",
                                text: propertyInformation,
                                title: propertyName,
                                subtitle: msgAddress,
                                image: {
                                    src: {
                                        rawUrl: thumbnailImageLink,
                                    },
                                },
                                actionLink: productUrl,
                            },
                            {
                                type: "button",
                                icon: {
                                    type: "launch",
                                    color: "black",
                                },
                                text: "Do you like this property?",
                                link: productUrl,
                            },
                            {
                                type: "list",
                                title: "Yes",
                                event: {
                                    name: IntentEvent.EnquiryFormIntent,
                                    langugeCode: "en",
                                    parameters: {
                                        propertyID:property.id
                                    },
                                },
                            },
                            {
                                type: "divider",
                            },
                            {
                                type: "list",
                                title: "No",
                                event: {
                                    name: IntentEvent.PropertyListingIntent,
                                    langugeCode: "en",
                                    parameters: parameters,
                                },
                            },
                            {
                                type: "chips",
                                options: [
                                    {
                                        text: "More",
                                    },
                                    {
                                        text: "Edit",
                                    },
                                    {
                                        text: "Cancel",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        ],
    };

    return message;
}

function NotFoundMessageResponse():FulfillmentResponse{
    return {
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            "No such Property Exist!!. Would you like to search for some other region?",
                        ],
                    },
                },
                {
                    payload: {
                        richContent: [
                            [
                                {
                                    type: "list",
                                    title: "Yes",
                                    event: {
                                        name: IntentEvent.PropertyListingIntent,
                                        langugeCode: "en",
                                        parameters: {},
                                    },
                                },
                                {
                                    type: "divider",
                                },
                                {
                                    type: "list",
                                    title: "No",
                                    event: {
                                        name: IntentEvent.WelcomeIntent,
                                        langugeCode: "en",
                                        parameters: {},
                                    },
                                },
                            ],
                        ],
                    },
                },
            ],
        };
}