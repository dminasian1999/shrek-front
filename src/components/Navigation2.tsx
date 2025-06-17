
const Navigation2 = () => {
    return (
        <div className="row bg-body-secondary p-4">
            <div className="col-4 d-flex flex-column bg-white rounded-3 overflow-hidden ">
                <div className="d-flex align-items-center gap-2 flex-wrap p-2">
                    <div
                        style={{width: '80px', height: '80px'}}
                        className="box main-color d-flex justify-content-center align-items-center rounded-4 text-light">
                        <div className="fw-bold fs-1">{"R"}</div>

                    </div>
                    <div className={"d-flex flex-column justify-content-center align-items-center"}
                         style={{color: 'rgb(189, 216, 145)'}}>
                        <div
                            className="fw-bold fs-1">{"Rempet"}</div>
                        <div className="fs-6 fw-medium"> {'Rank my pet'}</div>
                    </div>

                    <div className="col-md-9"></div>
                </div>

                <div className="dropdown p-2">
                    {/*<div className='d-flex align-items-center gap-2 border border-2'>*/}

                    <div className="btn border   d-flex justify-content-between  align-items-center"
                         data-bs-toggle="dropdown"
                         aria-expanded="false">
                       <div className="d-flex fw-medium align-items-center gap-3 ">
                           <div
                               className="text-light main-color rounded-circle d-flex justify-content-center align-items-center"
                               style={{
                                   width: '40px',
                                   height: '40px',
                               }}
                           >
                               UN
                           </div>
                           <div className="fs-6">{'Username'}</div>
                       </div>
                        <div className="fa fa-angle-down"></div>
                    </div>
                    {/*</div>*/}
                    <ul className="dropdown-menu dropdown-enu-dark">
                        <li><a className="dropdown-item active" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>

                <div id="list-example" className="list-group">
                    {/* Navigation links */}
                    <a className="list-group-item list-group-item-action d-flex align-items-center gap-2" href="#list-item-1">
                        <i className="fas fa-home"></i>
                        Home
                    </a>
                    <a className="list-group-item list-group-item-action d-flex align-items-center gap-2" href="#list-item-2">
                        <i className="fa fa-comments"></i>
                        Idea Space
                    </a>
                    <a className="list-group-item list-group-item-action d-flex align-items-center gap-2" href="#list-item-3">
                        <i className="fas fa-box"></i>
                        My Ideas
                    </a>

                </div>

            </div>


            <div className="col-8">
                <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true"
                     className="scrollspy-example" tabIndex={0}>
                    <h4 id="list-item-1">Item 1</h4>
                    <p>...</p>
                    <h4 id="list-item-2">Item 2</h4>
                    <p>...</p>
                    <h4 id="list-item-3">Item 3</h4>
                    <p>...</p>
                    <h4 id="list-item-4">Item 4</h4>
                    <p>...</p>
                </div>

            </div>
        </div>);
};

export default Navigation2;
