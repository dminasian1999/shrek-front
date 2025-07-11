// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//
// export default function PayPalCheckout() {
//   return (
//     <PayPalScriptProvider
//       options={{
//         "client-id":
//           "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ",
//       }}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical" }}
//         createOrder={(
//           _data: any,
//           actions: {
//             order: {
//               create: (arg0: {
//                 purchase_units: { amount: { value: string } }[]
//               }) => any
//             }
//           },
//         ) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: "10.00", // сюда подставляется цена
//                 },
//               },
//             ],
//           })
//         }}
//         onApprove={(_data, actions) => {
//           return actions.order.capture().then(details => {
//             alert("Payment completed by " + details.payer.name.given_name)
//             // тут можно отправить запрос на backend, чтобы отметить заказ как оплаченный
//           })
//         }}
//       />
//     </PayPalScriptProvider>
//   )
// }
