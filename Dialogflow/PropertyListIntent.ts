import { FulfillmentResponse } from "@/types/fulfillmentTypes";

import {Property, PropertyImages, PropertyInformation } from "@prisma/client";
import { PrismaContext } from "@prismaContext";
import {API_URI} from "../constants";
import {randomBetween} from "../helpers";

type PropertyListIntentParameters = {
    postCode: string;
    city: string;
};

interface FacingProperty extends Property{
    propertyImages?:PropertyImages[],
    propertyInformation?: PropertyInformation
}
export default async function processPropertyListIntent(
    parameters: PropertyListIntentParameters, outputContexts
): Promise<any>{
    

    if(!parameters || parameters===null || parameters===undefined || !Object.keys(parameters).length)
    {
        if(!outputContexts)
        {   
            let message: FulfillmentResponse = {
                fulfillmentMessages: [
                    {
                        text: {
                            text: [
                                "We discovered some problems with the system and is harder to resolve your request. Please try again later.",
                            ],
                        },
                    },
                ],

            };

            return message;
        }


        let par = outputContexts[0].parameters;

        if (par.city && par.postCode) {
            parameters = par;
        }

    }



    const result = await PrismaContext.address.findMany({
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
        let message: FulfillmentResponse = {
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            "No  Property Exist!!. Would you like to search for some other region?",
                        ],
                    },
                },
            ],
        };

        return message;
    }

    
    const address = result[randomBetween(0, result.length-1)];
    const property: FacingProperty = address.property;
    
    if (!property || property === undefined) {
        let message: FulfillmentResponse = {
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            "No such Property Exist!!. Would you like to search for some other region?",
                        ],
                    },
                },
            ],
        };

        return message;
    }

    let msgAddress =
        address.addressLine1 + ", " + address.suburb + ", " + address.postCode;

    //Formats thumbnail image link and alt description
    let thumbnailImageLink="";
    let altText="Image of a Property";
    if(property.propertyImages!==undefined && property.propertyImages.length>0)
    {
        let image:PropertyImages=property.propertyImages[0];
        thumbnailImageLink=image.imageLink;
        altText=image.imageDescription;
    }

    
    let message = {
        outputContexts:outputContexts,
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
                                text: property.propertyInformation
                                    .propertyDescription,
                                title: property.name,
                                subtitle: msgAddress,
                                image: {
                                    src: {
                                        rawUrl: thumbnailImageLink,
                                    },
                                },
                                actionLink:
                                    API_URI+"/property/" +
                                    property.id,
                            },
                        ],
                    ],
                },
            },
        ],
    };

    return message;
}

        // followupEventInput: {
        //     name: "FORM",
        // },
        // languageCode: "en-US",

    //           {
    //     "text": {
    //       "text": [
    //         ""
    //       ]
    //     }
    //   },
