import React from 'react';
import '../Css/Logo.css';
import { Link } from 'react-router-dom';

// Importing Noto Sans font from Google Fonts
const notoSansLink = document.createElement('link');
notoSansLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap';
notoSansLink.rel = 'stylesheet';
document.head.appendChild(notoSansLink);

const Logo = () => {
    return (

        <div className='w-full h-screen flex justify-center items-center'>
            <div className='logo-container'>
                <span className='flex justify-center items-center'>
                    <Link
                        to="/"
                        className="logo-text"
                    >
                        {/* ध */}
                        अ
                        {/* स */}

                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Logo;