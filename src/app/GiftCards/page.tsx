'use client'
import React, { useState } from "react";

const GiftCardComponent = () => {
  const [giftCardBalance, setGiftCardBalance] = useState<number>(0);
  const [giftCardCode, setGiftCardCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]); // To track usage history

  // Function to purchase gift card
  const purchaseGiftCard = () => {
    if (amount > 0) {
      setGiftCardBalance(giftCardBalance + amount);
      setHistory((prev) => [...prev, `Purchased: $${amount}`]);
      alert(`Gift card purchased for $${amount}`);
    }
  };

  // Function to redeem gift card
  const redeemGiftCard = () => {
    if (giftCardCode === "VALID_CODE" && giftCardBalance > 0) {
      setGiftCardBalance(giftCardBalance - 50); // Assuming 50 is redeemed
      setHistory((prev) => [...prev, `Redeemed: $50 using ${giftCardCode}`]);
      alert(`Gift card redeemed for $50`);
    } else {
      alert("Invalid code or insufficient balance!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg m-1 md:my-2">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Gift Card & Voucher</h2>

      {/* Gift Card Purchase */}
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-800">Purchase Gift Card</h3>
        <div className="mt-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter Amount"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none"
          />
          <button
            onClick={purchaseGiftCard}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Purchase Gift Card
          </button>
        </div>
      </div>

      {/* Gift Card Redemption */}
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-800">Redeem Gift Card</h3>
        <div className="mt-2">
          <input
            type="text"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value)}
            placeholder="Enter Gift Card Code"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none"
          />
          <button
            onClick={redeemGiftCard}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Redeem Gift Card
          </button>
        </div>
      </div>

      {/* Current Balance */}
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-800">Current Balance</h3>
        <div className="mt-2">
          <p className="text-xl font-semibold">${giftCardBalance}</p>
        </div>
      </div>

      {/* Usage History */}
      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-800">Usage History</h3>
        <ul className="list-disc pl-6">
          {history.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GiftCardComponent;
