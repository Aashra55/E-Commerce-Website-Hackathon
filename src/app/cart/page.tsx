"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { urlFor } from "../utils/sanity";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import  GetProductData  from "../../sanity/sanity.query";

export default function Cart() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const { cart, removeFromCart } = useCart();
  const subTotal = cart.reduce(
    (total, item) => total + item.price * (qty[item._id] || 1),
    0
  );

  // // Handle increase product quantity
  const increaseProduct = (id: string) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: (prevQty[id] || 0) + 1,
    }));
  };

  // // Handle decrease product quantity
  const decreaseProduct = (id: string) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: prevQty[id] > 0 ? prevQty[id] - 1 : 0,
    }));
  };

  console.log(cart);

  //stock updating logic
const updateStock = async (productId: string, quantity: number) => {
  try {
    const res = await fetch("/api/updateStock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const errorMessage = await res.text(); // Get error response
      throw new Error(errorMessage || "Failed to update stock");
    }

    const data = await res.json(); // Parse response JSON
    console.log("Stock updated:", data.newStock);
  } catch (error) {
    console.error("Stock update failed:", error);
  }
};

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />
          {cart.length === 0 ? (
            <p className="w-full text-center">No item in the cart</p>
          ) : (
            <div className="space-y-4">
              {cart.map((e, index) => (
                <div key={index} className="grid grid-cols-3 items-center gap-4">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                      <Image
                        alt={e.name}
                        width={100}
                        height={100}
                        src={urlFor(e.image).width(400).url()}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        {e.name}
                      </h3>
                      <h6
                        onClick={() => {

                          updateStock(e._id, -1); // Increase stock by 1

                          if (window.confirm("Are you sure you want to remove this item?")) {
                            removeFromCart(e._id);
                            toast.warning("Product removed from cart!");
                          }
                        }}
                        className="text-xs text-red-500 cursor-pointer mt-0.5"
                      >
                        Remove
                      </h6>

                      <div className="flex md:gap-4 gap-1 mt-4">
                        <div className="relative group">
                          <button
                            type="button"
                            className="flex items-center md:px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                          >
                            <select name="sizes" id="sizes" className="focus:outline-none bg-transparent w-full h-full">
                              {e.sizes.map((e, index)=>(
                                <option key={index} value="size">{e}</option>
                              ))}
                            </select>
                          </button>

                        </div>

                        <div>
                          <button
                            type="button"
                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                          >
                            <svg
                              onClick={() => decreaseProduct(e._id)}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>

                            <span className="mx-2.5">{qty[e._id] || 1}</span>
                            <svg
                              onClick={() => increaseProduct(e._id)}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 fill-current"
                              viewBox="0 0 42 42"
                            >
                              <path
                                d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <h4 className="text-base font-bold text-gray-800">
                      ${e.price * (qty[e._id] || 1)}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <div className="flex border border-orange-600 overflow-hidden rounded-md">
            <input
              type="email"
              placeholder="Promo code"
              className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
            />
            <button
              type="button"
              className="flex items-center justify-center font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 px-4 text-sm text-white"
            >
              Apply
            </button>
          </div>

          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total{" "}
              {cart.length === 0 ? (
                <span className="ml-auto">$0</span>
              ) : (
                <span className="ml-auto">${subTotal + 6}</span>
              )}
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
              text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 text-white rounded-md"
            >
              {cart.length !== 0 ? (
                <Link href={"/checkout"}>Checkout</Link>
              ) : (
                <Link href={"/cart"}>Checkout</Link>
              )}
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
            >
              <Link href={"/"}>Continue Shopping</Link>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
