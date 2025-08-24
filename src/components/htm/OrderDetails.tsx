import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderT, ProductT } from "../../utils/types.ts";
import { baseUrlBlog } from "../../utils/constants.ts";
import { getPostById } from "../../features/api/postActions.tsx";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderT | null>(null);
  const [products, setProducts] = useState<Record<string, ProductT>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/order/${orderId}`);
        if (!res.ok) throw new Error("Failed to load order");
        const data: OrderT = await res.json();
        setOrder(data);

        const productIds = Array.from(
          new Set(data.orderItems?.map((item) => item.productId).filter(Boolean))
        );

        const productEntries = await Promise.all(
          productIds.map(async (id) => {
            try {
              const product = await getPostById(id!);
              return [id, product] as const;
            } catch {
              return [id, null] as const;
            }
          })
        );

        const productMap: Record<string, ProductT> = {};
        for (const [id, product] of productEntries) {
          if (product) productMap[id!] = product;
        }
        setProducts(productMap);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) return <div className="text-center mt-5">Loading order...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!order) return <div className="alert alert-warning">No order found.</div>;

  // ---- Totals ----
  const subTotal =
    order.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;

  // If your API returns shipping, add `shippingPrice?: number` to OrderT and use it. Fallback to 0.
  const shipping = (order as any).shippingPrice ?? 0;
  const grandTotal = subTotal + shipping;

  const badge =
    order.status === "Paid" ? "success" : order.status === "Pending" ? "warning" : "danger";

  const created =
    order.dateCreated
      ? new Date(order.dateCreated as unknown as string).toLocaleDateString()
      : "-";

  return (
    <div className="container-fluid mt-4">
      <div className="card">
        <div className="card-body">
          <div className="container mb-5 mt-3">
            <div className="row d-flex align-items-baseline">
              <div className="col-xl-9">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Invoice &gt;&gt; <strong>ID: #{order.orderId || orderId}</strong>
                </p>
              </div>
            </div>

            <div className="container">
              {/* Address + Invoice Meta */}
              <div className="row">
                <div className="col-xl-8">
                  <ul className="list-unstyled">
                    <li className="text-muted">
                      <strong>To:</strong>{" "}
                      <span style={{ color: "#8f8061" }}>
                        {order.shippingAddress.fullName}
                      </span>
                    </li>
                    <li className="text-muted">
                      <strong>Street:</strong> {order.shippingAddress.street}
                    </li>
                    <li className="text-muted">
                      <strong>City/State:</strong>{" "}
                      {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </li>
                    <li className="text-muted">
                      <strong>Country:</strong> {order.shippingAddress.country}
                    </li>
                    <li className="text-muted">
                      <strong>Phone:</strong> <i className="fa fa-phone" />{" "}
                      {order.shippingAddress.phone}
                    </li>
                  </ul>
                </div>

                <div className="col-xl-4">
                  <p className="text-muted">Invoice</p>
                  <ul className="list-unstyled">
                    <li className="text-muted">
                      <i className="fa fa-circle" style={{ color: "#8f8061" }} />{" "}
                      <span className="fw-bold">ID:</span> #{order.orderId || orderId}
                    </li>
                    <li className="text-muted">
                      <i className="fa fa-circle" style={{ color: "#8f8061" }} />{" "}
                      <span className="fw-bold">Creation Date: </span>
                      {created}
                    </li>
                    <li className="text-muted">
                      <i className="fa fa-circle" style={{ color: "#8f8061" }} />{" "}
                      <span className="me-1 fw-bold">Status:</span>
                      <span className={`badge bg-${badge} text-white fw-bold`}>
                        {order.status || "Unknown"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Items list (multi) */}
              {order.orderItems?.map((item, idx) => {
                const product = item.productId ? products[item.productId] : undefined;
                const img = product?.imageUrls?.[0];
                const lineTotal = (item.unitPrice * item.quantity).toFixed(2);

                return (
                  <div className="row my-2 mx-1 justify-content-center" key={`${item.productId}-${idx}`}>
                    <div className="col-md-2 mb-4 mb-md-0">
                      <div
                        className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                        data-ripple-color="light"
                      >
                        {img ? (
                          <img
                            src={img}
                            className="w-100"
                            height="100px"
                            alt={product?.name || "Product image"}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className="w-100 d-flex align-items-center justify-content-center bg-light"
                            style={{ height: "100px" }}
                          >
                            No Image
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-7 mb-4 mb-md-0">
                      <p className="fw-bold mb-2">{product?.name || "Unknown product"}</p>
                      {/* Optional attributes (only show if present on product) */}
                      {product?.size && (
                        <p className="mb-1">
                          <span className="text-muted me-2">Size:</span>
                          <span>
                            {product.size === "custom"
                              ? product.size || "Custom"
                              : product.size}
                          </span>
                        </p>
                      )}
                      {product?.color && (
                        <p className="mb-1 d-flex align-items-center gap-2">
                          <span className="text-muted">Color:</span>
                          <span
                            title={product.color}
                            style={{
                              width: 16,
                              height: 16,
                              backgroundColor: product.color,
                              borderRadius: "50%",
                              border: "1px solid #ccc",
                              display: "inline-block",
                            }}
                          />
                          <span className="text-capitalize">{product.color}</span>
                        </p>
                      )}
                      {product?.material && (
                        <p className="mb-0">
                          <span className="text-muted me-2">Material:</span>
                          <span>{product.material}</span>
                        </p>
                      )}
                    </div>

                    <div className="col-md-3 mb-4 mb-md-0">
                      <h6 className="mb-1">
                        <span className="text-muted small me-2">Unit:</span>${item.unitPrice.toFixed(2)}
                      </h6>
                      <h6 className="mb-1">
                        <span className="text-muted small me-2">Qty:</span>{item.quantity}
                      </h6>
                      <h5 className="mb-0">
                        <span className="align-middle">${lineTotal}</span>
                      </h5>
                    </div>
                  </div>
                );
              })}

              <hr />

              {/* Totals */}
              <div className="row">
                <div className="col-xl-8">
                  <p className="ms-3">Add additional notes and payment information</p>
                </div>
                <div className="col-xl-3">
                  <ul className="list-unstyled">
                    <li className="text-muted ms-3">
                      <span className="text-black me-4">SubTotal</span>${subTotal.toFixed(2)}
                    </li>
                    <li className="text-muted ms-3 mt-2">
                      <span className="text-black me-4">Shipping</span>${shipping.toFixed(2)}
                    </li>
                  </ul>
                  <p className="text-black float-start">
                    <span className="text-black me-3">Total Amount</span>
                    <span style={{ fontSize: "25px" }}>${grandTotal.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
