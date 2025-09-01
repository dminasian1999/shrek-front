import React from "react"

type InvoiceItem = {
  title?: string
  description?: string
  productId?: string
  hours?: number
  amount?: number
}

type InvoiceProps = {
  invoiceId?: string
  date: string
  status?: string
  billedTo?: string
  shippedTo?: string
  items: InvoiceItem[]
  notes?: string
  discount?: number
  vat: number
}

const InvoiceDetails: React.FC<InvoiceProps> = ({
                                                  invoiceId,
                                                  date,
                                                  status,
                                                  billedTo,
                                                  shippedTo,
                                                  items,
                                                  notes,
                                                  discount = 0,
                                                  vat,
                                                }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.amount ?? 0), 0)
  const total = subtotal - discount + vat

  const statusClass = {
    Paid: "success",
    Pending: "warning",
    Overdue: "danger",
  }[status ?? "Paid"] || "secondary"

  return (
    <div className="row gx-3">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            {/* Header */}
            <div className="row gx-3">
              <div className="col-sm-3 col-12">
                <img
                  src="https://via.placeholder.com/100x40?text=LOGO"
                  alt="Company Logo"
                  className="img-fluid"
                />
              </div>
              <div className="col-sm-9 col-12">
                <div className="text-end">
                  <p className="m-0">
                    Invoice - <span className="text-danger">#{invoiceId}</span>
                  </p>
                  <p className="m-0">{date}</p>
                  <span className={`badge bg-${statusClass}`}>{status}</span>
                </div>
              </div>
              <div className="col-12 mb-5"></div>
            </div>

            {/* Billing/Shipping */}
            <div className="row justify-content-between">
              <div className="col-lg-6 col-12">
                <h6 className="fw-semibold">Billed To:</h6>
                <p className="m-0" style={{ whiteSpace: "pre-line" }}>{billedTo}</p>
              </div>
              <div className="col-lg-6 col-12">
                <div className="text-end">
                  <h6 className="fw-semibold">Shipped To:</h6>
                  <p className="text-end m-0" style={{ whiteSpace: "pre-line" }}>{shippedTo}</p>
                </div>
              </div>
              <div className="col-12 mb-3"></div>
            </div>

            {/* Items Table */}
            <div className="row gx-3">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                    <tr>
                      <th>Items</th>
                      <th>Product ID</th>
                      <th>Hours</th>
                      <th>Amount (Net)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <h6>{item.title}</h6>
                          <p className="m-0">{item.description}</p>
                        </td>
                        <td>
                          <h6>#{item.productId}</h6>
                        </td>
                        <td>
                          <h6>{item.hours}</h6>
                        </td>
                        <td>
                          <h6>₪{(item.amount ?? 0).toFixed(2)}</h6>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2}></td>
                      <td>
                        <p>Subtotal</p>
                        <p>Discount</p>
                        <p>VAT</p>
                        <h5 className="mt-4 text-primary">Total USD</h5>
                      </td>
                      <td>
                        <p>₪{subtotal.toFixed(2)}</p>
                        <p>₪{discount.toFixed(2)}</p>
                        <p>₪{vat.toFixed(2)}</p>
                        <h5 className="mt-4 text-primary">₪{total.toFixed(2)}</h5>
                      </td>
                    </tr>
                    {notes && (
                      <tr>
                        <td colSpan={4}>
                          <h6 className="text-danger">NOTES</h6>
                          <p className="small m-0">{notes}</p>
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="row gx-3">
              <div className="col-sm-12 col-12">
                <div className="text-end">
                  <button className="btn btn-outline-primary">Download</button>
                  <button className="btn btn-outline-primary ms-1">Print</button>
                  <button className="btn btn-primary ms-1">Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails
