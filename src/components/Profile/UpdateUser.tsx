import React, {useState} from 'react';
import {UpdateMode} from "../../utils/types";
import EditUser from "./EditUser";
import ChangePassword from "./ChangePassword";

const UpdateUser = () => {
    const [updateMode,setUpdateMode]=useState(UpdateMode.default);
    const close=()=>{
        setUpdateMode(UpdateMode.default)
    }
    switch (updateMode){
        case UpdateMode.editUser:
            return <EditUser close={close}/>
        case UpdateMode.changePassword:
            return <ChangePassword close={close}/>
        default:
            return (
                <div>
                    <button onClick={()=>setUpdateMode(UpdateMode.changePassword)}>Change password</button>
                    <button onClick={()=>setUpdateMode(UpdateMode.editUser)}>Edit user profile</button>
                </div>
            );
    }


};

export default UpdateUser;