"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/context/CartContext";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../utils/sanity";
import {
  FiLock,
  FiShield,
  FiCheckCircle,
  FiArrowLeft,
  FiCreditCard,
  FiAlertCircle,
  FiShoppingBag,
} from "react-icons/fi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function StripeCheckout() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const subTotal = cart.reduce((total, item) => total + item.price, 0);
  const shippingFee = subTotal > 75 || cart.length === 0 ? 0 : 2.0;
  const grandTotal = subTotal + shippingFee;

  const handleClick = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const sessionResponse = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const sessionData = await sessionResponse.json();

    if (stripe && sessionData.sessionId) {
      await stripe.redirectToCheckout({ sessionId: sessionData.sessionId });
    }
    setLoading(false);
  };

  const placeOrder = async () => {
    setLoading(true);
    setMessage("");

    const orderData = {
      user: session?.user?.name || "Guest User",
      email: session?.user?.email || "guest@example.com",
      products: cart.map((item) => ({
        _type: "reference",
        _ref: item._id,
        _key: nanoid(),
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
      setMessage("Order placed successfully! Redirecting to payment...");
    } else {
      setMessage("Failed to place order. Try again.");
    }
  };

  const handleButtonClick = () => {
    handleClick();
    placeOrder();
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-orange-600 transition"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Shopping Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Payment & Checkout Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header info */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <FiCreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Secure Payment
                  </h1>
                  <p className="text-xs text-slate-500">
                    Powered by Stripe • End-to-end 256-bit encryption
                  </p>
                </div>
              </div>

              {/* Customer Account details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Contact Information
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {session?.user?.name || "Guest Customer"}
                </p>
                <p className="text-xs text-slate-500">
                  {session?.user?.email || "Email will be confirmed during Stripe checkout"}
                </p>
              </div>

              {/* Express Stripe Payment Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-slate-50 to-orange-50/30 border border-indigo-100/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                    Stripe Checkout
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
                    <FiShield className="w-3.5 h-3.5" />
                    <span>SSL Certified</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You will be securely redirected to Stripe to complete your transaction with Credit/Debit card, Apple Pay, or Google Pay.
                </p>
                
                {/* Accepted cards chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                    VISA
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                    MasterCard
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                    Amex
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                    Apple Pay
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                    Google Pay
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <div>
                <button
                  onClick={handleButtonClick}
                  disabled={loading || cart.length === 0}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-98 ${
                    loading || cart.length === 0
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer"
                  }`}
                >
                  <FiLock className="w-4 h-4" />
                  <span>
                    {loading
                      ? "Redirecting to Stripe..."
                      : `Pay $${grandTotal.toFixed(2)} with Stripe`}
                  </span>
                </button>
              </div>

              {/* Status Message */}
              {message && (
                <div
                  className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    message.includes("success") || message.includes("placed")
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {message.includes("success") || message.includes("placed") ? (
                    <FiCheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <FiAlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{message}</span>
                </div>
              )}

              {/* Safe Checkout Guarantee */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
                <div className="flex items-center gap-2 justify-center text-xs text-slate-500">
                  <FiShield className="w-4 h-4 text-emerald-500" />
                  <span>Fraud Protection</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-xs text-slate-500">
                  <FiLock className="w-4 h-4 text-orange-500" />
                  <span>256-Bit Encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">
                  Items in Order ({cart.length})
                </h2>
                <Link
                  href="/cart"
                  className="text-xs text-orange-600 hover:underline font-semibold"
                >
                  Edit Cart
                </Link>
              </div>

              {/* Cart Items list */}
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    Your cart is currently empty.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="w-14 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                        {item.image ? (
                          <Image
                            src={urlFor(item.image).width(120).url()}
                            alt={item.name}
                            width={120}
                            height={140}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <FiShoppingBag className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 capitalize">
                          {item.category || "Apparel"}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Order Totals */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Due</span>
                  <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
