import {NavItemT} from "../utils/types.ts";

interface Props {
    item: NavItemT
}

const NavItem = ({item}: Props) => {
    return (
        <li className="nav-item p-0 m-0">
            <a href={`/${item.route}`}
               className="nav-link" role={'link'}>
                <i className="fa fa-link fa-stack-overflow"></i>
                {item.title}
            </a>
        </li>

    );
};

export default NavItem;
