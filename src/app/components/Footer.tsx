import React from "react";
import { MdOutlineHotelClass } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative text-white mt-44  pt-24">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/slider/1.jpg"
          alt="Footer Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>

      <div className="relative z-20">
        <div className="container mx-auto px-4 mb-0">
          <div className="text-center flex justify-center gap-7">
            <h1 className="font-serif font-bold flex flex-row text-2xl text-yellow-500">
              <MdOutlineHotelClass size={30} />
              <span>HOTELGLORY</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A quod
                magni harum qui, sapiente quas iure aspernatur dolores eligendi
                illo necessitatibus omnis sequi dolor, ad expedita quos obcaecati
                tenetur delectus.
              </p>
            </div>
            <div className="text-center mt-8">
              <p className="text-white">@fatma aslan</p>
              <p className="text-white">
                Designed By <span className="text-yellow-500">Fatma Aslan</span>
              </p>
            </div>
            <div className="flex gap-10 md:mt-10 md:text-center text-yellow-500 md:mb-60"> 
              <FaInstagram href="#" className="" size={40} />
              <FaWhatsapp href="#" size={40} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-center py-4">
        <p className="text-white text-sm">© 2025 Hotel Glory, Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
};

export default Footer;
