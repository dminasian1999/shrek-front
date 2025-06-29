import {useAppSelector} from "../../app/hooks.ts";
import Navigation from "../Navigation.tsx";

const Profile = () => {

    const token = useAppSelector(state => state.token);
    return (
        <div className=''>
                {/*<Header2/>*/}
                <Navigation/>
                <div className="app-footer">
                    <div className="container">
                        <span>© Bootstrap Gallery 2024</span>
                    </div>
                </div>
        </div>
    )
        ;
};

export default Profile;
