'use client'
import '../styles/globals.css'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import 'tw-elements';
import HeaderComponent from '@components/HeaderComponent'
import FooterComponent from '@components/FooterComponent'
import ChatBotComponent from '@components/ChatbotComponent'
import Head from 'next/head'
import DefaultTags from 'app/DefaultTags';
interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children}:LayoutProps) {
    return (
        <html lang="en">
            <Head>
                <DefaultTags />
                <title>Home</title>
            </Head>
            <body>
                <div>
                    <HeaderComponent />
                    {children}
                    <FooterComponent />
                    <ChatBotComponent />
                </div>
            </body>
        </html>
    );
}

