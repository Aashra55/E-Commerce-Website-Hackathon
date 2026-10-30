"use client";
import React, { useState } from "react";
import { FormEvent } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending your message...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "412703ee-9412-485d-98a4-4675d236e513");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setResult("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
            24/7 Concierge Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We&rsquo;d Love to Hear from You
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Have questions about an order, styling advice, or wholesale inquiries? Our friendly support team responds within 2 hours.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <FiMessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Send Us a Message</h2>
                <p className="text-xs text-slate-500">Fill in the form below and we will get back to you shortly</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="How can we assist you today? Please include order number if applicable."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 ${
                  isSubmitting
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/20"
                }`}
              >
                <FiSend className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>

              {result && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    result.includes("Thank you") || result.includes("success")
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  <FiCheckCircle className="w-4 h-4 shrink-0" />
                  <span>{result}</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Contact Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Flagship Showroom</h4>
                    <p className="text-xs text-slate-500 mt-0.5">123 Fashion Avenue, Suite 400</p>
                    <p className="text-xs text-slate-500">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Toll-Free Phone</h4>
                    <p className="text-xs text-slate-500 mt-0.5">+1 (800) 555-0199</p>
                    <p className="text-[11px] text-slate-400">Monday - Friday 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Email Inquiries</h4>
                    <p className="text-xs text-slate-500 mt-0.5">support@modernstore.com</p>
                    <p className="text-[11px] text-slate-400">2-hour average response time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FiClock className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-900">Operating Hours</h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Monday - Friday</span>
                  <span className="font-bold text-slate-900">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Saturday</span>
                  <span className="font-bold text-slate-900">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sunday</span>
                  <span className="font-bold text-rose-500">Closed for Maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
