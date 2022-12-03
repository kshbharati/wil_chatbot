'use client'
import '../styles/globals.css'

import HeaderComponent from '@components/header'
import FooterComponent from '@components/footer'
import ChatBotComponent from '@components/chatbot'
import SliderComponent from "@components/Featured/slider";
export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>Home</title>
            </head>
            <body>
                <div>
                    <HeaderComponent />
                    <div className="featured" style={{maxHeight:'500px'}}>
                        <SliderComponent />
                    </div>
                    {children}
                    <FooterComponent />
                    <ChatBotComponent />
                </div>
            </body>
        </html>
    );
}

