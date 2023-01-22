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
    richContent: [(InfoResponse| ImageResponse| ChipsResponse | ButtonResponse)[]]
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

interface ButtonResponse{
    type:ResponseType,
    icon?:{
        type?:string,
        color:string
    },
    text:string,
    link?:string
    event?:{
        name:string,
        langugeCode?:string,
        parameters?:any
    }
}

interface ListResponse{
    type:ResponseType,
    title:string,
    subtitle?:string,
    event?:{
        name:string,
        languageCode:string,
        parameters:any
    }
}
type ResponseType= "button" | "image" | "info" | "accordion" | "chips" | "divider" | "list" ;
/*****************************/
/*****************************/
/*****DIALOGFLOW MESSENGER****/
/*****RICH RESPONSE interfaceS*****/
/**********END**************/
/*****************************/
