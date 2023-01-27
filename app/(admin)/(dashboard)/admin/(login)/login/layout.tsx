"use client";
import "@styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useEffect } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: LayoutProps) {
    useEffect(() => {
        const use = async () => {
            (await import("tw-elements")).default;
        };
        use();
    }, []);

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
