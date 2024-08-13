import React from 'react';
import '../Css/MinimalLoader.css'
const MinimalLoader = () => {
    return (
        <div className='flex justify-center items-center w-8'>
            <div className="loader">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
                <div class="bar7"></div>
                <div class="bar8"></div>
            </div>
        </div>
    );
}

export default MinimalLoader;
