"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/context/CartContext";
import { nanoid } from "nanoid";  
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function StripeCheckout() {
  const { cart } = useCart(); 
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const { data: session } = useSession();

  const handleClick = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const sessionResponse = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }), // 🛒 Cart data backend ko bhej rahe hain
    });

    const session = await sessionResponse.json();

    if (stripe && session.sessionId) {
      await stripe.redirectToCheckout({ sessionId: session.sessionId });
    }
    setLoading(false);
  };

  //to export data in CMS

  const placeOrder = async () => {
    setLoading(true);
    setMessage("");

    const orderData = {
      user: session?.user?.name,
      email: session?.user?.email,
      products: cart.map((item) => ({
        _type: "reference",
        _ref: item._id,
        _key: nanoid(), // ✅ Unique key for each product reference

      })),
            totalPrice: cart.reduce((total, item) => total + item.price, 0),
    };

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("✅ Order placed successfully!");
    } else {
      setMessage("❌ Failed to place order. Try again.");
    }
  };

  const handleButtonClick = () => {
    handleClick();
    placeOrder();
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <button
        onClick={handleButtonClick}
        disabled={loading}
        className="bg-blue-500 text-white p-6 text-[18px]"
      >
        {loading ? "Redirecting..." : "Checkout with Stripe"}
      </button>
      {message && <p className="m-3 block">{message}</p>}
    </div>
  );
}
