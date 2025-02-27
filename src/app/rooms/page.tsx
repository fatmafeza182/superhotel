"use client";

import { useGetRooms } from "../../../actions/getRooms";
import RoomItem from "../components/RoomItem";



const RoomPage = () => {
    const { rooms, error } = useGetRooms();


    if (error) return <p>Hata oluştu: {error}</p>;

   
    if (!rooms || rooms.length === 0) return <p>Oda bulunamadi.</p>;

    return (
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 p-3 container">
          {rooms.map((room) => (
            <RoomItem key={room.id} room={room} />
          ))}
        </div>
      </div>
    );
};

export default RoomPage;
