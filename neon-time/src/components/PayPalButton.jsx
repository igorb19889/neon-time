import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, onSuccess }) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AZmVeOzMNca6JrnSn-ahXc0XH_r6y2SxoE1CyRWFNSSBqZqnoSxJVamwZo1W5ZDT6PhCIwSKiCJRCaRb",
        currency: "EUR",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: amount.toString() },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`✅ Mulțumim, ${name}! Plata a fost efectuată cu succes!`);
              if (onSuccess) onSuccess(details);
            });
          }}
          onError={(err) => {
            console.error("❌ Eroare la plată:", err);
            alert("A apărut o eroare la procesarea plății.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
