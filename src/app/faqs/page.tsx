'use client'
import { useState } from "react";
import { faqs } from "../utils/faqData";

export default function FAQComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="mb-6 p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No FAQs found for your search.</p>
        )}
      </div>
    </div>
  );
}
