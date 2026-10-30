"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { urlFor } from "../utils/sanity";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiArrowRight,
  FiCheck,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");
  const { cart, removeFromCart } = useCart();

  const subTotal = cart.reduce(
    (total, item) => total + item.price * (qty[item._id] || 1),
    0
  );

  const discountAmount = (subTotal * discountPercent) / 100;
  const shippingFee = subTotal > 75 || cart.length === 0 ? 0 : 2.0;
  const taxFee = cart.length === 0 ? 0 : 4.0;
  const grandTotal = Math.max(0, subTotal - discountAmount + shippingFee + taxFee);

  // Increase product quantity
  const increaseProduct = (id: string) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: (prevQty[id] || 1) + 1,
    }));
  };

  // Decrease product quantity
  const decreaseProduct = (id: string) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: Math.max(1, (prevQty[id] || 1) - 1),
    }));
  };

  // Stock updating logic (Backend API)
  const updateStock = async (productId: string, quantity: number) => {
    try {
      const res = await fetch("/api/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Failed to update stock");
      }

      const data = await res.json();
      console.log("Stock updated:", data.newStock);
    } catch (error) {
      console.error("Stock update failed:", error);
    }
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "FIRST20" || code === "FASHION20") {
      setDiscountPercent(20);
      setAppliedPromo(code);
      toast.success("Promo code applied! You saved 20%");
    } else if (code === "FREESHIP") {
      setDiscountPercent(10);
      setAppliedPromo(code);
      toast.success("Promo code applied! 10% discount added");
    } else {
      toast.error("Invalid coupon code. Try 'FIRST20' or 'FREESHIP'");
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Step Header */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
            <div className="flex items-center gap-2 text-orange-600">
              <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Shopping Cart</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                2
              </span>
              <span>Checkout</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                3
              </span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
              Looks like you haven&rsquo;t added any items to your bag yet. Explore our newest collections!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-500/25 transition"
            >
              <span>Explore Collection</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <h1 className="text-xl font-extrabold text-slate-900">
                    Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
                  </h1>
                  <span className="text-xs text-slate-400 font-medium">
                    Prices in USD
                  </span>
                </div>

                {/* Free shipping banner */}
                <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100 mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="flex items-center gap-1.5 text-orange-950">
                      <FiTruck className="w-4 h-4 text-orange-600" />
                      {subTotal >= 75
                        ? "🎉 Congratulations! You unlocked Free Worldwide Shipping!"
                        : `Add $${(75 - subTotal).toFixed(2)} more to qualify for Free Shipping!`}
                    </span>
                    <span className="text-orange-700 font-bold">
                      {Math.min(100, Math.round((subTotal / 75) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-orange-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.round((subTotal / 75) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => {
                    const itemQty = qty[item._id] || 1;
                    const itemTotal = (item.price * itemQty).toFixed(2);

                    return (
                      <div
                        key={item._id}
                        className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                          {item.image ? (
                            <Image
                              src={urlFor(item.image).width(200).url()}
                              alt={item.name}
                              width={200}
                              height={240}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                              No image
                            </div>
                          )}
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item._id}`}>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-orange-600 transition truncate">
                              {item.name}
                            </h3>
                          </Link>
                          
                          <p className="text-xs text-slate-500 mt-0.5 capitalize">
                            Category: {item.category || "Apparel"}
                          </p>

                          {/* Size selector if available */}
                          {item.sizes && item.sizes.length > 0 && (
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                              <span className="text-slate-400 text-[11px]">Size:</span>
                              <select
                                defaultValue={item.sizes[0]}
                                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
                              >
                                {item.sizes.map((s, idx) => (
                                  <option key={idx} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                updateStock(item._id, -1);
                                if (window.confirm("Remove this item from your bag?")) {
                                  removeFromCart(item._id);
                                  toast.warning("Product removed from cart!");
                                }
                              }}
                              className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-semibold transition"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-4 sm:ml-auto">
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                            <button
                              type="button"
                              onClick={() => decreaseProduct(item._id)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-xs text-slate-900">
                              {itemQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseProduct(item._id)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[70px]">
                            <span className="text-base font-extrabold text-slate-900 block">
                              ${itemTotal}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              ${item.price.toFixed(2)} ea
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky top-24">
              <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-lg font-extrabold text-slate-900 pb-3 border-b border-slate-100">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FIRST20"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-xs uppercase bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold mt-2 bg-emerald-50 px-3 py-1.5 rounded-lg">
                      <span className="flex items-center gap-1">
                        <FiCheck className="w-3.5 h-3.5" /> Code &lsquo;{appliedPromo}&rsquo; active
                      </span>
                      <span>-{discountPercent}%</span>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subTotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-900">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-slate-900">${taxFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base sm:text-lg font-black text-slate-900 pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="space-y-3 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition flex items-center justify-center gap-2 group text-center"
                  >
                    <span>Proceed to Checkout</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/"
                    className="w-full py-3 px-6 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold text-center block transition border border-slate-200/80"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust badge */}
                <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <FiShield className="w-4 h-4 text-emerald-500" />
                  <span>Guaranteed safe & secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
}
