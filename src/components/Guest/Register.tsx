import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {registerUser} from "../../features/api/accountActions";

const Register = () => {
    const [login, setLogin] = useState("");//? ""
    const [password, setPassword] = useState("");//? ""
    const [firstName, setFirstName] = useState("");//? ""
    const [lastName, setLastName] = useState("");//? ""
    const dispatch = useAppDispatch();

    const handleClickRegister = () => {
        dispatch(registerUser({login, password, firstName, lastName}))
    }
    return (
        <>
            <h2 className="mt-4 mb-4">SignUp</h2>
            <div className="mb-3">
                <label className="form-label">Email</label>

                <input className="form-control"
                       onChange={(e) => setLogin(e.target.value.trim())}
                       type={'text'}
                       required
                       placeholder="Enter your email"
                       value={login}/>

            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                    <input type="password" className="form-control"
                           placeholder="Enter password"
                           required
                           onChange={e => setPassword(e.target.value.trim())}
                           value={password}
                    />
                    <a href="#" className="input-group-text">
                        <i className="icon-eye"></i>
                    </a>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">First Name</label>
                <div className="input-group">
                    <input
                        onChange={e => setFirstName(e.target.value.trim())}
                        type={'text'}
                        value={firstName}
                        required
                        className="form-control"
                        placeholder="Enter First Name"/>
                    <a href="#" className="input-group-text">
                        <i className="icon-eye"></i>
                    </a>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name</label>
                <div className="input-group">
                    <input
                        onChange={e => setLastName(e.target.value.trim())}
                        value={lastName}
                        required
                        type="text" className="form-control"
                        placeholder="Enter Last Name"/>
                    <a href="#" className="input-group-text">
                        <i className="icon-eye"></i>
                    </a>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <div className="form-check m-0">
                    <input className="form-check-input" type="checkbox" value=""
                           id="termsConditions"/>
                    <label className="form-check-label" htmlFor="termsConditions">I
                        agree to
                        the terms and
                        conditions</label>
                </div>
            </div>
            <div className="d-grid py-3 mt-3 gap-3">

                <div className="btn btn-lg btn-primary"
                     onClick={handleClickRegister}
                >
                    SIGN UP
                </div>
            </div>
            {/*<div>*/}


            {/*    <button onClick={handleClickRegister}>Register</button>*/}
            {/*    <button onClick={handleClickClear}>Clear</button>*/}
            {/*</div>*/}
        </>
    )
        ;
};

export default Register;
