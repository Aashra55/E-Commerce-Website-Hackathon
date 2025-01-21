"use client";

import React from "react";
import Image from "next/image";
import about from "../images/about.jpg";
import one from "../images/one.jpeg";
import two from "../images/two.jpeg";
import three from "../images/three.jpeg";

export default function AboutPage() {
  return (
    <div className="bg-gray-50">

      {/* Header */}
      <header className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="md:text-5xl text-xl font-extrabold">About Us</h1>
          <p className="md:text-lg mt-4">Your trusted e-commerce partner for premium shopping experiences</p>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We believe in delivering an unparalleled shopping experience to our customers, providing the best in class
              products, convenience, and value. Our mission is to provide you with a seamless shopping experience by
              curating top-quality products at competitive prices, all in one place.
            </p>
            <p className="text-lg text-gray-600">
              Our goal is to make shopping effortless and enjoyable. From fashion to technology, we strive to meet all
              your needs under one roof with fast delivery, top-notch customer service, and a hassle-free returns policy.
            </p>
          </div>
          <div>
            <Image
              src={about}
              alt="Our Mission"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Who We Are
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center hover:shadow-xl p-2 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">Our Story</h3>
              <p className="text-lg text-gray-600 mt-4">
                Founded in 2006, our company was born from the desire to create a truly customer-focused online
                marketplace. We&rsquo;ve been able to grow through a commitment to excellence, innovation, and an unwavering
                passion for delivering value to our customers.
              </p>
            </div>
            <div className="text-center hover:shadow-xl p-2 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">Our Values</h3>
              <p className="text-lg text-gray-600 mt-4">
                We believe in quality, integrity, and trust. These are the principles that guide us as we expand our
                product selection, improve our services, and build lasting relationships with our customers and partners.
              </p>
            </div>
            <div className="text-center hover:shadow-xl p-2 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">Our Promise</h3>
              <p className="text-lg text-gray-600 mt-4">
                We promise to deliver the best products with an exceptional customer experience. Whether you&rsquo;re shopping
                for yourself or someone else, we ensure top-tier service at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Meet Our Team</h2>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <Image
                src={one}
                alt="Team Member 1"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-gray-800">John Doe</p>
              <p className="text-sm text-gray-500">CEO & Founder</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={two}
                alt="Team Member 2"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-gray-800">Jane Smith</p>
              <p className="text-sm text-gray-500">COO</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={three}
                alt="Team Member 3"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-gray-800">Ella Harrison</p>
              <p className="text-sm text-gray-500">Head of Marketing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-orange-600 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Start Shopping with Us Today</h2>
        <p className="text-lg mb-6">
          Join millions of satisfied customers who trust us for their online shopping needs. Explore our exclusive
          deals and offers today.
        </p>
        <a
          href="/"
          className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Shop Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 text-white text-center py-6">
        <p>&copy; 2025 ECommerce. All rights reserved.</p>
      </footer>
    </div>
  );
}
