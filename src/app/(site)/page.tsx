"use client";
import React from "react";
import HeroCarousel from "../components/Carousel";
import { useHomeGetRooms } from "../../../actions/getRooms";
import RoomItem from "../components/RoomItem";

export default function Home() {
  const { rooms, error } = useHomeGetRooms();
  if (error) {
    return <p>Hata: {error.message || "Bilinmeyen bir hata oluştu"}</p>;
  }


  return (
    <div>
      <HeroCarousel />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-72  p-3 container">
        
        {rooms?.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
