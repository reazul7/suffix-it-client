import React from 'react';

const Banner = () => {
    return (
        <div className="text-center">
            <h1 className="py-3 text-2xl font-mono font-bold">Welcome to our website</h1>
            <div className="flex justify-center">
                <img src="http://www.suffixit.com/img/slider/banner.jpg" alt="" />
            </div>
        </div>
    );
};

export default Banner;