"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/Cartitems";
import { Button } from "@/components/ui/button";

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


const CartPage = () => {
  const [cartItems, setCartItems] = useState<FullCartItem[]>([]);
  const [loading, setLoading] = useState(true);

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


  const handleDelete = async (cartId: number) => {
  try {
    const res = await fetch(`http://localhost:8765/CART-SERVICE/api/cart/remove/${cartId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete cart item");

    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};


  return (
    <div className="max-h-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <Button variant="outline">Back</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, idx) => (
            <CartItem key={item.cartId} item={item} highlight={idx === 2} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
