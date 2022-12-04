import Script from "next/script";
import * as React from 'react'
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'df-messenger':ChatbotAttributes;

        }
    }
}

interface ChatbotAttributes extends React.HTMLAttributes<HTMLElement>{
    intent?:string
}
export default function ChatBotComponent(){
    return (
        <div
            id="chatbot"
            className="invisible fixed chatbot bottom-0 right-0 z-50 pr-8 pb-8"
        >
            <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></Script>
            <df-messenger
                intent="WELCOME"
                chat-title="buywithusBot"
                agent-id="55c3f215-87ec-427c-81ce-78723cd755fc"
                language-code="en"
            ></df-messenger>
        </div>
    );
}

