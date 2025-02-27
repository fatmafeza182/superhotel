"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import Link from "next/link";
import { useDetailRooms } from "../../../../actions/getRooms";

const RoomDetailPage = () => {
  const params = useParams();
  const roomId = params.roomId;

  const { room, error, loading } = useDetailRooms(Number(roomId));

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (!room) return <p>Oda bulunamadi.</p>;

  const imageUrl = room?.image?.startsWith("http")
    ? room.image
    : `http://localhost:8000/${room?.image}`;

  return (
    <div className="container mt-24 max-w-6xl p-2">
      <div className="bgone shadow-md rounded-lg myborder overflow-hidden flex flex-col md:flex-row">
        <div className="flex flex-row ">
          <Image
            src={imageUrl}
            alt={room.name}
            width={900}
            height={800}
            className="h-90 w-full object-cover"
          />
          <div className="md:w-1/2 p-4 ">
            <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
            <p className="">{room.description}</p>
            <div className=" text-orange-500 mt-5 text-2xl font-semibold">₺{room.price} per night</div>
            <Link href={'/reservations'}>
              <Button className="bg-orange-800 mt-5 w-full hover:bg-orange-400 text-sm">
                Rezervasyon
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
