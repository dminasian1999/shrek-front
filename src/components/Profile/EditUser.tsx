import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {updateUser} from "../../features/api/accountActions";

interface Props{
    close:()=>void;
}
const EditUser = ({close}:Props) => {
    const [firstName,setFirstName]= useState("");//? ""
    const [lastName,setLastName]= useState("");//? ""
    const dispatch=useAppDispatch();

    const handleClickClear=()=>{
        setFirstName("");
        setLastName("");
    }
    const handleClickSave=()=>{
        dispatch(updateUser({firstName, lastName}))
        close();
    }
    return (
        <div>
            <label>First Name:
                <input
                    onChange={e=>setFirstName(e.target.value.trim())}
                    type={'text'}
                    value={firstName}
                />
            </label>
            <label>Last Name:
                <input
                    onChange={e=>setLastName(e.target.value.trim())}
                    type={'text'}
                    value={lastName}
                />
            </label>
            <button onClick={handleClickClear}>Clear</button>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Saving</button>
        </div>
    );
};

export default EditUser;
