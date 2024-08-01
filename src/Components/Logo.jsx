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

        <>
            <div className='logo-container'>
                <span >
                    <Link
                        to="/"
                        className="logo-text"
                    >
                        अ
                    </Link>
                </span>
            </div>
        </>
    );
}

export default Logo;