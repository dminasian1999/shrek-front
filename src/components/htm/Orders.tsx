import React, { useState } from "react"
import { AddressT, OrderItemT, OrderT } from "../../utils/types.ts"

const statusMap = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
}

// Mock data for example
const mockOrders: OrderT[] = [
  {
    orderId: "00001",
    status: "Paid",
    orderItems: [
      {
        orderItemId: "item001",
        product: {
          productId: "prod001",
          name: "Wireless Headphones",
          imageUrls: ["https://via.placeholder.com/100"],
          quantity: 10,
          price: 99.99,
          category: "Electronics",
          color: "Black",
          material: "Plastic",
          desc: "Noise-cancelling wireless headphones.",
        },
        quantity: 2,
        unitPrice: 89.99,
      },
      {
        orderItemId: "item002",
        product: {
          productId: "prod002",
          name: "Bluetooth Speaker",
          imageUrls: ["https://via.placeholder.com/100"],
          quantity: 5,
          price: 59.99,
          category: "Electronics",
          color: "Blue",
          material: "Plastic",
          desc: "Portable speaker with bass boost.",
        },
        quantity: 1,
        unitPrice: 49.99,
      },
    ],
    userId: "",
    totalAmount: 0,
    shippingAddress: {} as AddressT,
    paymentMethod: "",
    dateCreated: new Date("1999-10-10"),
  },
  {
    orderId: "00002",
    status: "Overdue",

    orderItems: [
      {
        orderItemId: "item003",
        product: {
          productId: "prod003",
          name: "Smart Watch",
          imageUrls: ["https://via.placeholder.com/100"],
          quantity: 15,
          price: 199.99,
          category: "Wearables",
          color: "Silver",
          material: "Aluminum",
          desc: "Smart watch with health tracking.",
        },
        quantity: 1,
        unitPrice: 189.99,
      },
    ],
    userId: "",
    totalAmount: 0,
    shippingAddress: {} as AddressT,
    paymentMethod: "",
    dateCreated: new Date("1999-10-10"), // YYYY-MM-DD is safest format
  },
]

const Orders = () => {
  const [orders, setOrders] = useState<OrderT[]>(mockOrders)
  const [formData, setFormData] = useState<OrderItemT | null>(null)
  const [editIndex, setEditIndex] = useState<{ orderId: string; itemId: string } | null>(null)

  // Determine if any orderItem is currently being edited
  const orderItemToEdit = editIndex
    ? orders
      .find(o => o.orderId === editIndex.orderId)
      ?.orderItems.find(i => i.orderItemId === editIndex.itemId)
    : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (!formData) return

    setFormData(prev => {
      if (!prev) return null
      const updated = { ...prev }

      if (name === "quantity") updated.quantity = Number(value)
      else if (name === "priceAtPurchase") updated.unitPrice = Number(value)
      else if (name === "productName") updated.product.name = value

      return updated
    })
  }

  const handleEdit = (orderId: string, item: OrderItemT) => {
    setEditIndex({ orderId, itemId: item.orderItemId })
    setFormData({ ...item })
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
          item.orderItemId === editIndex.itemId ? formData : item
        ),
      }
    })

    setOrders(updatedOrders)
    setEditIndex(null)
    setFormData(null)
  }

  return (
    <div className="accordion" id="accordionOrder">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOrder">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOrder"
            aria-expanded="false"
            aria-controls="collapseOrder"
          >
            My Orders
          </button>
        </h2>
        <div
          id="collapseOrder"
          className="accordion-collapse collapse"
          aria-labelledby="headingOrder"
        >
          <div className="accordion-body">
            {orders.length > 0 ? (
              <div className="row gx-3">
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-header d-flex align-items-end justify-content-between">
                      <small className="opacity-50">Select all checkboxes to send an update.</small>
                      <button className="btn btn-info">Send to everyone</button>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table align-middle m-0">
                          <thead>
                          <tr>
                            <th>
                              <input type="checkbox" className="form-check m-0" />
                            </th>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price at Purchase</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {orders.flatMap(order =>
                            order.orderItems.map(item => {
                              const isEditing =
                                editIndex?.orderId === order.orderId &&
                                editIndex?.itemId === item.orderItemId

                              return (
                                <tr key={`${order.orderId}-${item.orderItemId}`}>
                                  <td>
                                    <input type="checkbox" className="form-check m-0" />
                                  </td>
                                  <td>#{order.orderId}</td>
                                  <td>
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        name="productName"
                                        className="form-control"
                                        value={formData?.product.name || ""}
                                        onChange={handleChange}
                                      />
                                    ) : (
                                      item.product.name
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
                                        name="priceAtPurchase"
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
                                        className={`badge bg-${statusMap[item.status ?? "Paid"]}`}
                                      >
                                        {item.status ?? "Paid"}
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
                                        onClick={() => handleEdit(order.orderId, item)}
                                      >
                                        Edit
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              )
                            })
                          )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No order items found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
