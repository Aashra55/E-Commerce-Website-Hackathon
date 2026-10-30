"use client";
import React, { useState } from "react";
import { FiRefreshCw, FiPlus, FiCalendar } from "react-icons/fi";

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Seasonal Wardrobe Box (Quarterly)",
      renewalDate: "April 15, 2026",
      status: "Active",
      price: "$120.00 / quarter",
    },
    {
      id: 2,
      name: "Luxury Silk & Cotton Care Kit",
      renewalDate: "May 01, 2026",
      status: "Active",
      price: "$29.00 / month",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDate) return;

    setSubscriptions([
      ...subscriptions,
      {
        id: Date.now(),
        name: newName,
        renewalDate: newDate,
        status: "Active",
        price: "$45.00 / month",
      },
    ]);
    setNewName("");
    setNewDate("");
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-3">
            <FiRefreshCw className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Subscription Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Manage your recurring deliveries, seasonal boxes, and auto-renewals with flexibility.
          </p>
        </div>

        {/* Active Subscriptions List */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
            Active Subscriptions ({subscriptions.length})
          </h2>

          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {sub.name}
                    </h3>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                    Next Renewal: {sub.renewalDate} • {sub.price}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Renewed subscription for ${sub.name}!`)}
                  className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition shadow-xs self-start sm:self-auto"
                >
                  Renew Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Subscription Form */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FiPlus className="w-4 h-4 text-orange-600" />
            <h2 className="text-base font-bold text-slate-900">Add a New Subscription</h2>
          </div>

          <form onSubmit={handleAddSubscription} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / Service Plan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monthly Cotton T-Shirt Drop"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting Renewal Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition shadow-md"
            >
              Add Subscription Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
