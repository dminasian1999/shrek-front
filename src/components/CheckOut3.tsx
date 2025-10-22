import React, { useCallback, useState } from "react"
import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { baseUrl } from "../utils/constants.ts"
import { initialOptions, OrderData, ProductT } from "../utils/types.ts"
import ProductPage from "./htm/ProductPage.tsx"

type CreateOrderResponse = { id: string };
type CaptureResponse = {
  status: string;
  payer?: { name?: { given_name?: string } };
};


const Checkout3 = ({ product }: { product: ProductT })=> {
  const [error, setError] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)

  const style: PayPalButtonsComponentProps["style"] = {
    layout: "vertical",
    shape: "rect",
    label: "paypal"
    // height: 45, // optional
    // color: "gold" | "blue" | "silver" | "black" | "white", // optional
    // tagline: false, // optional
  }
  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const response = await fetch("/my-server/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart: [{ id: product.id, quantity: 1 }],
          }),
        });

      const orderData: OrderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;

    } catch (error) {
        console.error(error);
        throw error;
      }
    };
    return (
      <>
        <button
          data-bs-toggle="modal"
          className="btn btn-lg btn-primary px-4 flex-grow-1" // --- Refactor: flex-grow-1
        >
          <i className="fa fa-shopping-cart me-2" />
          BUY NOW
        </button>
        <PayPalScriptProvider options={initialOptions}>
          <button
            data-bs-toggle="modal"
            className="btn btn-lg btn-primary px-4 flex-grow-1" // --- Refactor: flex-grow-1
          >
            <i className="fa fa-shopping-cart me-2" />
            BUY NOW
          </button>
          <div className="">
            {paid && (
              <div className="alert alert-success">Payment successful 🎉</div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            <PayPalButtons
              style={style}
              createOrder={createOrder}
              // onApprove={onApprove}
              // onError={onError}
              // onCancel={onCancel}
            />
          </div>
        </PayPalScriptProvider>
      </>
    )
  }
export default Checkout3

  // const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
  //   try {
  //     const response = await fetch("/my-server/create-paypal-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         cart: [{ id: , quantity: "YOUR_PRODUCT_QUANTITY" }]
  //       })
  //     })
  //
  //     const orderData: OrderData = await response.json()
  //
  //     if (!orderData.id) {
  //       const errorDetail = orderData?.details?.[0];
  //       const errorMessage = errorDetail
  //         ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
  //         : "Unexpected error occurred, please try again."
  //
  //       throw new Error(errorMessage)
  //     }
  //
  //     return orderData.id
  //
  //   } catch
  //     (error) {
  //     console.error(error)
  //     throw error
  //   }
  // }


  // const createOrder: PayPalButtonsComponentProps["createOrder"] = useCallback(async () => {
  //   setError(null);
  //   const res = await fetch(baseUrl+"/api/paypal/orders", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       // Send whatever you need to price the order on your server:
  //       cart: [{ sku: "ABC-123", quantity: 2 }],
  //     }),
  //   });
  //   if (!res.ok) {
  //     const text = await res.text();
  //     throw new Error(text || "Failed to create order");
  //   }
  //   const data: CreateOrderResponse = await res.json();
  //   if (!data?.id) throw new Error("Order ID missing");
  //   return data.id;
  // }, []);
  //
  // const onApprove: PayPalButtonsComponentProps["onApprove"] = useCallback(
  //   async (data: { orderID: any }) => {
  //     setError(null)
  //     const res = await fetch(baseUrl + `/api/paypal/orders/${data.orderID}/capture`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" }
  //     })
  //     if (!res.ok) {
  //       const text = await res.text()
  //       throw new Error(text || "Failed to capture")
  //     }
  //     const details: CaptureResponse = await res.json()
  //     if (details?.status === "COMPLETED") {
  //       setPaid(true)
  //       alert(
  //         `Payment completed${details?.payer?.name?.given_name ? ` by ${details.payer.name.given_name}` : ""}.`
  //       )
  //     } else {
  //       throw new Error("Payment not completed")
  //     }
  //   },
  //   []
  // )
  //
  // const onError: PayPalButtonsComponentProps["onError"] = useCallback(
  //   (err: any) => {
  //     console.error(err)
  //     setError("Something went wrong with PayPal. Please try again.")
  //   },
  //   []
  // )

  // const onCancel: PayPalButtonsComponentProps["onCancel"] = useCallback(() => {
  //   // Optional: route back to cart or show message
  //   // window.location.assign("/cart");
  // }, [])
