"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { sliderImages } from "@/lib";
import HeroForm from "./HeroForm";

const HeroCarousel = () => {
  const [images, setImages] = useState<{ href: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImages(sliderImages);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="relative h-[32rem] pb-40">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((images, index) => (
            <CarouselItem key={index}>
              <Image
                src={images.href}
                alt={images.alt}
                width={1920}
                height={1080}
                quality={90} 
                priority={index === 0} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" 
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex left-0"/>
        <CarouselNext className="hidden lg:flex right-0" />
      </Carousel>
      <HeroForm/>
    </div>
  );
};

export default HeroCarousel;
