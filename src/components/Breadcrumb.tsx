import React from 'react';
import {useLocation} from "react-router-dom";

const Breadcrumb = () => {
    const id = useLocation().pathname.split('/')[1];
    return (
        <div className="row gx-3">
            <div className="col-12 col-xl-6">
                <ol className="breadcrumb mb-3">
                    <li className="breadcrumb-item">
                        <i className="fa fa-arrow-right icon-house_siding lh-1" />
                        <a href="/public" className="text-decoration-none">
                            Home
                        </a>
                    </li>
                    <li className="breadcrumb-item text-capitalize">{id}</li>
                </ol>
            </div>
        </div>

    );
};

export default Breadcrumb;
