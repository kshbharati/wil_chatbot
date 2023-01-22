// export interface FulfillmentResponse = {
//     followupEventInput?: any,
//     outputContexts?: any,
//     fulfillmentMessages?: [MessageResponse | PayloadResponse]
// };

export interface FulfillmentResponse {
    followupEventInput?: FollowupEventInputResponse;
    outputContexts?: any;
    fulfillmentMessages?: (CardResponse | MessageResponse | PayloadResponse)[];
}

interface CardResponse{
    card: {
        title: string,
        subtitle: string,
        imageUri: string,
        buttons: ({
            text: string,
            postback: string,
        })[];
    }
}

interface MessageResponse{
    text?:{
        text:string[]
    }
};

interface FollowupEventInputResponse{
    name:string;
    parameters?:[];
    languageCode?:string;
}
interface EventForwardingResonse{

}
/*****************************/
/*****************************/
/*****DIALOGFLOW MESSENGER****/
/*****RICH RESPONSE interfaceS*****/
/**********START**************/
/*****************************/
interface PayloadResponse{
    payload: RichResponse
};

interface RichResponse{
    richContent: [(InfoResponse| ImageResponse| ChipsResponse)[]]
};
interface InfoResponse{
    type: ResponseType,
    title?: string,
    subtitle?: string,
    image?: {
        src: {
            rawUrl: string
        };
    };
    actionLink?: string,
    text?:string,
};

interface ImageResponse{
    type:ResponseType,
    rawUrl?:string,
    accessibilityText?:string,
}

interface ChipsResponse{
    type:ResponseType,
    options?:(ChipOptions)[]
}

interface ChipOptions{
    text:string,
    link?:string
}
type ResponseType= "image" | "info" | "accordion" | "chips"
/*****************************/
/*****************************/
/*****DIALOGFLOW MESSENGER****/
/*****RICH RESPONSE interfaceS*****/
/**********END**************/
/*****************************/
