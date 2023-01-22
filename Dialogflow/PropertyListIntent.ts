import { FulfillmentResponse } from "@/types/fulfillmentTypes";

import {Address, Property, PropertyImages, PropertyInformation } from "@prisma/client";
import { PrismaContext } from "@prismaContext";
import {API_URI} from "../constants";
import {randomBetween} from "../helpers";
import * as IntentEvent from "../constants";
import * as uuid from 'uuid';

type PropertyListIntentParameters = {
    postCode: string;
    city: string;
    propertyType:string;
    propertyListingType:string;
    propertyId?:string;
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


    if (!result) {
        return NotFoundMessageResponse(outputContexts);
    }
    

    //Leaves out any address with empty property
    //Also Leaves out any already displayed property from previous query (Just for One Tuen)
    //TODO: Can be expaned using redis/other form of storage (outputContext) to remember all the previous displayed properties and exclude them
    //Out of Scope For This.

    let excludedResult=[];

    for(let data of result)
    {
        if (!data.property) {
            continue;
        }

        if(data.property?.id === parameters.propertyId)
        {   
            continue;
        }
        excludedResult.push(data);
    }

    if (!excludedResult || excludedResult === null || excludedResult.length===0) {
        return NotFoundMessageResponse(outputContexts);
    }

    //Randomly selects a property from given list but selects the first item if the length of array is only 1
    let address=excludedResult[0];
    
    if(excludedResult.length>1)
    {
        address= excludedResult[randomBetween(0, excludedResult.length - 1)];
    }
    //

    let property: FacingProperty = address.property as FacingProperty;
    
    if (!property) {


        return NotFoundMessageResponse(outputContexts);
    }
    
    return FormatPropertyResponse(address, property,parameters,outputContexts);

}
/**
 * @param  {Address} address
 * @param  {FacingProperty} property
 * @param  {any} parameters
 * @param  {any} outputContexts
 * @returns FulfillmentResponse
 */
function FormatPropertyResponse(address:Address, property:FacingProperty, parameters:PropertyListIntentParameters, outputContexts:any):FulfillmentResponse{
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

    
    parameters.propertyId=property.id;

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
                                        propertyID: property.id,
                                    },
                                },
                            },
                            {
                                type: "divider",
                            },
                            {
                                type: "list",
                                title: "No, Show me Another.",
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
/**
 * @returns FulfillmentResponse
 */
function NotFoundMessageResponse(outputContexts:any):FulfillmentResponse{
    return {
            outputContexts:outputContexts,
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            "All the properties are shown or no such Property Exist!!. Would you like to search for some other region?",
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