import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom

const SupportCenter = () => {
  return (
    <div className="container py-5">
      <div className="row text-center mb-5">
        <div className="col-12">
          <h1 className="display-4">Support Center</h1>
          <p className="lead">We're here to help.</p>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100 p-3">
            <div className="card-body">
              <i className="fas fa-question-circle fa-3x text-primary mb-3"></i>
              <h4 className="card-title">FAQ</h4>
              <p className="card-text">Find quick answers to common questions in our frequently asked questions section.</p>
              <Link to="/faq" className="btn btn-outline-primary mt-auto">Go to FAQ</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 p-3">
            <div className="card-body">
              <i className="fas fa-box fa-3x text-primary mb-3"></i>
              <h4 className="card-title">Orders & Returns</h4>
              <p className="card-text">Track your order, learn about shipping, or initiate a return.</p>
              <Link to="/orders-and-returns" className="btn btn-outline-primary mt-auto">Manage Orders</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 p-3">
            <div className="card-body">
              <i className="fas fa-envelope fa-3x text-primary mb-3"></i>
              <h4 className="card-title">Contact Us</h4>
              <p className="card-text">Have a specific question? Get in touch with our support team directly.</p>
              <Link to="/contact" className="btn btn-outline-primary mt-auto">Get in Touch</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
