"use client";
import Link from "next/link";
import { FiCheckCircle, FiArrowRight, FiUser } from "react-icons/fi";

export default function ThankYou() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#fafbfc]">
      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm text-center max-w-lg w-full space-y-6">
        
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
          <FiCheckCircle className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank You for Shopping!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your order has been placed successfully and is being prepared for dispatch. A receipt has been sent to your email.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/userProfile"
            className="flex-1 py-3 px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md"
          >
            <FiUser className="w-4 h-4" />
            <span>View Order Status</span>
          </Link>

          <Link
            href="/"
            className="flex-1 py-3 px-5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-orange-500/20"
          >
            <span>Continue Shopping</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
