"use client";
import { useWishList } from "@/context/WishlistContext";
import { urlFor } from "../utils/sanity";
import { useCart } from "@/context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";

export default function WishlistPage() {
  const { wishList, removeFromWishList } = useWishList();
  const { addToCart } = useCart();

  return (
    <div className="bg-[#fafbfc] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <GoHeartFill className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {wishList.length > 0
              ? `You have saved ${wishList.length} ${
                  wishList.length === 1 ? "item" : "items"
                } to your wishlist.`
              : "Save your favorite items here to purchase later."}
          </p>
        </div>

        {/* Content */}
        {wishList.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto shadow-xs my-6">
            <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <GoHeart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Found something you like? Click the heart icon on any product to save it here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-orange-500/20 transition"
            >
              <span>Explore Products</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishList.map((product) => {
              const isOutOfStock = !product.stock || product.stock <= 0;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image & Quick Action */}
                  <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        removeFromWishList(product._id);
                        toast.warning("Item removed from wishlist");
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-xs flex items-center justify-center transition"
                      title="Remove from Wishlist"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>

                    {product.image ? (
                      <Link href={`/products/${product._id}`} className="block w-full h-full">
                        <Image
                          src={urlFor(product.image).width(400).url()}
                          alt={product.name}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                        {product.category || "Apparel"}
                      </span>
                      <Link href={`/products/${product._id}`}>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-base font-extrabold text-slate-900 mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => {
                          addToCart(product);
                          toast.success("Added to your shopping cart!");
                        }}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs ${
                          isOutOfStock
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-slate-900 hover:bg-orange-600 text-white"
                        }`}
                      >
                        <FiShoppingBag className="w-3.5 h-3.5" />
                        <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
}
