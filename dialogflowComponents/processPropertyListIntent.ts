import { FulfillmentResponse } from "@/types/fulfillmentTypes";

import {Property, PropertyImages, PropertyInformation } from "@prisma/client";
import { PrismaContext } from "@prismaContext";

type PropertyListIntentParameters = {
    postCode: string;
    city: string;
};

interface FacingProperty extends Property{
    propertyImages?:PropertyImages[],
    propertyInformation?: PropertyInformation
}
export default async function processPropertyListIntent(
    parameters: PropertyListIntentParameters
): Promise<FulfillmentResponse> {
    const result = await PrismaContext.address.findMany({
        where: {
            postCode: parameters.postCode,
            suburb: parameters.city,
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
                            "No such Property Exist!!. Would you like to search for some other region?",
                        ],
                    },
                },
            ],
        };

        return message;
    }

    const address = result[0];
    const property: FacingProperty = address.property;

    let msgAddress =
        address.addressLine1 + ", " + address.suburb + ", " + address.postCode;

    //Formats thumbnail image link and alt description
    let thumbnailImageLink="";
    let altText="Image of a Property";
    if(property.propertyImages[0])
    {
        let image:PropertyImages=property.propertyImages[0];
        thumbnailImageLink=image.imageLink;
        altText=image.imageDescription;
    }

    let message: FulfillmentResponse = {
        fulfillmentMessages: [
            {
                payload: {
                    richContent: [
                        [
                            {
                                type: "image",
                                rawUrl: thumbnailImageLink,
                                accessibilityText: altText
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
                                    "http://localhost:3000/property/" +
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
