"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import React from "react";
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
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4500, 4000, 5000, 7000],
        backgroundColor: "#E4599C",
      },
    ],
  };

  const trafficData = {
    labels: ["Home", "Shop", "About", "Contact"],
    datasets: [
      {
        label: "User Traffic",
        data: [1200, 1500, 800, 400],
        backgroundColor: ["#4CAF50", "#4CAF50", "#4CAF50", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Analytics Dashboard
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Sales Overview
        </h3>
        <Bar data={salesData} options={{ responsive: true }} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          User Traffic
        </h3>
        <Bar data={trafficData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

const UserProfile = () => {
  const { data: session } = useSession();
  const handleClick = async () => {
    if(session)(await signOut());
    await signIn("github");
  }

  if (!session) {
    return (
      <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
        <div className="w-full flex justify-center items-center h-[70vh]">
        <button
        onClick={() => handleClick()}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
      >
        <FaGithub className="w-5 h-5" />
        Sign up with GitHub
      </button>
        </div>
      </div>
    );
    }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md m-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h2>
        <div>
          <p className="text-gray-600 inline m-1">Name: </p>
          <p className="inline text-gray-600 m-1">{session.user?.name}</p>
        </div>
        <div>
          <p className="text-gray-600 inline m-1">Email: </p>
          <p className="inline text-gray-600 m-1">{session.user?.email}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Saved Addresses
        </h2>
        <p className="text-gray-600">No saved addresses available.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order History
        </h2>
        <p className="text-gray-600">No orders found.</p>
      </section>

<section className="w-full flex jusitfy-right mt-4">
<button
      onClick={() => handleClick()}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
    >
      <FiLogOut className="w-5 h-5" />
      Sign Out
    </button>
</section>

      <section className="mt-10">
        <AnalyticsDashboard />
      </section>
    </div>
  );
};

export default UserProfile;
