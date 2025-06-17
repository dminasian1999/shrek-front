import {useAppSelector} from "../../app/hooks.ts";
import Navigation2 from "../Navigation2.tsx";

const Profile = () => {

    const token = useAppSelector(state => state.token);
    return (
        <div className=''>
                {/*<Header2/>*/}
                <Navigation2/>
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
