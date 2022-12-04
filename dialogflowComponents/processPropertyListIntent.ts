import { FulfillmentResponse } from "@/types/fulfillmentTypes";

import { Property } from "@prisma/client";
import { PrismaContext } from "@prismaContext";

type PropertyListIntentParameters = {
    postCode: string;
    city: string;
};

export default async function processPropertyListIntent(
    parameters: PropertyListIntentParameters
): FullfillmentResponse {
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
            fullfillmentMessages: [
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
    const property: Property = address.property;

    let msgAddress =
        address.addressLine1 + ", " + address.suburb + ", " + address.postCode;

    let message: FullfillmentResponse = {
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
