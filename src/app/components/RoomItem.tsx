import React from "react";
import { Room } from "../../../types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RoomItemProps {
  room: Room;
}
const RoomItem = ({ room }: RoomItemProps) => {
  const imageUrl = room?.image?.startsWith("http")
    ? room.image
    : `http://localhost:8000/${room?.image}`;
  return (
    <div className="flex flex-col p-5 xl:mt-64 xl:gap-1 ">
      <div className="shadow-lg">
        <Image
          src={imageUrl}
          alt={room.name}
          width={500}
          height={400}
          className="h-60  w-full object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="font-bold text-orange-500 text-2xl lg:text-lg">{room.name}</h2>
        <p className="font-serif">{room.description}</p>
        <h2 className="text-3xl font-bold text-orange-500 flex justify-end">{room.price} ₺ </h2>
      </div>
      <Link href={`/rooms/${room?.id}`}> 
      <Button className="bg-orange-800 w-full hover:bg-orange-400 text-sm">Odaya git</Button>
      </Link>
    </div>
  );
};

export default RoomItem;
