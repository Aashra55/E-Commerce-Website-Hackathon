"use client";
import { useSearch } from "@/context/SearchContext";
import logo from "../images/logo.jpeg";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishList } from "@/context/WishlistContext";
import LanguageSelector from "./LanguageSelector";
import { BiSolidGift } from "react-icons/bi";
import { GoHeart } from "react-icons/go";
import { FiShoppingBag, FiUser, FiSearch, FiX, FiMenu } from "react-icons/fi";

export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const { wishList } = useWishList();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
          <p className="w-full sm:w-auto text-center font-medium tracking-wide">
            ✨ <span className="text-orange-400 font-bold">LIMITED TIME:</span> Free Express Worldwide Shipping on Orders Over $75 | Code:{" "}
            <span className="underline decoration-orange-400 font-semibold">FREESHIP</span>
          </p>
          <div className="hidden md:flex items-center space-x-6 text-slate-300 text-xs">
            <Link href="/faqs" className="hover:text-white transition">Help & FAQs</Link>
            <span className="text-slate-600">|</span>
            <Link href="/contact" className="hover:text-white transition">24/7 Support</Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5"
            : "bg-white border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleMenu}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition"
                aria-label="Open Navigation Menu"
              >
                <FiMenu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative overflow-hidden rounded-lg border border-slate-200/80 shadow-xs group-hover:border-orange-500/50 transition">
                  <Image
                    src={logo}
                    alt="Store Logo"
                    className="w-28 sm:w-32 h-auto object-contain transition duration-200 group-hover:scale-102"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Center: Search Input Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiSearch className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search over 1,000+ fashion styles & collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Actions (Language, Gift, Wishlist, Cart, Profile) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>

              {/* Gift Cards */}
              <Link
                href="/GiftCards"
                className="p-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition relative"
                title="Gift Cards & Vouchers"
              >
                <BiSolidGift className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition relative"
                title="Wishlist"
              >
                <GoHeart className="w-5 h-5" />
                {wishList.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-xs">
                    {wishList.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition relative"
                title="Shopping Cart"
              >
                <FiShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold shadow-xs">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* User Profile */}
              <Link
                href="/userProfile"
                className="p-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition"
                title="Account Profile"
              >
                <FiUser className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar (Visible on mobile/tablet) */}
          <div className="lg:hidden mt-3 pt-2 border-t border-slate-100">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:block border-t border-slate-100 mt-2.5 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center space-x-10 text-sm font-medium">
              <Link
                href="/"
                className="text-slate-700 hover:text-orange-600 py-1 transition relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              {/* Store Dropdown */}
              <div className="relative group py-1">
                <button className="flex items-center gap-1 text-slate-700 hover:text-orange-600 transition">
                  Store
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-sm font-medium transition"
                    >
                      <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 text-base">👗</span>
                      <div>
                        <div className="font-semibold text-slate-900">Fashion Store</div>
                        <div className="text-xs text-slate-400">Trendy clothing & dresses</div>
                      </div>
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-sm font-medium transition"
                    >
                      <span className="p-1.5 rounded-lg bg-blue-100 text-blue-600 text-base">👟</span>
                      <div>
                        <div className="font-semibold text-slate-900">Shoes & Footwear</div>
                        <div className="text-xs text-slate-400">Sneakers, boots & heels</div>
                      </div>
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-sm font-medium transition"
                    >
                      <span className="p-1.5 rounded-lg bg-purple-100 text-purple-600 text-base">🛋️</span>
                      <div>
                        <div className="font-semibold text-slate-900">Furniture & Living</div>
                        <div className="text-xs text-slate-400">Modern interior aesthetics</div>
                      </div>
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-sm font-medium transition"
                    >
                      <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 text-base">📱</span>
                      <div>
                        <div className="font-semibold text-slate-900">Electronics & Tech</div>
                        <div className="text-xs text-slate-400">Smart devices & gadgets</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                className="text-slate-700 hover:text-orange-600 py-1 transition relative group"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className="text-slate-700 hover:text-orange-600 py-1 transition relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-slate-700 hover:text-orange-600 py-1 transition relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={handleToggleMenu}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image src={logo} alt="Logo" className="w-28 h-auto" />
              </Link>
              <button
                onClick={handleToggleMenu}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Home
              </Link>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Categories
              </div>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                <span>👗</span> Fashion Store
              </Link>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                <span>👟</span> Shoes & Sneakers
              </Link>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                <span>🛋️</span> Furniture
              </Link>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                <span>📱</span> Electronics
              </Link>

              <div className="my-2 border-t border-slate-100"></div>

              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-800 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-800 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-800 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Contact Us
              </Link>
              <Link
                href="/GiftCards"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-800 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
              >
                <BiSolidGift className="text-orange-500 w-5 h-5" /> Gift Cards
              </Link>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Language:</span>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
