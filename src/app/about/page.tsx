"use client";

import React from "react";
import Image from "next/image";
import about from "../images/about.jpg";
import one from "../images/one.jpeg";
import two from "../images/two.jpeg";
import three from "../images/three.jpeg";
import Link from "next/link";
import { FiCheckCircle, FiHeart, FiGlobe, FiAward, FiArrowRight } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="bg-[#fafbfc] min-h-screen">
      
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            About Our Brand
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Crafting Timeless Style with Purpose
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded with a passion for quality and mindful aesthetics, we curate everyday wardrobe essentials that combine luxury comfort with accessible pricing.
          </p>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 text-center">
          <div>
            <p className="text-2xl sm:text-4xl font-black text-orange-600">50,000+</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-slate-900">10+ Years</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Design Experience</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-orange-600">99.8%</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Satisfaction Rate</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-slate-900">100%</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Ethical Sourcing</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We Believe Fashion Should Be Effortless, Durable & Mindful
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We started our journey with one simple observation: fast fashion sacrifices quality and sustainability, while luxury brands often charge excessive markups. We set out to bridge that gap.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every piece in our catalog is thoughtfully engineered with durable stitching, premium fabrics, and versatile cuts that stay relevant season after season.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                <FiCheckCircle className="text-orange-600 w-5 h-5 shrink-0" />
                <span>Fair-trade certified manufacturing partners</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                <FiCheckCircle className="text-orange-600 w-5 h-5 shrink-0" />
                <span>Biodegradable and recyclable shipping packaging</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                <FiCheckCircle className="text-orange-600 w-5 h-5 shrink-0" />
                <span>Direct-to-consumer pricing with no middleman markup</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <Image
              src={about}
              alt="Our Workshop and Mission"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Our Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <FiAward className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Premium Standards</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We select premium raw materials tested for color retention, comfort, and longevity through dozens of wash cycles.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <FiGlobe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sustainable Future</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Minimizing ecological footprint with low-impact dyes, organic cotton, and closed-loop water treatment facilities.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <FiHeart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Customer Centric</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From 24/7 personalized stylist advice to 30-day hassle-free returns, our top priority is delighting every shopper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            People Behind The Brand
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Meet Our Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-xs space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-orange-500 shadow-sm relative">
              <Image src={one} alt="John Doe" fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">John Doe</h4>
              <p className="text-xs text-orange-600 font-semibold">Founder & Creative Director</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-xs space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-orange-500 shadow-sm relative">
              <Image src={two} alt="Jane Smith" fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Jane Smith</h4>
              <p className="text-xs text-orange-600 font-semibold">Chief Operating Officer</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-xs space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-orange-500 shadow-sm relative">
              <Image src={three} alt="Ella Harrison" fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Ella Harrison</h4>
              <p className="text-xs text-orange-600 font-semibold">Head of Customer Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold">Ready to Refresh Your Wardrobe?</h2>
          <p className="text-sm text-orange-100">
            Join over 50,000 discerning shoppers and discover everyday luxury made just for you.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-white rounded-full font-bold text-sm shadow-xl transition"
            >
              <span>Explore The Store</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
