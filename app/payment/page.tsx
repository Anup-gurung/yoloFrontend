"use client";

import React, { useState, useEffect } from "react";

type CartItem = {
  name: string;
  img: string;
  price: number;
  qty: number;
};


interface RawCartItem {
  id: number;
  accountId: number;
  productId: number;
  quantity: number;
  addedAt: string | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  size: string;
}

interface FullCartItem extends Product {
  cartId: number;
  quantity: number;
}


export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<FullCartItem[]>([]);
  const [shippingCost, setShippingCost] = useState(1400);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  

useEffect(() => {
    const fetchCartWithProducts = async () => {
      try {
        const cartRes = await fetch("http://localhost:8765/CART-SERVICE/api/cart/all");
        const rawCart: RawCartItem[] = await cartRes.json();

        const productPromises = rawCart.map((item) =>
          fetch(`http://localhost:8765/PRODUCT-SERVICE/api/products/${item.productId}`).then((res) =>
            res.json()
          )
        );

        const products: Product[] = await Promise.all(productPromises);

        const fullCartItems: FullCartItem[] = rawCart.map((item, idx) => ({
          ...products[idx],
          cartId: item.id,
          quantity: item.quantity,
        }));

        setCartItems(fullCartItems);
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartWithProducts();
  }, []);



  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const handlePayNow = async () => {
    try {
      setLoading(true);

      const paymentData = {
        amount: total,
        paymentId: "abc123",
        orderId: 1,
        accountId: 1,
        payerId: "payer456",
        contact: {
          email,
          country,
          firstName,
          lastName,
          address,
          city,
          postalCode,
          phone,
        },
        items: cartItems,
      };
      console.log("paymentdata",paymentData);

      const response = await fetch(
        "http://localhost:8765/PAYMENT-SERVICE/paypal/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();
      console.log("Payment response:", data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Payment successful (no redirect)");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left side - form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h2 className="text-2xl font-semibold">Delivery</h2>
          <input
            type="text"
            placeholder="Country/Region"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal code"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

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

          <button
            className="mt-6 w-full bg-black text-white py-3 rounded-md font-medium disabled:opacity-50"
            onClick={handlePayNow}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>

        {/* Right side - order summary */}
        <div className="border p-6 rounded-lg space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold">
                      Nu.{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Nu.{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Nu.{shippingCost}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Nu.{total}</span>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-red-50 text-red-600 text-sm">
                <p>Local taxes, duties or customs clearance fees may apply</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
