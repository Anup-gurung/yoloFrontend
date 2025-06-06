"use client";

import React from "react";
import Image from "next/image";
import Landing from "@/assets/Landing/ok.jpg";
import i1 from "@/assets/Landing/slider2.png";
import f7 from "@/assets/Landing/image 91.png";
import f2 from "@/assets/Landing/image 92.png";
import f3 from "@/assets/Landing/image 94.png";
import f4 from "@/assets/Landing/f4.png";
import f5 from "@/assets/Landing/f5.png";
import f6 from "@/assets/Landing/f6.png";
import i2 from "@/assets/Landing/i2.png";
import i3 from "@/assets/Landing/i3.png";
import Header from "@/components/Landing/LoggedInHeader";
import SearchBar from "@/components/customUI/Search";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// Import Slider from react-slick or the appropriate library
const guest = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const imageList = [
    Landing.src,
    i1.src,
    Landing.src,
    Landing.src,
    Landing.src,
  ];

  const fashionItems = [
    { id: 1, image: f7, name: "sonam Poncho" },
    { id: 2, image: f2, name: "Shrug" },
    { id: 3, image: f3, name: "Dress" },
    { id: 4, image: f4, name: "Shirt" },
    { id: 5, image: f5, name: "Pants" },
    { id: 6, image: f6, name: "Shirt" },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slideToshow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "5px",
    arrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // centerPadding: '10px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Header className="bg-transparent text-white p-4 fixed w-full top-0 left-0 z-1" />

      <section
      // style={{ backgroundImage: `url(${Landing.src})` }}
      >
        <Carousel
          plugins={[plugin.current]}
          className=""
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="">
            {imageList.map((image, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card>
                    <CardContent className="flex items-center justify-center">
                      <Image
                        src={image}
                        alt="slider"
                        width={50}
                        height={50}
                        className="w-screen h-screen object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-lg">
                    <SearchBar />
                </div>
      </section>

      <section>
        <h1>Featured Product</h1>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fashionItems.map((item) => (
              <div key={item.id} className="border rounde-lg shadow-sm p-4">
                <div className="relative w-full h-80">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg filter grayscale transition-all duration-300 hover:grayscale-0 "
                  />
                </div>
                <Button
                  variant="outline"
                  className="mt-3 font-medium flex justify-center mx-auto"
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default guest;
