import { NextApiRequest, NextApiResponse } from "next";
import {PrismaContext} from "@prismaContext"
import processPropertyListIntent from "Dialogflow/PropertyListIntent";
import processEnquiryForm from "Dialogflow/EnquiryFormIntent";

import * as IntentEvent from "../../constants";

interface DialogflowRequest{
    responseId:string,
    queryResult:{},

}

export default async function DialogFlowRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
)
{
    //Dialogflow only requests using POST method. So we want to discard any other methods.
    if(req.method !== 'POST'){
        res.status(403).json({message:"ONLY POST METHODS ALLOWED"});
        return;
    }

    const query = req.body.queryResult;
  
    const {intent, outputContexts,parameters} = query;

    //Redirect intent based on their name

    if(intent.displayName==="PropertyListing")
    {
        const message=await processPropertyListIntent(parameters, outputContexts);
        res.status(200).json(message);
        return;
    }

    //Get previous parameters from main Intent and pass 
    if(intent.displayName==="PropertyListingMore")
    {   

        const message=await processPropertyListIntent(parameters,outputContexts);
        res.status(200).json(message);
        return;
    }

    if (intent.displayName === "EnquiryForm") {
        const message = await processEnquiryForm(parameters);
        res.status(200).json(message);
        return;
    }

    /* 
        Shorthand to trigger other intent based on user intentions
        {
            followupEventInput: {
            name: ""
            }
        }
    */
    
    if (intent.displayName === "PropertyListingEditParams") {
        const message = {
            followupEventInput: {
                name: IntentEvent.PropertyListingIntent
            },
        };
        res.status(200).json(message);
        return;
    }

    if (intent.displayName === "PropertyListingCancel") {
        const message = {
            followupEventInput: {
                name: IntentEvent.WelcomeIntent,
            },
        };
        res.status(200).json(message);

        return;
    }

    if (intent.displayName === "EnquiryFormFinishNo") {
        const message = {
            followupEventInput: {
                name: IntentEvent.WelcomeIntent,
            },
        };
        res.status(200).json(message);

        return;
    }

    if (intent.displayName === "EnquiryFormCancel") {
        const message = {
            followupEventInput: {
                name: IntentEvent.WelcomeIntent,
            },
        };
        res.status(200).json(message);

        return;
    }
    
    if (intent.displayName === "EnquiryYes") {
        const message = {
            followupEventInput: {
                name: IntentEvent.EnquiryFormIntent
            },
        };
        res.status(200).json(message);
        
        return;
    }

    //Sends to Welcome Intent when user doesn't accept disclaimer and Privacy Notice.
    if (intent.displayName === "EnquiryNo") {
        const message = {
            followupEventInput: {
                name: IntentEvent.WelcomeIntent
            },
        };
        res.status(200).json(message);
        return;
    }
}



