import React from "react";
import { useOrders } from "./new.ts"
import { OrderListItem } from "./new2.tsx"

const Orders: React.FC = () => {
  const { orders, loading, error } = useOrders();

  // if (loading) {
  //   return <LoadingSpinner text="Loading your orders..." />;
  // }

  // if (error) {
  //   return <ErrorMessage message={error} />;
  // }

  return (
    <div className="container my-4">
      <h1 className="mb-4">My Orders</h1>
      <div className="accordion" id="accordionOrders">
        {orders.length === 0 ? (
          <div className="card text-center p-5">
            <p className="h5 text-muted">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <OrderListItem key={order.orderId} order={order} index={idx} />
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
