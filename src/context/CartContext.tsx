"use client";

import { createContext, useState, ReactNode, useContext } from "react";
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

  const addToCart = (product: typeOfData) => {
    if (product?._id === undefined) {
      console.error("Product must have a valid 'id'.", product);
      return;
    }

    const existingProduct = cart.find((item) => item._id === product._id);
    if (!existingProduct) {
      setCart((prevCart) => [...prevCart, product]);
    }
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
