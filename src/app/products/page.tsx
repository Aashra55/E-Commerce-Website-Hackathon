"use client";

import Image from "next/image";
import { urlFor } from "../utils/sanity"; // Import the urlFor function
import GetProductData from "@/sanity/sanity.query";
import Link from "next/link";
import { typeOfData } from "../utils/types";
import { useEffect, useReducer, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import { useWishList } from "@/context/WishlistContext";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import PriceRangeSlider from "../components/PriceRangeSlider";
import CategoryFilter from "../components/CategoryFilter";
import SizeFilter from "../components/SizeFiltering";
import tag from "../images/new.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

// Reducer function and initial state
const initialState = {
  category: "All",
};

// Define types for state and actions
interface State {
  category: string;
}

interface Action {
  type: "update"; // Only one action type is defined
  payload: {
    name: keyof State; // The name must be a key from the State object
    value: State[keyof State]; // The value must match the type of the corresponding State key
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchTerm } = useSearch(); // Access the search term
  const [WishList, setWishList] = useState<Record<string, boolean>>({}); //to toggle wish heart
  const { addToCart } = useCart();
  const { addToWishList } = useWishList(); //to handle items in wish list
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const { data: session } = useSession();

  //function to handle toggle heart and to add items into wish list
  const handleWishList = (item: typeOfData) => {
    setWishList((prev) => ({
      ...prev,
      [item._id]: !prev[item._id],
    }));
    addToWishList(item);
  };

  useEffect(() => {
    // Fetch products data
    const fetchProducts = async () => {
      try {
        const data = await GetProductData();
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products whenever the search term changes
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Extract unique categories
  const getCategory = (data: typeOfData[]) => {
    let newValue = data.map((curElem: typeOfData) => curElem.category);
    newValue = ["All", ...new Set(newValue)];
    return newValue;
  };

  const Categories = getCategory(products);

  //Extract unique Size
  const getSizes = (data: typeOfData[]) => {
    let sizes = data.map((product) => product.sizes).flat();
    sizes = ["All", ...new Set(sizes)];
    return sizes;
  };

  const Sizes = getSizes(products);

  // Update filtered products whenever the price range changes
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, products]);

  //Handle Size Filtering Logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        searchTerm === "" || product.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        state.category === "All" || product.category === state.category;
      const matchesSize =
        selectedSize === "All" || product.sizes.includes(selectedSize);
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesSize && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, state.category, selectedSize, minPrice, maxPrice, products]);

  console.log("Product:", products);

  return (
    <div>
      <div className="w-[100vw] md:p-10 p-4 text-center text-4xl">
        EXPLORE FASHION
      </div>
      <div>
        {products.length === 0 ? (
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col gap-4 p-2">
            {/* Sidebar for Categories */}
            <div className="md:w-[30vw]">
              <CategoryFilter
                categories={Categories}
                selectedCategory={state.category}
                onCategoryChange={(category) => {
                  dispatch({
                    type: "update",
                    payload: { name: "category", value: category },
                  });

                  if (category === "All") {
                    setFilteredProducts(products);
                  } else {
                    const filtered = products.filter(
                      (product) => product.category === category
                    );
                    setFilteredProducts(filtered);
                  }
                }}
              />
              <div className="mb-8 mt-10">
                <SizeFilter
                  sizes={Sizes}
                  selectedSize={selectedSize}
                  onSizeChange={(size) => setSelectedSize(size)}
                />
              </div>
              <div className="mb-8 mt-10">
                <h2 className="text-xl font-bold w-full text-center leading-[50px]">
                  Filter by Price
                </h2>
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
              </div>
            </div>

            {/* Product Grid */}
            <div>
              <div className="font-sans p-4 mx-auto lg:max-w-6xl md:max-w-3xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <div
                        key={index}
                        className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="w-full">
                          {product.image ? (
                            <Link href={`/products/${product._id}`}>
                              <div>
                                <div>
                                  {product.isNew ? (
                                    <Image
                                      src={tag}
                                      alt="tag"
                                      width={40}
                                      height={40}
                                      quality={75}
                                      className="absolute lg:ml-[170px] md:ml-[122px] ml-[100px] m-2 z-[100]"
                                    />
                                  ) : null}
                                </div>
                                <Image
                                  src={urlFor(product.image).width(400).url()}
                                  alt={product.name}
                                  width={400}
                                  height={300}
                                  className="w-full object-cover object-top aspect-[230/307] hover:scale-110 transition duration-3"
                                />
                              </div>
                            </Link>
                          ) : (
                            <p className="w-[100%] text-center p-2 py-48">
                              No Image Available
                            </p>
                          )}
                        </div>

                        <div className="p-2 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h5 className="mt-2 text-sm sm:text-base font-bold text-gray-800 truncate">
                              {product.name}
                            </h5>
                            <p className="mt-1 text-gray-500 truncate">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap justify-between gap-2 mt-2">
                              <div className="flex gap-2">
                                <h6 className="text-sm sm:text-base font-bold text-gray-800">
                                  {(
                                    product.price -
                                    (product.price * product.discountPercent) /
                                      100
                                  ).toFixed(2)}
                                </h6>
                                <h6 className="text-sm sm:text-base text-gray-500">
                                  {product.discountPercent ? (
                                    <span className="line-through">
                                      ${product.price.toFixed(2)}
                                    </span>
                                  ) : null}
                                </h6>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <svg
                                  className="w-[14px] h-[14px] fill-orange-600"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                  className="w-[14px] h-[14px] fill-orange-600"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                  className="w-[14px] h-[14px] fill-orange-600"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                  className="w-[14px] h-[14px] fill-[#CED5D8]"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                                <svg
                                  className="w-[14px] h-[14px] fill-[#CED5D8]"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            <div
                              className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
                              title="Wishlist"
                            >
                              {WishList[product._id] ? (
                                <GoHeartFill
                                  onClick={() => {
                                    handleWishList(product);
                                    toast.success(
                                      "Product removed from wishlist!"
                                    );
                                  }}
                                  className="text-pink-600 fillHeart"
                                />
                              ) : (
                                <GoHeart
                                  onClick={() => {
                                    if (session) {
                                      handleWishList(product);
                                      toast.success(
                                        "Product added to wishlist!"
                                      );
                                    } else {
                                      toast.error(
                                        "Please login to add product to wishlist"
                                      );
                                    }
                                  }}
                                  className="text-pink-600 emptyHeart"
                                />
                              )}{" "}
                            </div>
                            <button
                              disabled={!product.stock || product.stock <= 0}
                              onClick={() => {
                                if (session) {
                                  addToCart(product);
                                  toast.success("Product added to cart!");
                                } else {
                                  toast.error(
                                    "Please login to add product to cart"
                                  );
                                }
                              }}
                              type="button"
                              className={`text-sm px-2 min-h-[36px] w-full transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
                              text-white tracking-wide ml-auto outline-none border-none rounded ${product.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
                            >
                              {product.stock === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full text-center w-[70vw] py-10">
                      No product Found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
