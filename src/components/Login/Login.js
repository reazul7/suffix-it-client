import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex justify-center py-5 my-5">
            <Link to="/">
                <button className="btn bg-black text-white font-bold px-5 py-2.5 shadow-2xl">Go to Home Page</button>
            </Link>
        </div>
    );
};

export default Login;