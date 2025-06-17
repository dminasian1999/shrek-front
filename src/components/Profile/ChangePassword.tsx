import React, {useState} from 'react';
import {changePassword} from "../../features/api/accountActions";
import {useAppDispatch} from "../../app/hooks";

interface Props{
    close:()=>void;
}
export const ChangePassword = ({close}:Props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const dispatch=useAppDispatch();

    const handleClickClear = () => {
        setOldPassword("")
        setNewPassword("")
        setRepeatPassword("")
    }

    const handleClickSave = () => {
        if (newPassword === repeatPassword){
            dispatch(changePassword({newPassword,oldPassword}))
        }
        close();
    }

    return (
        <div>
            <label>Old Password:
                <input
                    onChange={e => setOldPassword(e.target.value.trim())}
                    type={'password'}
                    value={oldPassword}
                />
            </label>
            <label>New Password:
                <input
                    onChange={e => setNewPassword(e.target.value.trim())}
                    type={'password'}
                    value={newPassword}
                />
            </label>
            <label>Repeat New Password:
                <input
                    onChange={e => setRepeatPassword(e.target.value.trim())}
                    type={'password'}
                    value={repeatPassword}
                />
            </label>
            <button onClick={handleClickClear}>Clear</button>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Saving</button>
        </div>
    );

};

export default ChangePassword;
