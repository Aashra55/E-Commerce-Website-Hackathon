'use client';
import React, { useState } from 'react';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString(); // Get current date in localized format
    const newReview = { name, rating, comment, date: currentDate };    setReviews([...reviews, newReview]);
    setName('');
    setRating(1);
    setComment('');
  };

  // Function to render stars based on the rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="w-[100%] mx-auto p-6 bg-gray-100 rounded-lg shadow-lg md:m-4 m-2">
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring focus:ring-[2px] focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Rating (1 to 5)</label>
          <input
            type="number"
            value={rating}
            min={1}
            max={5}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring focus:ring-[2px] focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring focus:ring-[2px] focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <button type="submit" className=" transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
        px-4 py-2 bg-orange-600 text-white rounded cursor-pointer">
          Submit Review
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">All Reviews:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 mt-4 border border-gray-200 rounded-lg shadow-sm">
<div className="flex items-center justify-between">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500 ml-2">{review.date}</p>
              </div>              <p>{renderStars(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
