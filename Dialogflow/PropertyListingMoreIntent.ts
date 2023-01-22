import { FulfillmentResponse } from "@/types/fulfillmentTypes";
// import processPropertyListIntent from "./PropertyListIntent";
// import * as IntentEvent from "../constants"

// export default async function processPropertyListMoreIntent(parameters : any, outputContexts: any):Promise<FulfillmentResponse>{

//         if (!outputContexts && parameters) {
//             const message = await processPropertyListIntent(
//                 parameters,
//                 outputContexts
//             );
//             return message;
//         }

//         if (outputContexts.length === 1) {
//             parameters = outputContexts[0].parameters;
//             const message = await processPropertyListIntent(
//                 parameters,
//                 outputContexts
//             );
//             return message;
//         }

//         let resParameters;
//         for(let data of outputContexts)
//         {
//             if (data.name.includes("propertylisting-more")) {
//                 resParameters=data.parameters;
//                 break;
//             }
//         }

//         if (
//             !resParameters ||
//             resParameters.city === (null || undefined) ||
//             resParameters.postcode === (null || undefined)
//         ) {
//             let message: FulfillmentResponse = {
//                 followupEventInput: {
//                     name: IntentEvent.PropertyListingIntent,
//                 },
//             };
//             return message;
//         }


//         const message = await processPropertyListIntent(
//             resParameters,
//             outputContexts
//         );
//         return message;


// }