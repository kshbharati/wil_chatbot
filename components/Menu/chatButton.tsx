
'use client'
import { MouseEventHandler, useEffect } from "react";

export default function ChatButton() {
    return (
        <div
            className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12"
        >
            <button
                onClick={()=>{

                        console.warn("This is the place");
                        let chatbot=document.getElementById("chatbot");
                        if(chatbot){
                            chatbot.setAttribute(
                                "class",
                                "visible fixed chatbot bottom-0 right-0 z-50 pr-8 pb-8"
                            );
                        }

                        let chatBotFrame=document.getElementById("chatBotFrame");
                        if(chatBotFrame){
                            chatBotFrame.setAttribute('src',chatBotFrame.hasAttribute('data-src') ? chatBotFrame.getAttribute('data-src') : "");
                        }
                }}
                className="text-text-gray-600 btn py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600 hover:shadow-lg"
            >
                CHAT NOW
            </button>
        </div>
    );
};