"use client";
import React from "react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left side - form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <input type="email" placeholder="Email" className="input" />

          <h2 className="text-2xl font-semibold">Delivery</h2>
          <input type="text" placeholder="Country/Region" className="input" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="input" />
            <input type="text" placeholder="Last Name" className="input" />
          </div>
          <input type="text" placeholder="Address" className="input" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" className="input" />
            <input type="text" placeholder="Postal code" className="input" />
          </div>
          <input type="text" placeholder="Phone" className="input" />

          <h2 className="text-2xl font-semibold">Payment</h2>
          <div className="border p-4 rounded-lg">
            <label className="flex items-center space-x-3">
              <input type="radio" name="payment" defaultChecked />
              <span className="font-medium">Payment Options</span>
              <img
                src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                alt="PayPal"
                className="w-16 ml-auto"
              />
            </label>
            <p className="text-sm mt-2 text-gray-600">
              After clicking "Pay now", you will be redirected to PayPal.com in
              order to complete your purchase securely. The payment will be sent
              to your bank in US Dollar ($4.83)
            </p>
          </div>

          <div className="space-y-2 mt-4">
            <label className="flex items-center space-x-3">
              <input type="radio" name="address" defaultChecked />
              <span>Same as Shipping address</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="radio" name="address" />
              <span>Use a different address</span>
            </label>
          </div>

          <button className="mt-6 w-full bg-black text-white py-3 rounded-md font-medium">
            Pay Now
          </button>
        </div>

        {/* Right side - order summary */}
        <div className="border p-6 rounded-lg space-y-4">
          <div className="flex space-x-4">
            <img
              src="https://via.placeholder.com/150"
              alt="product"
              className="w-28 h-28 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">Sonam Poncho</h3>
              <p className="text-sm text-gray-600">This item is final</p>
              <p className="text-sm text-gray-600">Peach Blue / M</p>
              <p className="text-sm text-gray-600">Qty: 1</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Nu.14000</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Nu.1400</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Nu.15400</span>
            </div>
          </div>

          <div className="p-4 border rounded-md bg-red-50 text-red-600 text-sm">
            <p>Local taxes, duties or customs clearance fees may apply</p>
          </div>

          <button className="border mt-4 px-4 py-2 rounded-md">Back</button>
        </div>
      </div>

      <style jsx>{`
        .input {
          @apply w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black;
        }
      `}</style>
    </div>
  );
}
