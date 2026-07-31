import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SCedsIASHHEeFIdk7alMHHBg9ryGbHfLkPNpwLMv3tkNUMQSaD5fUc3Ehl8GPiqa40o7KWlkQ2CC2l7hnXN6Pzb00FmIz0ZbO"); // ⚠️ Publishable Key

export default function StripeTest() {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("http://localhost:4242/create-checkout-session");
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Eroare Stripe:", err);
      alert("Eroare la Stripe");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>💳 Test Stripe Checkout</h2>
      <button
        onClick={handleCheckout}
        style={{
          padding: "15px 30px",
          backgroundColor: "#ff3c78",
          border: "none",
          borderRadius: "12px",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Plătește 10 MDL
      </button>
    </div>
  );
}
