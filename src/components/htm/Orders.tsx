import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks.ts"
import { OrderItemT, OrderT } from "../../utils/types.ts"
import { baseUrlBlog } from "../../utils/constants.ts"
import { Link } from "react-router-dom"

const statusMap: Record<string, string> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
}

const Orders = () => {
  const user = useAppSelector(state => state.user.profile)
  const [orders, setOrders] = useState<OrderT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editIndex, setEditIndex] = useState<{ orderId: string; itemId: string } | null>(null)
  const [formData, setFormData] = useState<OrderItemT | null>(null)

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/ordersByUser/${user.login}`)
        if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`)
        const data: OrderT[] = await res.json()
        setOrders(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    if (user.login) fetchOrders()
  }, [user.login])

  const handleEdit = (orderId: string, item: OrderItemT) => {
    setEditIndex({ orderId, itemId: item.productId! })
    setFormData({ ...item })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (!formData) return

    setFormData(prev => {
      if (!prev) return null
      const updated = { ...prev }

      if (name === "quantity") updated.quantity = Number(value)
      else if (name === "unitPrice") updated.unitPrice = Number(value)
      else if (name === "productName") updated.productId = value

      return updated
    })
  }

  const handleCancel = () => {
    setEditIndex(null)
    setFormData(null)
  }

  const handleSave = () => {
    if (!formData || !editIndex) return

    const updatedOrders = orders.map(order => {
      if (order.orderId !== editIndex.orderId) return order
      return {
        ...order,
        orderItems: order.orderItems.map(item =>
          item.productId === editIndex.itemId ? formData : item
        ),
      }
    })

    setOrders(updatedOrders)
    setEditIndex(null)
    setFormData(null)
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <div className="mt-2">Loading orders...</div>
      </div>
    )

  if (error)
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        Error: {error}
      </div>
    )

  return (
    <div className="accordion" id="accordionOrders">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOrders">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOrders"
            aria-expanded="false"
            aria-controls="collapseOrders"
          >
            My Orders
          </button>
        </h2>
        <div
          id="collapseOrders"
          className="accordion-collapse collapse"
          aria-labelledby="headingOrders"
        >
          <div className="accordion-body">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <Link to={'/order/'+order.orderId}  className="mb-0">Order ID {order.orderId}</Link>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover align-middle m-0 text-center">
                          <thead className="table-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>

                          { order.orderItems.map(item => {
                            const isEditing =
                              editIndex?.orderId === order.orderId &&
                              editIndex?.itemId === item.productId

                            return (
                              <tr key={`${order.orderId}-${item.productId}`}>
                                <td>#{order.orderId}</td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      name="productName"
                                      className="form-control"
                                      value={formData?.productId || ""}
                                      onChange={handleChange}
                                    />
                                  ) : (
                                    item.productId
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      name="quantity"
                                      min={1}
                                      className="form-control"
                                      value={formData?.quantity || 1}
                                      onChange={handleChange}
                                    />
                                  ) : (
                                    item.quantity
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      name="unitPrice"
                                      step="0.01"
                                      className="form-control"
                                      value={formData?.unitPrice || 0}
                                      onChange={handleChange}
                                    />
                                  ) : (
                                    `$${item.unitPrice.toFixed(2)}`
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`badge bg-${
                                      statusMap[order.status ?? "Paid"] ?? "secondary"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td>
                                  {isEditing ? (
                                    <>
                                      <button
                                        className="btn btn-outline-secondary btn-sm me-1"
                                        onClick={handleCancel}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={handleSave}
                                      >
                                        Save
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-info btn-sm"
                                      onClick={() => handleEdit(order.orderId!, item)}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              ))
              // <div className="row gx-3">
              //   <div className="col-12">
              //     <div className="card mb-3">
              //       <div className="card-header d-flex justify-content-between align-items-center">
              //         <h6 className="mb-0">Order Summary</h6>
              //       </div>
              //       <div className="card-body p-0">
              //         <div className="table-responsive">
              //           <table className="table table-hover align-middle m-0 text-center">
              //             <thead className="table-light">
              //             <tr>
              //               <th>Order ID</th>
              //               <th>Product Name</th>
              //               <th>Quantity</th>
              //               <th>Unit Price</th>
              //               <th>Status</th>
              //               <th>Action</th>
              //             </tr>
              //             </thead>
              //             <tbody>
              //             {orders.map(order =>
              //               order.orderItems.map(item => {
              //                 const isEditing =
              //                   editIndex?.orderId === order.orderId &&
              //                   editIndex?.itemId === item.productId
              //
              //                 return (
              //                   <tr key={`${order.orderId}-${item.productId}`}>
              //                     <td>#{order.orderId}</td>
              //                     <td>
              //                       {isEditing ? (
              //                         <input
              //                           type="text"
              //                           name="productName"
              //                           className="form-control"
              //                           value={formData?.productId || ""}
              //                           onChange={handleChange}
              //                         />
              //                       ) : (
              //                         item.productId
              //                       )}
              //                     </td>
              //                     <td>
              //                       {isEditing ? (
              //                         <input
              //                           type="number"
              //                           name="quantity"
              //                           min={1}
              //                           className="form-control"
              //                           value={formData?.quantity || 1}
              //                           onChange={handleChange}
              //                         />
              //                       ) : (
              //                         item.quantity
              //                       )}
              //                     </td>
              //                     <td>
              //                       {isEditing ? (
              //                         <input
              //                           type="number"
              //                           name="unitPrice"
              //                           step="0.01"
              //                           className="form-control"
              //                           value={formData?.unitPrice || 0}
              //                           onChange={handleChange}
              //                         />
              //                       ) : (
              //                         `$${item.unitPrice.toFixed(2)}`
              //                       )}
              //                     </td>
              //                     <td>
              //                         <span
              //                           className={`badge bg-${
              //                             statusMap[order.status ?? "Paid"] ?? "secondary"
              //                           }`}
              //                         >
              //                           {order.status}
              //                         </span>
              //                     </td>
              //                     <td>
              //                       {isEditing ? (
              //                         <>
              //                           <button
              //                             className="btn btn-outline-secondary btn-sm me-1"
              //                             onClick={handleCancel}
              //                           >
              //                             Cancel
              //                           </button>
              //                           <button
              //                             className="btn btn-primary btn-sm"
              //                             onClick={handleSave}
              //                           >
              //                             Save
              //                           </button>
              //                         </>
              //                       ) : (
              //                         <button
              //                           className="btn btn-info btn-sm"
              //                           onClick={() => handleEdit(order.orderId!, item)}
              //                         >
              //                           Edit
              //                         </button>
              //                       )}
              //                     </td>
              //                   </tr>
              //                 )
              //               }),
              //             )}
              //             </tbody>
              //           </table>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ) : (
              <p className="text-muted">No orders found.</p>
            )}
          </div>

          {/*<div className="accordion-body">*/}
          {/*  {orders.length > 0 ? (*/}
          {/*    <div className="row gx-3">*/}
          {/*      <div className="col-12">*/}
          {/*        <div className="card mb-3">*/}
          {/*          <div className="card-header d-flex justify-content-between align-items-center">*/}
          {/*            <h6 className="mb-0">Order Summary</h6>*/}
          {/*          </div>*/}
          {/*          <div className="card-body p-0">*/}
          {/*            <div className="table-responsive">*/}
          {/*              <table className="table table-hover align-middle m-0 text-center">*/}
          {/*                <thead className="table-light">*/}
          {/*                <tr>*/}
          {/*                  <th>Order ID</th>*/}
          {/*                  <th>Product Name</th>*/}
          {/*                  <th>Quantity</th>*/}
          {/*                  <th>Unit Price</th>*/}
          {/*                  <th>Status</th>*/}
          {/*                  <th>Action</th>*/}
          {/*                </tr>*/}
          {/*                </thead>*/}
          {/*                <tbody>*/}
          {/*                {orders.map(order =>*/}
          {/*                  order.orderItems.map(item => {*/}
          {/*                    const isEditing =*/}
          {/*                      editIndex?.orderId === order.orderId &&*/}
          {/*                      editIndex?.itemId === item.productId*/}

          {/*                    return (*/}
          {/*                      <tr key={`${order.orderId}-${item.productId}`}>*/}
          {/*                        <td>#{order.orderId}</td>*/}
          {/*                        <td>*/}
          {/*                          {isEditing ? (*/}
          {/*                            <input*/}
          {/*                              type="text"*/}
          {/*                              name="productName"*/}
          {/*                              className="form-control"*/}
          {/*                              value={formData?.productId || ""}*/}
          {/*                              onChange={handleChange}*/}
          {/*                            />*/}
          {/*                          ) : (*/}
          {/*                            item.productId*/}
          {/*                          )}*/}
          {/*                        </td>*/}
          {/*                        <td>*/}
          {/*                          {isEditing ? (*/}
          {/*                            <input*/}
          {/*                              type="number"*/}
          {/*                              name="quantity"*/}
          {/*                              min={1}*/}
          {/*                              className="form-control"*/}
          {/*                              value={formData?.quantity || 1}*/}
          {/*                              onChange={handleChange}*/}
          {/*                            />*/}
          {/*                          ) : (*/}
          {/*                            item.quantity*/}
          {/*                          )}*/}
          {/*                        </td>*/}
          {/*                        <td>*/}
          {/*                          {isEditing ? (*/}
          {/*                            <input*/}
          {/*                              type="number"*/}
          {/*                              name="unitPrice"*/}
          {/*                              step="0.01"*/}
          {/*                              className="form-control"*/}
          {/*                              value={formData?.unitPrice || 0}*/}
          {/*                              onChange={handleChange}*/}
          {/*                            />*/}
          {/*                          ) : (*/}
          {/*                            `$${item.unitPrice.toFixed(2)}`*/}
          {/*                          )}*/}
          {/*                        </td>*/}
          {/*                        <td>*/}
          {/*                            <span*/}
          {/*                              className={`badge bg-${*/}
          {/*                                statusMap[order.status ?? "Paid"] ?? "secondary"*/}
          {/*                              }`}*/}
          {/*                            >*/}
          {/*                              {order.status}*/}
          {/*                            </span>*/}
          {/*                        </td>*/}
          {/*                        <td>*/}
          {/*                          {isEditing ? (*/}
          {/*                            <>*/}
          {/*                              <button*/}
          {/*                                className="btn btn-outline-secondary btn-sm me-1"*/}
          {/*                                onClick={handleCancel}*/}
          {/*                              >*/}
          {/*                                Cancel*/}
          {/*                              </button>*/}
          {/*                              <button*/}
          {/*                                className="btn btn-primary btn-sm"*/}
          {/*                                onClick={handleSave}*/}
          {/*                              >*/}
          {/*                                Save*/}
          {/*                              </button>*/}
          {/*                            </>*/}
          {/*                          ) : (*/}
          {/*                            <button*/}
          {/*                              className="btn btn-info btn-sm"*/}
          {/*                              onClick={() => handleEdit(order.orderId!, item)}*/}
          {/*                            >*/}
          {/*                              Edit*/}
          {/*                            </button>*/}
          {/*                          )}*/}
          {/*                        </td>*/}
          {/*                      </tr>*/}
          {/*                    )*/}
          {/*                  }),*/}
          {/*                )}*/}
          {/*                </tbody>*/}
          {/*              </table>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    <p className="text-muted">No orders found.</p>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}

export default Orders
