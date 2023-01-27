import MenuItem from '@components/Menu/MenuItems'
import ChatButton from '@components/Menu/chatButton'
import Script from 'next/script';
import { useEffect } from 'react';

export default function Menu() {
    return (
        <>
            <div className="nav-menu flex items-center">
                <ul className="sm:flex space-x-4 hidden items-center">
                    <li>
                        <MenuItem title="Home" link="/" />
                    </li>
                    <li>
                        <MenuItem title="Property" link="/property" />
                    </li>
                    <li>
                        <MenuItem title="Agents" link="/agent" />
                    </li>
                </ul>
            </div>
            <script>
                
            </script>
        </>
    );
}
