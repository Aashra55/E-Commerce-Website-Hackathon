"use client";

import { createContext, useState, ReactNode, useContext, useRef } from "react";
import { typeOfData } from "@/app/utils/types";

type CartContextType = {
  cart: typeOfData[];
  addToCart: (product: typeOfData) => void;
  removeFromCart: (productId: string) => void;
};

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<typeOfData[]>([]);
  const stockUpdated = useRef(new Set()); // 🔥 Tracks which products have updated stock

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

  const addToCart = async (product: typeOfData) => {
    if (!product?._id) {
      console.error("Product must have a valid '_id'.", product);
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (!existingProduct) {
        // ✅ Only update stock if it hasn’t been updated already
        if (!stockUpdated.current.has(product._id)) {
          stockUpdated.current.add(product._id); // 🔥 Mark stock as updated
          updateStock(product._id, 1); // ✅ Reduce stock only once
        }
        return [...prevCart, product]; // ✅ Add product to cart
      } else {
        console.log("Product already in cart. No stock update.");
        return prevCart; // 🚀 Prevents unnecessary updates
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

