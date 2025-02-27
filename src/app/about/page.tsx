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
import { restoran } from "@/lib";
import Link from "next/link";



const RestoranPage = () => {
  const [images, setImages] = useState<{ href: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImages(restoran);
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
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((images, index) => (
            <CarouselItem key={index} className="w-full h-[500px] ">
              <Image
                src={images.href}
                alt={images.alt}
                width={1920}
                height={1080}
                quality={90} 
                priority={index === 0} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" 
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex left-0 bottom-0"/>
        <CarouselNext className="hidden lg:flex right-0 bottom-0" />
      </Carousel>
      <div className="flex flex-col min-h-screen">
      <div className="flex justify-center mt-16 p-5 gap-10 sm:grid sm:grid-cols-2 lg:flex px-4 sm:px-8 ">
          <div className=" shadow-lg p-5">
            <h1 className="text-orange-700 text-center text-xl font-bold">İstanbul-Beşiktaş</h1>
            <p className="mt-3 ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga fugit numquam natus mollitia nesciunt harum ea saepe nihil necessitatibus a quos ut, aspernatur, placeat error nemo blanditiis. Dolorem, autem repellendus.
            Quasi vitae fugit consequuntur voluptatibus at laudantium consequatur illum, perspiciatis laborum incidunt totam porro alias sint dicta quas mollitia, eveniet saepe facere quos dolore? Aspernatur, maxime exercitationem. Eaque, aliquam doloremque!</p>
            <Link className="text-xl font-bold flex justify-end text-orange-700 " href='#'>
            <p>Yol tarifi</p>
            </Link>
          </div>
          <div className=" shadow-lg p-5">
            <h1 className="text-orange-700 text-center text-xl font-bold">İstanbul-Başakşehir</h1>
            <p className="mt-3 ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga fugit numquam natus mollitia nesciunt harum ea saepe nihil necessitatibus a quos ut, aspernatur, placeat error nemo blanditiis. Dolorem, autem repellendus.
            Quasi vitae fugit consequuntur voluptatibus at laudantium consequatur illum, perspiciatis laborum incidunt totam porro alias sint dicta quas mollitia, eveniet saepe facere quos dolore? Aspernatur, maxime exercitationem. Eaque, aliquam doloremque!
           </p>
            <Link className="text-xl font-bold flex justify-end text-orange-700 " href='#'>
            <p>Yol tarifi</p>
            </Link>
          </div>
          <div className=" shadow-lg p-5">
            <h1 className="text-orange-700 text-center text-xl font-bold">Antalya</h1>
            <p className="mt-3 ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga fugit numquam natus mollitia nesciunt harum ea saepe nihil necessitatibus a quos ut, aspernatur, placeat error nemo blanditiis. Dolorem, autem repellendus.
            Quasi vitae fugit consequuntur voluptatibus at laudantium consequatur illum, perspiciatis laborum incidunt totam porro alias sint dicta quas mollitia, eveniet saepe facere quos dolore? Aspernatur, maxime exercitationem. Eaque, aliquam doloremque!</p>
            <Link className="text-xl font-bold flex justify-end text-orange-700 " href='#'>
            <p>Yol tarifi</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestoranPage;
