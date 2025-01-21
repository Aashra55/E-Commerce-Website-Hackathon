'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function About() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderPlace = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    // Get all input elements within the form
    const formElements = e.target as HTMLFormElement;
    const inputs = formElements.querySelectorAll('input[required]');

    // Check if all required fields are filled
    const allFieldsFilled = Array.from(inputs).every((input) => {
      // Cast to HTMLInputElement to access the 'value' property
      const inputElement = input as HTMLInputElement;
      return inputElement.value !== '';
    });

    if (allFieldsFilled) {
      alert('Order placed successfully!');
      setOrderPlaced(true);

      // Hide the "Thank you" message after 3 seconds
      setTimeout(() => {
        setOrderPlaced(false);
      }, 3000); // 3 seconds delay
    } else {
      alert('Please fill all the required fields.');
    }
  };

  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
        </div>

        <div className="mt-12">
          <form onSubmit={handleOrderPlace}>
            {/* Personal Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">01</h3>
                <h3 className="text-xl font-semibold text-gray-800 mt-1">Personal Details</h3>
              </div>

              <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Phone number"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Address */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">02</h3>
                <h3 className="text-xl font-semibold text-gray-800 mt-1">Shopping Address</h3>
              </div>

              <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Street address"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Zip Code"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">03</h3>
                <h3 className="text-xl font-semibold text-gray-800 mt-1">Payment method</h3>
              </div>

              <div className="md:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center">
                    <input type="radio" className="w-5 h-5 cursor-pointer" id="card" name="radio" required />
                    <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                      <Image src="https://readymadeui.com/images/visa.webp" width={100} height={100} className="w-12" alt="card1" />
                      <Image src="https://readymadeui.com/images/american-express.webp" width={100} height={100} className="w-12" alt="card2" />
                      <Image src="https://readymadeui.com/images/master.webp" width={100} height={100} className="w-12" alt="card3" />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" name="radio" required />
                    <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                      <Image src="https://readymadeui.com/images/paypal.webp" width={100} height={100} className="w-20" alt="paypalCard" />
                    </label>
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-4 mt-4">
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Card number"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="EXP."
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="CVV"
                      required
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-4 mt-12">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-md hover:bg-gray-100"
              >
                Pay later
              </button>
              <button
                type="submit"
                className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95
                px-6 py-3 text-sm font-semibold tracking-wide bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Pay now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Show the "Thank you for shopping" message for a few seconds */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Thank You for Shopping!</h3>
            <p className="text-gray-600 mt-2">Your order has been successfully placed. You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
}
