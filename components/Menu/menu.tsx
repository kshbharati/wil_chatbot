import MenuItem from '@components/Menu/menuItems'
import ChatButton from '@components/Menu/chatButton'
import ChatBotComponent from '@components/chatbot';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Menu() {
    return (
        <div className="flex items-center">
            <ul className="sm:flex space-x-4 hidden items-center">
                <li>
                    <MenuItem title="Home" link="/" />
                </li>
                <li>
                    <MenuItem title="Featured" link="#featured" />
                </li>
                <li>
                    <MenuItem title="Property" link="#property" />
                </li>
                <li>
                    <MenuItem title="Agents" link="#agent" />
                </li>

                <ChatButton />
            </ul>
        </div>
    );
}
