"use client";
import { useWishList } from "@/context/WishlistContext";
import { urlFor } from "../utils/sanity";
import { useCart } from "@/context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

export default function WishlistPage() {
  const { wishList, removeFromWishList } = useWishList();
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 md:py-10 text-center md:text-3xl text-xl font-extrabold">
        My Wishlist
      </header>

      {/* Wishlist Content */}
      <main className="max-w-7xl mx-auto py-10 px-4">
        {wishList.length === 0 ? (
          <div className="text-center md:text-2xl font-medium text-gray-500">
            Your wishlist is empty!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishList.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="relative h-56">
                  <Image
                    src={urlFor(product.image).width(400).url()}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishList(product._id)}
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
                    absolute top-3 right-3 bg-orange-600 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-black transition"
                  >
                    Remove
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold truncate text-black">
                    {product.name}
                  </h3>
                  <p className="text-orange-600 font-bold text-xl mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      addToCart(product);
                      toast.success("Product added to cart!");
                    }}
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
                   mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
