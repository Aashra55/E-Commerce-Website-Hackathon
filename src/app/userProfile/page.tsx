"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { GetOrderData } from "@/sanity/sanity.query";
import { Order } from "../utils/types";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard: React.FC = () => {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [3200, 4500, 4100, 5600, 7200, 8400],
        backgroundColor: "#f97316",
        borderRadius: 8,
      },
    ],
  };

  const trafficData = {
    labels: ["Home", "Shop", "About", "Blog", "Contact"],
    datasets: [
      {
        label: "Store Visits",
        data: [2400, 3100, 1200, 1800, 800],
        backgroundColor: "#0ea5e9",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-slate-900">
          Store Analytics Dashboard
        </h3>
        <p className="text-xs text-slate-500">
          Real-time metrics and order traffic overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Monthly Sales Volume ($)
          </h4>
          <Bar data={salesData} options={{ responsive: true }} />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Category Page Traffic
          </h4>
          <Bar data={trafficData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { data: session } = useSession();

  const handleAuthAction = async () => {
    if (session) {
      await signOut();
    } else {
      await signIn("github");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const data = await GetOrderData();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []); // Fixed infinite render loop with empty dependency array!

  if (!session) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#fafbfc]">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm text-center max-w-md w-full space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto">
            <FiUser className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Welcome to ModernStore
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Sign in with your GitHub account to access your wishlist, saved orders, and personalized discounts.
            </p>
          </div>

          <button
            onClick={() => handleAuthAction()}
            className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md transition active:scale-95 cursor-pointer"
          >
            <FaGithub className="w-5 h-5" />
            <span>Sign In with GitHub</span>
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "shipped":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {session.user?.name || "Customer"}
                </h1>
                <span className="text-[11px] font-bold bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full">
                  Verified Member
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {session.user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleAuthAction()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs sm:text-sm font-semibold transition"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Order History
              </h2>
              <p className="text-xs text-slate-500">
                Track your recent purchases and delivery progress
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {loadingOrders ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-32 rounded-2xl shimmer"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <FiPackage className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-700">No orders placed yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your past completed orders will be archived and shown here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl border border-slate-200/80 p-5 hover:border-slate-300 transition bg-slate-50/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">
                        Order #{order._id?.slice(-6) || "REC-01"}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "Recently placed"}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status || "Processing"}
                    </span>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500">Ordered Items:</p>
                      <div className="flex flex-wrap gap-2">
                        {order.products?.map((prod, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800"
                          >
                            {prod?.name || "Product Item"}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Total Amount</span>
                      <span className="text-lg font-black text-slate-900">
                        ${order.totalPrice?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default UserProfile;
