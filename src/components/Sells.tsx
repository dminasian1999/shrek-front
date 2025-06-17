import React, {useContext} from 'react';
import {ProductsContext} from "../utils/context.ts";
import {useAppSelector} from "../app/hooks.ts";

const Sells = () => {
    const  user = useAppSelector(state => state.user.profile);
    const receipts = useContext(ProductsContext).receipts.filter(r => r.seller === user.login);

    const totalCost = receipts.reduce((sum, r) => sum + (r.sell ), 0);

    return (
        <div className="app-body">
            <div className="container">
                {/* Breadcrumb */}
                <div className="row gx-3">
                    <div className="col-12 col-xl-6">
                        <ol className="breadcrumb mb-3 align-items-center">
                            <li className="breadcrumb-item">
                                <i className="icon-house_siding lh-1" />
                                <a href="/" className="text-decoration-none ms-1">
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Receipts
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Totals */}
                <div className="row gx-3">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-header bg-light py-3">
                                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                                    <div className="d-flex flex-wrap gap-3 align-items-center">
                                        <span className="badge rounded-pill bg-primary px-4 py-2 fs-6 d-flex align-items-center gap-2 shadow-sm">
                      <i className="fa fa-shekel" />
                      <span>Total Cost</span>
                      <span className="fw-bold">₪{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table align-middle m-0">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Qty</th>
                                            <th>Sell</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {receipts
                                            .filter(r=>r.seller === user.login)
                                            .map((row) => (
                                            <tr key={row.id}>
                                                <td className="d-flex align-items-center gap-2">
                                                    <img
                                                        src={row.imageUrl}
                                                        alt={row.name}
                                                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
                                                    />
                                                    <span>{row.name}</span>
                                                </td>
                                                <td>
                                                    <span className="fw-semibold">{row.category}</span>
                                                </td>
                                                <td>
                            <span>
                              {new Date(row.dateCreated).toLocaleString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                              })}
                            </span>
                                                </td>
                                                <td>
                                                    <span className="fw-semibold">{row.quantity}</span>
                                                </td>
                                                <td>
                            <span className="badge bg-success text-white px-3 py-1 fw-semibold d-flex align-items-center gap-1">
                              {row.sell}
                                <i className="fa fa-shekel" />
                            </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {!receipts.length && (
                                            <tr>
                                                <td colSpan={8} className="text-center py-4 text-muted">
                                                    No receipts found.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* End Card Body */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sells;
