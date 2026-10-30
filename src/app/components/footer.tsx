"use client";
import Link from "next/link";
import { FiMail, FiArrowRight } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800/80">
      
      {/* Newsletter Strip */}
      <div className="border-b border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-1">
              Join Our Community
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get 15% Off Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Be the first to know about new arrivals, private sales, and seasonal lookbooks.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing! Check your email for your 15% discount code.");
            }}
            className="w-full max-w-md flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-full text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Subscribe</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-white tracking-tight">
                MODERN<span className="text-orange-500">STORE</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your destination for timeless everyday fashion, contemporary footwear, and lifestyle essentials crafted with uncompromising quality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-orange-600 text-slate-300 hover:text-white transition flex items-center justify-center"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-orange-600 text-slate-300 hover:text-white transition flex items-center justify-center"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-orange-600 text-slate-300 hover:text-white transition flex items-center justify-center"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-orange-600 text-slate-300 hover:text-white transition flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition">
                  Shop All Collections
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-400 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/GiftCards" className="hover:text-orange-400 transition">
                  Gift Cards & Vouchers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition">
                  Fashion Journal & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/faqs" className="hover:text-orange-400 transition">
                  FAQs & Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-400 transition">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition">
                  Our Story & Mission
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-orange-400 transition">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ModernStore Inc. All rights reserved.</p>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-[10px]">
              STRIPE
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-[10px]">
              VISA
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-[10px]">
              MASTERCARD
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-[10px]">
              APPLE PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
