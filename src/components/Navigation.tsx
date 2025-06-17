import {navItems} from "../utils/constants.ts";
import {useAppSelector} from "../app/hooks.ts";
import NavItem from "./NavItem.tsx";

const Navigation = () => {

    const user = useAppSelector(state => state.user.profile.roles.includes('ADMINISTRATOR'))
    return (
        <nav className="navbar navbar-expand-lg mb-5">
            <div className="container -5">
                <div className="offcanvas offcanvas-end" id="MobileMenu">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title semibold">Navigation</h5>
                        <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="offcanvas">
                            <i className="icon-clear"></i>
                        </button>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navItems.map(item => <NavItem key={item.route} item={item}/>)}
                        {user && <NavItem item={{title: "Products", route: "products"}} key={"products"}/>}
                        {user && <NavItem item={{title: "Receipts", route: "receipts"}} key={"receipts"}/>}

                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navigation;
