import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUser } from '../../features/api/accountActions';
import { createToken } from '../../utils/constants';

const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { loading, errorMessage } = useAppSelector((state) => state.user);

    const handleSubmit = () => {
        if (!login || !password) return;
        dispatch(fetchUser(createToken(login, password)));
    };

    return (
        <div className="p-3">
            <h2 className="fw-bold mb-4">Welcome Back!</h2>

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email</label>
                <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="example@email.com"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">Password</label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />
                <div className="text-end mt-1">
                    <small className="text-muted">Forgot your password?</small>
                </div>
            </div>

            <button
                className="btn w-100 text-light"
                style={{backgroundColor:'black'}}
                onClick={handleSubmit}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Loading...
                    </>
                ) : (
                    'Login'
                )}
            </button>

            <div className="my-3 text-center text-muted">Or</div>

            <button className="btn btn-light w-100 border d-flex align-items-center justify-content-center">


                <div className="fab fa-google me-2"></div>
                Sign in with Google
            </button>

            <div className="text-center mt-3">
                <small>
                    Don’t have an account? <a href="#" className="text-primary">Register now!</a>
                </small>
            </div>
        </div>
    );
};

export default Login;
