"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Room } from "../types/types";


interface UseRoomProps {
    rooms : Room | null;
    error : string | null;
    
}
export const useGetRooms = ():UseRoomProps => {
    const [rooms, setRooms] = useState<Room | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/rooms/");
          setRooms(response.data); 
        } catch (err: any) {
          console.error("API Hatasi:", err);
          setError(err.response?.data?.detail || "Bilinmeyen bir hata oluştu.");
        }
      };
  
      fetchRooms();
    }, []);
    return { rooms, error };
};
export const useHomeGetRooms = ():UseRoomProps => {
  const [rooms, setRooms] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
        axios.get("http://127.0.0.1:8000/api/rooms/", )
        .then((response) => {
          setRooms(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Hata", err);
          setError(err.message);
          setLoading(false);
      })
    };

    fetchRooms();
  }, []);
   
return { rooms, error, loading };
}

interface UseDetailRoomProps {
    room : Room | null;
    loading : boolean;
    error : string | null;
}

export const useDetailRooms = (roomId: number): UseDetailRoomProps => {
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/rooms/${roomId}/`)
        .then((response) => {
          setRoom(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Hata", err);
          setError(err.message);
          setLoading(false);
        });
    }, [roomId]);
  
    return { room, loading, error };
  };