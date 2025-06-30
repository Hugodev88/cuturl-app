import React from 'react';

const SubscriptionPage = () => {
  return (
    <div className="subscription-page">
      <h2>Subscription Plans</h2>
      <p>Choose a plan that suits your needs:</p>
      <div className="plan-cards">
        <div className="plan-card">
          <h3>Basic Plan</h3>
          <p className="price">Free</p>
          <ul>
            <li>Limited features</li>
            <li>Basic support</li>
          </ul>
          <button onClick={() => alert('Payment system not implemented yet.')}>Current Plan</button>
        </div>
        <div className="plan-card featured">
          <h3>Premium Plan</h3>
          <p className="price">$9.99/month</p>
          <ul>
            <li>All basic features</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
          </ul>
          <button onClick={() => alert('Payment system not implemented yet.')}>Subscribe</button>
        </div>
        <div className="plan-card">
          <h3>Enterprise Plan</h3>
          <p className="price">Contact us</p>
          <ul>
            <li>Custom features</li>
            <li>Dedicated support</li>
            <li>SLA</li>
          </ul>
          <button onClick={() => alert('Payment system not implemented yet.')}>Contact Sales</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;