"use client";
import React, { useState } from "react";
import { BiSolidGift } from "react-icons/bi";
import { FiCheckCircle, FiClock } from "react-icons/fi";

const GiftCardComponent = () => {
  const [giftCardBalance, setGiftCardBalance] = useState<number>(0);
  const [giftCardCode, setGiftCardCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(50);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"purchase" | "redeem">("purchase");

  // Purchase gift card
  const purchaseGiftCard = () => {
    if (amount > 0) {
      setGiftCardBalance(giftCardBalance + amount);
      setHistory((prev) => [
        `Purchased: $${amount} on ${new Date().toLocaleDateString()}`,
        ...prev,
      ]);
      alert(`Gift card purchased successfully for $${amount}!`);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  // Redeem gift card
  const redeemGiftCard = () => {
    if (giftCardCode.trim().toUpperCase() === "VALID_CODE" || giftCardCode.trim().toUpperCase() === "GIFT50") {
      setGiftCardBalance(giftCardBalance + 50);
      setHistory((prev) => [
        `Redeemed: $50 voucher code [${giftCardCode.trim().toUpperCase()}]`,
        ...prev,
      ]);
      alert("Gift card redeemed for $50 credit!");
      setGiftCardCode("");
    } else {
      alert("Invalid code! Try entering code: 'VALID_CODE' or 'GIFT50'");
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-3">
            <BiSolidGift className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gift Cards & Vouchers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            The perfect gift for friends and family. Purchase digital cards or redeem store vouchers instantly.
          </p>
        </div>

        {/* Visual Gift Card Preview */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative aspect-[1.58/1] rounded-3xl p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-orange-950 text-white shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-800">
            {/* Background luxury gradient circles */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-black tracking-widest text-orange-400">
                MODERN<span className="text-white">STORE</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                <BiSolidGift className="w-3.5 h-3.5" />
                <span>DIGITAL CARD</span>
              </div>
            </div>

            {/* Chip Graphic */}
            <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border border-amber-500/40 relative z-10 shadow-xs" />

            {/* Bottom Row */}
            <div className="flex items-end justify-between relative z-10">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Current Balance
                </p>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  ${giftCardBalance.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono">•••• 8842</p>
                <p className="text-[10px] text-orange-400 font-bold uppercase">Never Expires</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
          
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              onClick={() => setActiveTab("purchase")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                activeTab === "purchase"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Purchase Card
            </button>
            <button
              onClick={() => setActiveTab("redeem")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                activeTab === "redeem"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Redeem Voucher
            </button>
          </div>

          {activeTab === "purchase" ? (
            /* Purchase Tab */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Choose Gift Amount ($)
                </label>
                
                {/* Preset Chips */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[25, 50, 100, 200].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-2 text-xs font-bold rounded-xl transition border ${
                        amount === val
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  min={5}
                  max={1000}
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Or enter custom amount"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                />
              </div>

              <button
                onClick={purchaseGiftCard}
                className="w-full py-3.5 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition active:scale-98"
              >
                Purchase Gift Card (${amount || 0})
              </button>
            </div>
          ) : (
            /* Redeem Tab */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter Gift Voucher Code
                </label>
                <input
                  type="text"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  placeholder="e.g. VALID_CODE or GIFT50"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm uppercase font-mono tracking-wider text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Tip: Use code &lsquo;VALID_CODE&rsquo; to redeem $50 demonstration credit.
                </p>
              </div>

              <button
                onClick={redeemGiftCard}
                className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-98"
              >
                Apply Voucher Code
              </button>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-3">
                <FiClock className="w-3.5 h-3.5 text-slate-400" />
                <span>Activity History</span>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCardComponent;
