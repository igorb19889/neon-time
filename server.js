import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const PORT = 4242;

const stripe = new Stripe("sk_test_51SCedsIASHHEeFIdl36PUlPeVXVjdSECaJa6vyov3eiQRC1MXy0yYkeQhpCAsX8OpY8Dw1oevCyHMTlSgIyXdhS000HCt0akB5", {
  apiVersion: "2022-11-15",
});

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "mdl",
            product_data: {
              name: "Rezervare Neon Time",
            },
            unit_amount: amount * 100, // Stripe folosește cenți
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/contact?payment=success",
      cancel_url: "http://localhost:5173/contact?payment=cancel",


      // success_url: 'http://192.168.100.47:5173/contact?payment=success',
      // cancel_url: 'http://192.168.100.47:5173/contact?payment=cancel',

      // success_url: "http://192.168.100.47:5173/contact?payment=success#reservation_submit",
      // cancel_url: "http://192.168.100.47:5173/contact?payment=cancel#reservation_submit",
    });


    res.send({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`⚡ Server Stripe pornit la http://localhost:${PORT}`);
});

// app.listen(PORT, '0.0.0.0', () => 
// console.log('⚡ Server Stripe pornit la http://0.0.0.0:4242'));
