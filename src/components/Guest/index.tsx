import  { useState } from 'react';
import Login from './Login';

const Guest = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="d-flex min-vh-100 p-2">
            {/* Left side - Login Form */}
            <div className="d-flex flex-column justify-content-center align-items-center col-md-6 p-4">
                <div >
                    {isLogin && <Login />}
                    <div className="text-center mt-3">
                        <small>© 2025 All rights reserved</small>
                    </div>
                </div>
            </div>

            {/* Right side - Graphic */}
            <div
                className="d-none d-md-flex col-md-6 justify-content-center align-items-center rounded-4 main-color"
            >
                <div className="text-white fw-bold fs-1  position-relative">

                    RANK <br /> MY <br /> PET
                </div>
            </div>
        </div>
    );
};

export default Guest;
