"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Landing/LoggedInHeader";
import SearchBar from "@/components/customUI/Search";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../components/ui/button";
import Selection from "@/components/selected";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
import Landing from "@/assets/Landing/slider1.png";
import i1 from "@/assets/Landing/image.png";

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
const Guest = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const imageList = [
    { id: 1, src: Landing.src },
    { id: 2, src: i1.src },
    { id: 3, src: Landing.src },
  ];

  useEffect(() => {
    //load accpuntId from localStorage
    const storedAccountId = localStorage.getItem("accountId");
    if(storedAccountId){
      setAccountId(Number(storedAccountId));
    }else{{
      console.log("No accountId found in localStorage");
    }}
    console.log(storedAccountId);

    fetch("http://localhost:8765/PRODUCT-SERVICE/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <>
      <Header className="bg-transparent text-white p-4 fixed w-full top-0 left-0 z-1" />

      {/* Hero slider with search bar */}
      <section>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {imageList.map((image) => (
              <CarouselItem key={image.id}>
                <div className="w-full h-screen relative">
                  <Image
                    src={image.src}
                    alt="slider"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-lg">
          <SearchBar />
        </div>
      </section>

      {/* Product listing */}
      <section>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg shadow-md p-4">
                <div className="relative w-full h-80">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-500">Color: {product.color}</p>
                <p className="text-sm text-gray-700 font-medium">Nu. {product.price}</p>
                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => router.push(`/home/${product.id}`)}
                >
                  View Product
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Guest;
