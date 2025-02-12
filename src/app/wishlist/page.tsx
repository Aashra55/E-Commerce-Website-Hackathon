"use client";
import { useWishList } from "@/context/WishlistContext";
import { urlFor } from "../utils/sanity";
import { useCart } from "@/context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { GoHeart } from "react-icons/go";

export default function WishlistPage() {
  const { wishList, removeFromWishList } = useWishList();
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className=" py-4 md:py-10 text-center">
      <GoHeart className="text-4xl inline-block mt-2" />
        <p className=" text-xl font-extrabold  md:text-3xl">My Wishlist</p>
      </header>

      {/* Wishlist Content */}
      <main className="max-w-7xl mx-auto py-5 px-4 flex flex-col">
        {wishList.length === 0 ? (
          <div className="text-center md:text-2xl font-medium text-gray-500">
            Your wishlist is empty!
          </div>
        ) : (
          <div className="grid grid-cols-1 w-full h-auto gap-[12px]">
            {wishList.map((product) => (
              <div
                key={product._id}
                className=" bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex w-full md:gap-[40px] h-[140px]"
              >
                {/* Product Image */}
                <div className="relative p-2 w-[150px]">
                  <Image
                    width={400}
                    height={400}
                    src={urlFor(product.image).width(400).url()}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className=" text-center flex items-center  justify-center md:gap-[40px]  md:flex-row flex-col">
                  <h3 className="md:text-lg font-semibold text-wrap text-black md:mt-4 md:w-[200px] w-[150px]">
                    {product.name}
                  </h3>
                  <p className="text-orange-600 font-bold text-xl mt-2 md:mr-[200px] md:mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex h-[150px] justify-center items-center md:gap-[40px] md:flex-row flex-col gap-[10px] md:p-0 p-2">
                <button
                    disabled={!product.stock || product.stock <= 0}
                    onClick={() => {
                      addToCart(product);
                      toast.success("Product added to cart!");
                    }}
                    className={`transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-[100px] text-[14px] md:text-[16px]
                   md:mt-4 bg-black text-white py-2 md:px-4 px-2 rounded-md transition ${product.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"} md:w-[150px] md:ml-[50px]`}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => removeFromWishList(product._id)}
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-[100px] text-[14px] md:text-[16px]
                      text-white  rounded-md shadow-md transition py-2 md:px-4 px-2 md:mt-4 bg-red-500 hover:bg-red-600 md:w-[150px]"
                  >
                    Remove
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
