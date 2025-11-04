import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SCedsIASHHEeFIdk7alMHHBg9ryGbHfLkPNpwLMv3tkNUMQSaD5fUc3Ehl8GPiqa40o7KWlkQ2CC2l7hnXN6Pzb00FmIz0ZbO"); // cheia publică Stripe test

export default function CheckoutForm({ amount, onPaymentSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <InnerCheckoutForm amount={amount} onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
}

function InnerCheckoutForm({ amount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const res = await fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const { clientSecret } = await res.json();

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setMessage("💳 Plata a fost efectuată cu succes ✅");
        onPaymentSuccess();
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Se procesează..." : "💳 Achită"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
