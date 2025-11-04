import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_xxxxxxxxxxxxxxxxxxxxx"); // cheia PUBLICĂ de la Stripe Dashboard

function App() {
  return (
    <div>
      <h1>Test Stripe Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
