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

    // console.log(result);
    if (!result || result.length === 0) {
        let message: FulfillmentResponse = {
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            "No such Item Exist!!. Would you like to search for some other region?",
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

    let images:PropertyImages = property.propertyImages[0];
    let message: FulfillmentResponse = {
        fulfillmentMessages: [
            {
                payload: {
                    richContent: [
                        [
                            {
                                type: "image",
                                rawUrl: property.propertyImages[0].imageLink,
                                accessibilityText: property.propertyImages[0].imageDescription ? property.propertyImages[0].imageDescription : "image",
                            },
                            {
                                type: "accordion",
                                text: property.propertyInformation
                                    .propertyDescription,
                                title: property.name,
                                subtitle: msgAddress,
                                image: {
                                    src: {
                                        rawUrl: property.propertyImages[0]
                                            .imageLink,
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
