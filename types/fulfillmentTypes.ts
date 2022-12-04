export type FulfillmentResponse = {
    fulfillmentMessages: [CardResponse | MessageResponse | PayloadResponse];
};

export type CardResponse = {
    card: {
        title: string;
        subtitle: string;
        imageUri: string;
        buttons: ({
            text: string;
            postback: string;
        })[];
    };
};

type MessageResponse = {
    text: {
        text: (string)[];
    };
};


/*****************************/
/*****************************/
/*****DIALOGFLOW MESSENGER****/
/*****RICH RESPONSE TYPES*****/
/**********START**************/
/*****************************/
type PayloadResponse = {
    payload: RichResponse;
};

type RichResponse = { richContent: [(InfoResponse|ImageResponse|ChipOptions)[]] };
type InfoResponse = {
    type: ResponseType
    title: string;
    subtitle?: string;
    image?: {
        src: {
            rawUrl: string;
        };
    };
    actionLink: string;
    text?:string;
};

type ImageResponse = {
    type:ResponseType,
    rawUrl:string,
    accessibilityText?:string,
}

type ChipsResponse = {
    type:ResponseType,
    options:(ChipOptions)[]
}

type ChipOptions= {
    text:string,
    link:string
}
type ResponseType= "image" | "info" | "accordion" | "chips"
/*****************************/
/*****************************/
/*****DIALOGFLOW MESSENGER****/
/*****RICH RESPONSE TYPES*****/
/**********END**************/
/*****************************/

let message:FulfillmentResponse={
    fulfillmentMessages:[{
        payload:{
            richContent:[
                [
                    {
                        type:"image",
                        rawUrl:"",
                        accessibilityText:""
                    },
                    {
                        type:"info",
                        title:"",
                        image:{
                            src:{
                                rawUrl:""
                            }
                        },
                        actionLink:""
                    }
                ]
            ]
        }
    }]
}