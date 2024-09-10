import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrderPlaced } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PfHW4RxcI6bHj6KjEjOXWSA4MJl0x0nvNoWsQ53H9VgCW2n5usH6Mv6DVQuwOoD9VFOnl070F9kDRCy0DGpyUpo00YuXavi9Y");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const orderDetail=useSelector(selectCurrentOrderPlaced)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3333/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {totalAmount:orderDetail.totalAmount}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}