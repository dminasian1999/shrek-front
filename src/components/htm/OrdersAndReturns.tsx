import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom

const OrdersAndReturns = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Orders and Returns</h1>
          <p className="lead">Information about your orders and our return policy.</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <h3 className="mb-3">How to Track Your Order</h3>
          <p>
            When your order is shipped, we will send you an email with your tracking number. You can check the status of your shipment at any time. If you have an account, you can also find tracking information in your 'Order History'.
          </p>

          <h3 className="mt-5 mb-3">Our Return Policy</h3>
          <p>
            We want you to be satisfied with your purchase. You can return an item within <strong>30 days</strong> of delivery for a full refund or exchange.
          </p>
          <p>To be eligible for a return, your item must be:</p>
          <ul>
            <li>Unused and in the same condition that you received it.</li>
            <li>In its original packaging with all tags attached.</li>
            <li>Accompanied by a receipt or proof of purchase.</li>
          </ul>

          <h3 className="mt-5 mb-3">How to Initiate a Return</h3>
          <p>
            To start a return, please contact our customer support team with your order number. We will provide you with a return shipping label and instructions. Once we receive your item, we will process your refund to the original method of payment.
          </p>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Need Help?</h5>
              <p className="card-text">
                If you have questions about your order or our return process, please get in touch.
              </p>
              <Link to="/contact-us" className="btn btn-primary">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersAndReturns;
