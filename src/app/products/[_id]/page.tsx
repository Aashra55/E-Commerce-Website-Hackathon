"use client";

import GetProductData from "@/sanity/sanity.query";
import Image from "next/image";
import { urlFor } from "../../utils/sanity";
import { useEffect, useState } from "react";
import { typeOfData } from "@/app/utils/types";
import { useCart } from "@/context/CartContext";
import { useWishList } from "@/context/WishlistContext";
import ReviewSection from "@/app/components/ReviewSection";
import ShareButtons from "@/app/components/ShareButton";
import Link from "next/link";
import {
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiCheck,
} from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function ProductDetails({
  params,
}: {
  params: { _id: string };
}) {
  const [data, setData] = useState<typeOfData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "shipping" | "care">("description");
  const { addToCart } = useCart();
  const { wishList, addToWishList } = useWishList();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const products = await GetProductData();
        setData(products || []);
      } catch (err) {
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchedProducts();
  }, []);

  const details = data.find((e) => e._id === params._id);

  // Default selection when details load
  useEffect(() => {
    if (details) {
      if (details.sizes && details.sizes.length > 0) {
        setSelectedSize(details.sizes[0]);
      }
      if (details.colors && details.colors.length > 0) {
        setSelectedColor(details.colors[0]);
      }
    }
  }, [details]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[3/4] rounded-3xl shimmer"></div>
          <div className="space-y-4 pt-4">
            <div className="h-6 w-1/4 rounded-md shimmer"></div>
            <div className="h-10 w-3/4 rounded-md shimmer"></div>
            <div className="h-6 w-1/3 rounded-md shimmer"></div>
            <div className="h-24 w-full rounded-2xl shimmer"></div>
            <div className="h-12 w-full rounded-2xl shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">The requested product could not be found or may have been removed.</p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-sm transition shadow-md"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const isWishlisted = wishList.some((item) => item._id === details._id);

  const discountedPrice = (
    details.price -
    (details.price * (details.discountPercent || 0)) / 100
  ).toFixed(2);

  const savingsAmount = (
    (details.price * (details.discountPercent || 0)) / 100
  ).toFixed(2);

  const handleAddToCartMultiple = () => {
    if (!session) {
      toast.error("Please login to add product to cart");
      return;
    }
    // Add based on selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(details);
    }
    toast.success(
      quantity > 1
        ? `${quantity} items added to your cart!`
        : "Product added to cart!"
    );
  };

  const handleToggleWishlist = () => {
    if (!session) {
      toast.error("Please login to add product to wishlist");
      return;
    }
    addToWishList(details);
    toast.success(
      isWishlisted
        ? "Product removed from wishlist!"
        : "Product added to wishlist!"
    );
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <FiChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/" className="hover:text-orange-600 transition">
            Products
          </Link>
          {details.category && (
            <>
              <FiChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="capitalize text-slate-600">{details.category}</span>
            </>
          )}
          <FiChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">{details.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Gallery Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md group">
              {/* Badges on Top Left */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {details.isNew && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white rounded-full shadow-sm">
                    NEW ARRIVAL
                  </span>
                )}
                {details.discountPercent > 0 && (
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full shadow-sm">
                    SAVE {details.discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button on Top Right */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-md active:scale-90 ${
                  isWishlisted
                    ? "bg-rose-500 text-white shadow-rose-500/30 scale-105"
                    : "bg-white/85 hover:bg-white text-slate-700 hover:text-rose-500"
                }`}
                title="Wishlist"
              >
                {isWishlisted ? (
                  <GoHeartFill className="w-6 h-6 text-white" />
                ) : (
                  <GoHeart className="w-6 h-6" />
                )}
              </button>

              {details.image ? (
                <Image
                  src={urlFor(details.image).width(900).url()}
                  width={900}
                  height={1100}
                  quality={90}
                  priority
                  alt={details.name}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out cursor-zoom-in"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnail Preview strip */}
            {details.image && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`aspect-[3/4] rounded-2xl overflow-hidden border-2 cursor-pointer transition ${
                      idx === 0
                        ? "border-orange-500 shadow-sm"
                        : "border-slate-200/80 hover:border-slate-300 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={urlFor(details.image).width(250).url()}
                      width={250}
                      height={320}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Actions & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    {details.category || "Apparel"}
                  </span>
                  
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      !details.stock || details.stock <= 0
                        ? "bg-slate-100 text-slate-500"
                        : details.stock < 5
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {!details.stock || details.stock <= 0
                      ? "Out of Stock"
                      : details.stock < 5
                      ? `Only ${details.stock} left in stock`
                      : "In Stock & Ready to Ship"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {details.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex text-amber-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">4.9</span>
                  <span className="text-xs text-slate-400">• 87 Customer Reviews</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    ${discountedPrice}
                  </span>
                  {details.discountPercent > 0 && (
                    <>
                      <span className="text-base text-slate-400 line-through">
                        ${details.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        Save ${savingsAmount}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> All import duties and taxes included
                </p>
              </div>

              {/* Size Selector */}
              {details.sizes && details.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Select Size:{" "}
                      <span className="text-orange-600 font-extrabold">{selectedSize}</span>
                    </label>
                    <span className="text-xs text-slate-400 underline cursor-pointer hover:text-slate-600">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {details.sizes.map((size: string, idx: number) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[44px] h-[42px] px-3.5 rounded-xl text-xs font-bold uppercase transition-all duration-200 flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-900 text-white shadow-md ring-2 ring-orange-500 ring-offset-2 scale-102"
                              : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {details.colors && details.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Available Colors:{" "}
                    <span className="text-slate-900 font-semibold capitalize">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {details.colors.map((color: string) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`w-9 h-9 rounded-full transition-all duration-150 flex items-center justify-center ${
                            isSelected
                              ? "ring-2 ring-orange-500 ring-offset-2 scale-110 shadow-sm"
                              : "border border-slate-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        >
                          {isSelected && (
                            <FiCheck className="w-4 h-4 text-white drop-shadow-md" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition"
                    >
                      <FiMinus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={!details.stock || details.stock <= 0}
                    onClick={handleAddToCartMultiple}
                    type="button"
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-md ${
                      !details.stock || details.stock <= 0
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/25 hover:shadow-orange-500/40"
                    }`}
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    <span>
                      {!details.stock || details.stock <= 0
                        ? "Out of Stock"
                        : `Add to Cart • $${(Number(discountedPrice) * quantity).toFixed(2)}`}
                    </span>
                  </button>
                </div>
              </div>

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <FiTruck className="w-4 h-4 mx-auto text-orange-600 mb-1" />
                  <p className="text-[11px] font-bold text-slate-800">Free Express</p>
                  <p className="text-[10px] text-slate-400">Orders $75+</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <FiRefreshCw className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <p className="text-[11px] font-bold text-slate-800">30-Day Return</p>
                  <p className="text-[10px] text-slate-400">Easy exchange</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <FiShield className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                  <p className="text-[11px] font-bold text-slate-800">Authentic</p>
                  <p className="text-[10px] text-slate-400">100% Verified</p>
                </div>
              </div>

              {/* Share */}
              <div className="pt-2">
                <ShareButtons
                  url={typeof window !== "undefined" ? window.location.href : ""}
                  message={`Check out this ${details.name} on our store!`}
                />
              </div>
            </div>

            {/* Details & Specs Tabs */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
              <div className="flex border-b border-slate-100 text-xs sm:text-sm font-bold gap-6 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className={`pb-2 transition relative ${
                    activeTab === "description"
                      ? "text-orange-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Description
                  {activeTab === "description" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2 transition relative ${
                    activeTab === "shipping"
                      ? "text-orange-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Shipping & Returns
                  {activeTab === "shipping" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("care")}
                  className={`pb-2 transition relative ${
                    activeTab === "care"
                      ? "text-orange-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Care & Details
                  {activeTab === "care" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              </div>

              <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeTab === "description" && (
                  <p>{details.description || "Detailed description not provided for this item."}</p>
                )}
                {activeTab === "shipping" && (
                  <div className="space-y-2">
                    <p>• Standard Delivery: 3-5 business days across all states.</p>
                    <p>• Express Worldwide: 1-2 business days via FedEx / DHL Express.</p>
                    <p>• Hassle-free 30-day return policy with prepaid shipping labels.</p>
                  </div>
                )}
                {activeTab === "care" && (
                  <div className="space-y-2">
                    <p>• Machine wash cold inside out with similar colors.</p>
                    <p>• Do not bleach or tumble dry on high heat.</p>
                    <p>• Iron on low reverse side if needed.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ReviewSection />
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
}
