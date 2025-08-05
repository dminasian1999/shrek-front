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

  const total = order.orderItems?.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  ) || 0;

  return (
    <div className="container mt-4">
      <h2>Order #{order.orderId}</h2>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`badge bg-${
          order.status === "Paid"
            ? "success"
            : order.status === "Pending"
              ? "warning"
              : "danger"
        }`}>
          {order.status}
        </span>
      </p>

      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark">
        <tr>
          <th>Product</th>
          <th>Image</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>
        {order.orderItems?.map((item) => {
          const product = products[item.productId!];
          return (
            <tr key={item.productId}>
              <td>{product?.name || "Unknown Product"}</td>
              <td>
                {product?.imageUrls?.[0] ? (
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
            </tr>
          );
        })}
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={4} className="text-end fw-bold">Total:</td>
          <td className="fw-bold">${total.toFixed(2)}</td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
