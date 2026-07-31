// PaymentTerminal.jsx
import React, { useState } from "react";


export default function PaymentTerminal({ defaultAmount, onPaymentSuccess }) {
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    if (defaultAmount && !paid) {
      setPaid(true);
      onPaymentSuccess(defaultAmount);
    }
  };

  return (
    
    <div className="payment-terminal">
      <h4>💳 Terminal de Plată</h4>
      <div className="terminal-display">
        {/* <span className="amount">{defaultAmount ? `${defaultAmount}` : "—"}</span> */}
      </div>
      <button
        type="button"
        onClick={handlePayment}
        disabled={!defaultAmount || paid}
      >
        {paid ? "✅ Plătit" : "Plătește"}
      </button>
    </div>
  );
}
