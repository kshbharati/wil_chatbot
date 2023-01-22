'use client'
import '../styles/globals.css'

import HeaderComponent from '@components/header'
import FooterComponent from '@components/footer'
import ChatBotComponent from '@components/chatbot'

interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children}:LayoutProps) {
    return (
        <html lang="en">
            <head>
                <title>Home</title>
                <meta name="viewport" content="width-device-width, initial-scale=1"></meta>
            </head>
            <body>
                <div>
                    <HeaderComponent />
                    {children}
                    {/* <FooterComponent /> */}
                    <ChatBotComponent />
                </div>
            </body>
        </html>
    );
}

