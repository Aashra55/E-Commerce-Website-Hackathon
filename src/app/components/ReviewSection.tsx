"use client";
import React, { useState } from "react";
import { FiStar, FiCheckCircle } from "react-icons/fi";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      name: "Sophia Martinez",
      rating: 5,
      comment: "Absolutely stunning quality! The fabric feels premium and the fit is true to size. Will definitely order more.",
      date: "2 days ago",
    },
    {
      name: "Alex Johnson",
      rating: 5,
      comment: "Fast shipping and packaged with care. Exceeded my expectations for this price point.",
      date: "1 week ago",
    },
  ]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    const currentDate = "Just now";
    const newReview = { name, rating, comment, date: currentDate };

    setTimeout(() => {
      setReviews([newReview, ...reviews]);
      setName("");
      setRating(5);
      setComment("");
      setIsSubmitting(false);
      setShowForm(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xs mt-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-amber-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-900">4.9 out of 5</span>
            <span className="text-xs text-slate-400">({reviews.length + 85} ratings)</span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold transition shadow-xs self-start sm:self-auto"
        >
          {showForm ? "Cancel Review" : "Write a Review"}
        </button>
      </div>

      {/* Review Form Drawer */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-slate-900">Share Your Experience</h3>

          {/* Interactive Star Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition text-amber-400 focus:outline-none"
                >
                  <FiStar
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-slate-700">{rating} Stars</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John D."
                required
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Review Details</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="What did you like or dislike? How was the fit and quality?"
              required
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-orange-500/20"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="mt-8 space-y-4">
        {reviews.map((rev, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100 hover:border-slate-200 transition"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center">
                  {rev.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{rev.name}</span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <FiCheckCircle className="w-2.5 h-2.5" /> Verified
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
