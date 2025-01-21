// SubscriptionManagement.jsx
import React from "react";

const SubscriptionManagement = () => {
  return (
    <div className="subscription-management container mx-auto p-6">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-4">Manage Your Subscriptions</h1>

      {/* Subscription List */}
      <div className="subscriptions-list grid gap-4">
        <div className="subscription-item flex md:flex-row flex-col md:gap-[0px] gap-2 items-center justify-between p-4 bg-white shadow-md rounded-md">
          <div>
            <h2 className="text-lg font-semibold">Product/Service Name</h2>
            <p className="text-sm text-gray-600">Next Renewal Date: January 25, 2025</p>
          </div>
          <button className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
          bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Renew Now</button>
        </div>
        
        {/* Additional subscriptions can be added here */}
      </div>

      {/* Add Subscription Section */}
      <div className="add-subscription mt-6">
        <h2 className="text-lg font-semibold mb-2">Add a New Subscription</h2>
        <form className="flex flex-col gap-4 justify-center">
          <input
            type="text"
            placeholder="Product/Service Name"
            className="border p-2 rounded focus:outline-orange-500"
          />
          <input
            type="date"
            className="border p-2 rounded focus:outline-orange-500"
          />
          <button
            type="submit"
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
            bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition md:w-[200px]"
          >
            Add Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionManagement;