'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsDashboard: React.FC = () => {
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [3000, 4500, 4000, 5000, 7000],
        backgroundColor: '#E4599C',
      },
    ],
  };

  const trafficData = {
    labels: ['Home', 'Shop', 'About', 'Contact'],
    datasets: [
      {
        label: 'User Traffic',
        data: [1200, 1500, 800, 400],
        backgroundColor: ['#4CAF50', '#4CAF50', '#4CAF50', '#4CAF50'],
      },
    ],
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h3>
        <Bar data={salesData} options={{ responsive: true }} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">User Traffic</h3>
        <Bar data={trafficData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

const UserProfile  = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md m-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
        <p className="text-gray-600">Name: </p>
        <p className="text-gray-600">Email: </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Addresses</h2>
          <p className="text-gray-600">No saved addresses available.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order History</h2>
          <p className="text-gray-600">No orders found.</p>
      </section>

      <section className="mt-10">
        <AnalyticsDashboard />
      </section>
    </div>
  );
};

export default UserProfile;
