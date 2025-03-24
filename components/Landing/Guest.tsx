import React from "react";
import Image from "next/image";
import Landing from "@/assets/Landing/slider1.png";
import i1 from "@/assets/Landing/image.png";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  return (
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
    </section>
  );
};

export default guest;
