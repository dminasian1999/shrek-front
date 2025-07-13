import React from "react"
import type { ProductT } from "../../utils/types.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import moment from "moment"

const ProductItem = ({ p }: { p: ProductT }) => {
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const dispatch = useAppDispatch()

  return (
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={p.imageUrls[0]}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text product-price">
                <p>{p.desc}</p>

                <span className="old-price">
                  ${(p.price + p.price / 3).toFixed(2)}
                </span>

                {/*<span className="old-price">$500.00</span>*/}
                <span className="price">${p.price}</span>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {moment(p.dateCreated).format("MMMM DD, YYYY")}{" "}
                </small>
              </p>
            </div>
          </div>
        </div>
      {/*</div>*/}
      {/*<div className="card mb-3">*/}
      {/*  <img src={p.imageUrl} className="card-img-top" alt="..." />*/}
      {/*  <div className="card-body">*/}
      {/*    <h5 className="card-title">{p.name}</h5>*/}
      {/*    <p className="card-text product-price">*/}
      {/*      <span className="old-price">*/}
      {/*        ${(p.sell + p.sell / 3).toFixed(2)}*/}
      {/*      </span>*/}

      {/*      /!*<span className="old-price">$500.00</span>*!/*/}
      {/*      <span className="price">${p.sell}</span>*/}
      {/*    </p>*/}
      {/*    <p className="card-text">*/}
      {/*      <small className="text-body-secondary">*/}
      {/*        {moment(p.dateCreated).format("MMMM DD, YYYY")}{" "}*/}
      {/*      </small>*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  className="card  text-center"*/}
      {/*  // style={{ width: "18rem" }}*/}
      {/*>*/}
      {/*  <div className="card-header">*/}
      {/*    <img src={p.imageUrl} className="card-img-top" alt="..." />*/}
      {/*    Featured*/}
      {/*  </div>*/}
      {/*  <div className="card-body">*/}
      {/*    <h5 className="card-title">{p.name}</h5>*/}
      {/*    <p className="card-text product-price">*/}
      {/*      <span className="old-price">*/}
      {/*        ${(p.sell + p.sell / 3).toFixed(2)}*/}
      {/*      </span>*/}

      {/*      /!*<span className="old-price">$500.00</span>*!/*/}
      {/*      <span className="price">${p.sell}</span>*/}
      {/*    </p>*/}
      {/*    <a href="#" className="btn btn-primary">*/}
      {/*      Go somewhere*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*  <div className="card-footer text-body-secondary">*/}
      {/*    {moment(p.dateCreated).fromNow()}*/}
      {/*  </div>*/}
      {/*  <div className="card-footer text-body-secondary">*/}
      {/*    {moment(p.dateCreated).format("MMMM DD, YYYY")}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
    // <div className="card" style={{ width: "18rem" }}>
    //   <img src={p.imageUrl} className="card-img-top" alt="..."/>
    //     <div className="card-body">
    //       <h5 className="card-title">{p.name}</h5>
    //       <p className="card-text product-price">
    //         <span className="old-price">${(p.sell + p.sell / 3).toFixed(2)}</span>
    //
    //         {/*<span className="old-price">$500.00</span>*/}
    //         <span className="price">${p.sell}</span>
    //      </p>
    //       <a href="#" className="btn btn-primary">Go somewhere</a>
    //     </div>
    // </div>
  )
}

export default ProductItem
