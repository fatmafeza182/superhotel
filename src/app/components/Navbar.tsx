"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineHotelClass } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { NavMenu } from "@/lib";
import NavItem from "./NavItem";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setİsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const sidebarRef = useRef(null);


  const toggleSidebar = () => {
    setİsSidebarOpen(!isSidebarOpen);
  };

  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(sidebarRef.current && !sidebarRef.current.contains(event.target)){
        setİsSidebarOpen(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[])

  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <div className="w-full z-30 fixed flex flex-col">
      <div className="flex bg-transparent shadow-md items-center justify-between px-6 py-4">
        <button onClick={(()=>router.push('/'))} className="font-serif font-bold flex flex-row text-orange-500 text-2xl">
          <MdOutlineHotelClass size={30} />
          <span>HOTELGLORY</span>
        </button>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-orange-500">
            <GiHamburgerMenu size={36} />
          </button>
        </div>

        <div className="hidden lg:flex flex-row items-center space-x-10 text-orange-500 font-bold text-xl">
          {NavMenu.map((item, index) => (
            <NavItem key={index} title={item.title} url={item.url} />
          ))}
        </div>

        <div className="flex flex-row space-x-10">
          <Button
            onClick={() => router.push("/reservations")}
            variant="myButton"
            
          >
            Rezervasyon
          </Button>
          <FaUser
            onClick={toggleSidebar}
            className="text-orange-500 cursor-pointer"
            size={36}
          />
        </div>
      </div>
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-400 p-4 space-y-4`}
      >
        {NavMenu.map((item, index) => (
          <NavItem key={index} title={item.title} url={item.url} />
        ))}
      </div>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-orange-500">Hesap</h2>
          <AiOutlineClose
            className="cursor-pointer text-gray-600"
            size={24}
            onClick={toggleSidebar}
          />
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {!isAuthenticated ? (
            <div>
              <Button
                onClick={() => router.push("/login")}
                variant="myButton"
                
              >
                Giriş yap
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className=" mt-10"
                variant="myButton"
                
              >
                Kayit Ol
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => router.push("/reservationPage")}
                variant="myButton"
              >
                Rezervasyonlarim
              </Button>
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-400 mt-10"
              >
                Çikiş yap
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
