import Script from "next/script";
import * as React from 'react'
import * as uuid from 'uuid'
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
            className="fixed chatbot bottom-0 right-0 z-50 pr-8 pb-8"
        >
            <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></Script>
            <df-messenger
                intent="WELCOME"
                chat-title="Buy With Us - Rodhe"
                agent-id="55c3f215-87ec-427c-81ce-78723cd755fc"
                language-code="en"
                session-id={generateSessionId()}
                user-id={generateSessionId()}
            ></df-messenger>
        </div>
    );
}

function generateSessionId(){
    return uuid.v4();
}