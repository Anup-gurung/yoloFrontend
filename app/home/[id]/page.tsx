"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CartDrawer from "@/components/cart/CartDrawer";
import { parse } from "path";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  color: string;
  image: string;
  condition?: string;
  accountId?: number;
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [allCartItems, setAllCartItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState([]);

  const colors = [
    { color: "rose", value: "bg-rose-500" },
    { color: "cyan", value: "bg-cyan-400" },
    { color: "purple", value: "bg-purple-400" },
  ];

  useEffect(() => {
    if (!id) return;

    // Fetch current product details
    fetch(`http://localhost:8765/PRODUCT-SERVICE/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  useEffect(() => {
    // Fetch all products for related items
    fetch(`http://localhost:8765/PRODUCT-SERVICE/api/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Filter out current product
        const related = data.filter((p) => p.id.toString() !== id);
        setRelatedProducts(related);
      })
      .catch((err) => console.error("Failed to fetch related products:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color!");
      return;
    }

    const accountId = localStorage.getItem("accountId");

    if (!accountId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const cartData = {
      productId: product?.id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      accountId: parseInt(accountId), // ✅ Make sure it's sent as a number
    };

    fetch("http://localhost:8765/CART-SERVICE/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add to cart");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Cart item added:", data);
        setOpenDrawer(true);
      })
      .then((data) => {
        console.log("Cart item added:", data);
        setOpenDrawer(true);

        // const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        // existingCart.push(cartItem);
        // localStorage.setItem("cart", JSON.stringify(existingCart));
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart");
      });
  };

  if (!product) {
    return <div className="p-6">Loading...</div>;
  }

  const cartItem = {
    name: product.name,
    img: product.image || "/placeholder.png",
    price: product.price,
    qty: quantity,
  };
  console.log("cartitem", cartItem);

  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button variant="outline" className="mb-4" onClick={() => router.back()}>
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-auto">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={800}
            className="object-cover w-full"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-1">Nu.{product.price}</p>
          <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

          <div className="mb-4">
            <p className="mb-1 font-medium">Sizes</p>
            <div className="flex gap-2 mb-4">
              {["M", "L", "XL"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>

            <p className="mb-1 font-medium">Colors</p>
            <div className="flex gap-2 mb-4">
              {colors.map((color) => (
                <div
                  key={color.color}
                  onClick={() => setSelectedColor(color.color)}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    color.value
                  } ${
                    selectedColor === color.color
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>

            <Button className="bg-black text-white" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-16 mb-4">Related Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedProducts.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden cursor-pointer"
            onClick={() => router.push(`/home/${item.id}`)}
          >
            <CardContent className="p-0">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={400}
                height={500}
                className="object-cover w-full"
              />
              <div className="p-2 text-center text-sm font-medium">
                {item.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CartDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        items={cartItems}
      />
    </div>
  );
}
