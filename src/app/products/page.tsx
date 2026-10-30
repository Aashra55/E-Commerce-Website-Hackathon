"use client";

import Image from "next/image";
import { urlFor } from "../utils/sanity";
import GetProductData from "@/sanity/sanity.query";
import Link from "next/link";
import { typeOfData } from "../utils/types";
import { useEffect, useReducer, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import { useWishList } from "@/context/WishlistContext";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiShoppingBag, FiStar, FiFilter, FiRotateCcw, FiPackage } from "react-icons/fi";
import PriceRangeSlider from "../components/PriceRangeSlider";
import CategoryFilter from "../components/CategoryFilter";
import SizeFilter from "../components/SizeFiltering";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

// Reducer function and initial state
const initialState = {
  category: "All",
};

interface State {
  category: string;
}

interface Action {
  type: "update";
  payload: {
    name: keyof State;
    value: State[keyof State];
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "update":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<typeOfData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<typeOfData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchTerm, setSearchTerm } = useSearch();
  const [WishList, setWishList] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();
  const { addToWishList } = useWishList();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { data: session } = useSession();

  // Handle wishlist toggle and sync
  const handleWishList = (item: typeOfData) => {
    setWishList((prev) => ({
      ...prev,
      [item._id]: !prev[item._id],
    }));
    addToWishList(item);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await GetProductData();
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories (with schema defaults as baseline)
  const getCategory = (data: typeOfData[]) => {
    const categories = data
      .map((curElem: typeOfData) => curElem.category)
      .filter(Boolean);
    const defaults = ["hoodie", "tshirt", "jeans", "shirt", "short"];
    const combined = Array.from(new Set([...defaults, ...categories]));
    return ["All", ...combined];
  };

  const Categories = getCategory(products);

  // Extract unique sizes (with baseline standards)
  const getSizes = (data: typeOfData[]) => {
    const allSizes = data
      .map((product) => product.sizes || [])
      .flat()
      .filter(Boolean);
    const defaults = ["S", "M", "L", "XL", "XXL"];
    const combined = Array.from(new Set([...defaults, ...allSizes]));
    return ["All", ...combined];
  };

  const Sizes = getSizes(products);

  // Filter products when search, category, size or price changes
  useEffect(() => {
    const filtered = products.filter((product) => {
      const productName = product.name?.toLowerCase() || "";
      const productCat = product.category?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        search === "" ||
        productName.includes(search) ||
        productCat.includes(search);

      const matchesCategory =
        state.category === "All" ||
        productCat === state.category.toLowerCase();

      const matchesSize =
        selectedSize === "All" ||
        (Array.isArray(product.sizes) && product.sizes.includes(selectedSize));

      const matchesPrice =
        (typeof product.price === "number" ? product.price : 0) >= minPrice &&
        (typeof product.price === "number" ? product.price : 0) <= maxPrice;

      return matchesSearch && matchesCategory && matchesSize && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, state.category, selectedSize, minPrice, maxPrice, products]);

  // Reset all active filters
  const resetAllFilters = () => {
    dispatch({ type: "update", payload: { name: "category", value: "All" } });
    setSelectedSize("All");
    setMinPrice(0);
    setMaxPrice(500);
    setSearchTerm("");
  };

  const hasActiveFilters =
    state.category !== "All" ||
    selectedSize !== "All" ||
    minPrice > 0 ||
    maxPrice < 500 ||
    Boolean(searchTerm);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">
              <span>Exclusive Catalog</span>
              <span>•</span>
              <span>Premium Quality</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Collections
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Handpicked pieces blending contemporary aesthetics, everyday comfort, and exceptional craftsmanship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> styles
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-2xs"
            >
              <FiFilter className="w-3.5 h-3.5 text-orange-600" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-orange-600"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-72 shrink-0 space-y-6 sticky top-24">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <FiFilter className="w-4 h-4 text-orange-600" />
                <span>Filter By</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-semibold transition"
                >
                  <FiRotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            <CategoryFilter
              categories={Categories}
              selectedCategory={state.category}
              onCategoryChange={(category) => {
                dispatch({
                  type: "update",
                  payload: { name: "category", value: category },
                });
              }}
            />

            <SizeFilter
              sizes={Sizes}
              selectedSize={selectedSize}
              onSizeChange={(size) => setSelectedSize(size)}
            />

            <PriceRangeSlider
              min={0}
              max={500}
              currentMin={minPrice}
              currentMax={maxPrice}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
            />
          </aside>

          {/* Mobile Filter Modal / Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              />
              <div className="fixed inset-y-0 right-0 w-5/6 max-w-sm bg-white p-5 overflow-y-auto space-y-6 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <FiFilter className="w-4 h-4 text-orange-600" />
                    <span>Filter Products</span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-orange-50 text-orange-600 rounded-xl text-xs font-semibold"
                  >
                    <FiRotateCcw className="w-3.5 h-3.5" />
                    Reset All Filters
                  </button>
                )}

                <CategoryFilter
                  categories={Categories}
                  selectedCategory={state.category}
                  onCategoryChange={(category) => {
                    dispatch({
                      type: "update",
                      payload: { name: "category", value: category },
                    });
                  }}
                />

                <SizeFilter
                  sizes={Sizes}
                  selectedSize={selectedSize}
                  onSizeChange={(size) => setSelectedSize(size)}
                />

                <PriceRangeSlider
                  min={0}
                  max={500}
                  currentMin={minPrice}
                  currentMax={maxPrice}
                  onPriceChange={(min, max) => {
                    setMinPrice(min);
                    setMaxPrice(max);
                  }}
                />

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </div>
          )}

          {/* Products Grid Section */}
          <div className="flex-1 w-full">
            {isLoading ? (
              /* Modern Shimmer Skeleton Cards */
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs p-3 space-y-3"
                  >
                    <div className="w-full aspect-[3/4] rounded-xl shimmer"></div>
                    <div className="space-y-2 px-1">
                      <div className="h-4 w-3/4 rounded-md shimmer"></div>
                      <div className="h-3 w-1/2 rounded-md shimmer"></div>
                      <div className="h-6 w-1/3 rounded-md shimmer mt-3"></div>
                      <div className="h-9 w-full rounded-xl shimmer mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => {
                  const finalPrice = product.discountPercent
                    ? (
                        product.price -
                        (product.price * product.discountPercent) / 100
                      ).toFixed(2)
                    : product.price.toFixed(2);

                  const isWishlisted = WishList[product._id];

                  return (
                    <div
                      key={product._id}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Product Image Container */}
                      <div className="relative w-full aspect-[3/4] bg-slate-50 overflow-hidden">
                        {/* Badges on Top Left */}
                        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
                          {product.isNew && (
                            <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white rounded-full shadow-xs">
                              NEW
                            </span>
                          )}
                          {product.discountPercent > 0 && (
                            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full shadow-xs">
                              -{product.discountPercent}%
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button on Top Right */}
                        <button
                          onClick={() => {
                            if (session) {
                              handleWishList(product);
                              toast.success(
                                isWishlisted
                                  ? "Product removed from wishlist!"
                                  : "Product added to wishlist!"
                              );
                            } else {
                              toast.error("Please login to add product to wishlist");
                            }
                          }}
                          className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-xs active:scale-90 ${
                            isWishlisted
                              ? "bg-rose-500 text-white shadow-rose-500/30 scale-105"
                              : "bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500"
                          }`}
                          title="Add to Wishlist"
                          type="button"
                        >
                          {isWishlisted ? (
                            <GoHeartFill className="w-5 h-5 text-white" />
                          ) : (
                            <GoHeart className="w-5 h-5" />
                          )}
                        </button>

                        {/* Image Link */}
                        {product.image ? (
                          <Link href={`/products/${product._id}`} className="block w-full h-full">
                            <Image
                              src={urlFor(product.image).width(450).url()}
                              alt={product.name}
                              width={450}
                              height={600}
                              className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-500 ease-out"
                            />
                          </Link>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                            <FiPackage className="w-10 h-10 mb-2 opacity-40" />
                            <span className="text-xs">Image unavailable</span>
                          </div>
                        )}
                      </div>

                      {/* Product Content Body */}
                      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                        <div>
                          {/* Category Tag & Rating */}
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider truncate">
                              {product.category || "Apparel"}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                              <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>4.8</span>
                            </div>
                          </div>

                          {/* Product Title */}
                          <Link href={`/products/${product._id}`}>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition line-clamp-1 leading-snug">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Description */}
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {product.description || "Premium quality product"}
                          </p>

                          {/* Price Display */}
                          <div className="flex items-baseline gap-2 mt-2.5">
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              ${finalPrice}
                            </span>
                            {product.discountPercent > 0 && (
                              <span className="text-xs text-slate-400 line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-3.5 pt-2 border-t border-slate-100">
                          <button
                            disabled={!product.stock || product.stock <= 0}
                            onClick={() => {
                              if (session) {
                                addToCart(product);
                                toast.success("Product added to cart!");
                              } else {
                                toast.error("Please login to add product to cart");
                              }
                            }}
                            type="button"
                            className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs ${
                              !product.stock || product.stock <= 0
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-slate-900 hover:bg-orange-600 text-white shadow-slate-900/10 hover:shadow-orange-600/25"
                            }`}
                          >
                            <FiShoppingBag className="w-4 h-4" />
                            <span>
                              {!product.stock || product.stock <= 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Clean Empty State */
              <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                  <FiFilter className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">No products found</h3>
                <p className="text-sm text-slate-500 mb-6">
                  We couldn&rsquo;t find anything matching your exact filter criteria. Try clearing some filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-xs font-bold tracking-wide transition shadow-md shadow-orange-500/20"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
}
