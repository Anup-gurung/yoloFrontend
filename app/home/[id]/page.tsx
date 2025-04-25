"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CartDrawer from "@/components/cart/CartDrawer";

export default function ProductPage() {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const colors = [
    { color: "rose", value: "bg-rose-500" },
    { color: "cyan", value: "bg-cyan-400" },
    { color: "purple", value: "bg-purple-400" },
  ];

  const [cartItem, setCartItem] = useState({
    name: "Sonam Poncho",
    img: "/sonam-poncho.jpg",
    price: 14000,
    qty: 1,
  });

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color!");

      return;
    }
    setOpenDrawer(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button variant="outline" className="mb-4">
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-auto">
          <Image
            src="/sonam-poncho.jpg"
            alt="Sonam Poncho"
            width={600}
            height={800}
            className="object-cover w-full"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">Sonam Poncho</h1>
          <p className="text-gray-700 mb-1">Nu.14000</p>
          <p className="text-gray-600 mb-4 text-sm">
            One of the best textiles woven by Bhutanese Artisan. With natural
            colors and threads. Each design crafted in the clothes symbolizes a
            great sense of hardwork and Bhutanese cultures.
          </p>

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
        {[
          { name: "Sonam Poncho", img: "/sonam-poncho.jpg" },
          { name: "Yatra Hooded Jacket", img: "/yatra-hooded-jacket.jpg" },
          { name: "Tunic Dress", img: "/tunic-dress.jpg" },
        ].map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={item.img}
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
        item={cartItem}
      />
    </div>
  );
}
