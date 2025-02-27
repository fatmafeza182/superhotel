"use client"
import React, { useEffect, useState } from 'react'
import { Reservation } from '../../../types/types';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const Reservationpage = () => {
const [reservations,setReservations]=useState<Reservation[]>([]);
const router = useRouter();


useEffect(()=>{
  const fetchReservations = async ()=>{
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get('http://localhost:8000/api/reservations/', {
        headers: {
          Authorization: `Bearer ${token}`, // JWT token
        },
      });
      if (response.status === 200) {
        setReservations(response.data);
      } else {
        console.error("Failed to fetch reservations", response);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }
  fetchReservations();
},[])

  return (
    <div className="container max-w-7xl mx-auto p-6 mt-16">
    <h1 className="text-3xl font-bold mb-8">Rezervasyonlar</h1>

    {reservations.length === 0 ? (
      <div className="text-center">
        <p>Herhangi bir rezervasyon bilgisi yok</p>
        <Link href="/rooms">
          <Button variant="outline">Rezervasyon oluştur</Button>
        </Link>
      </div>
    ) : (
      <div key={reservations.name} className="space-y-6">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="p-6 bg-white shadow-md rounded-lg ">
            <p className="text-xl font-bold">Oda Bilgisi <span className='text-lg font-normal'>{reservation.name}</span></p>
            <p className="text-xl font-bold">Rezervasyon sahibi: <span className='text-lg font-normal'>{reservation.guest_fullname}</span></p>
            <p className="text-xl font-bold">Email hesabiniz: <span className='text-lg font-normal'>{reservation.guest_email}</span></p>
            <div className='font-bold text-xl'>
              <p >Giriş Tarihi: <span className='text-lg font-normal'> {new Date(reservation.arrival_date).toLocaleDateString()}</span></p>
              <p>Çikiş Tarihi: <span className='text-lg font-normal'> {new Date(reservation.departure_date).toLocaleDateString()}</span></p>
              <p>Yetişkin: <span className='text-lg font-normal'>{reservation.adults}</span></p>
              <p>Çocuk: <span className='text-lg font-normal'>{reservation.children} </span></p>
            </div>
            <Button
              className=" justify-center text-center mt-5"
              variant="myButton"
              onClick={() => router.push(`/reservations/`)}
            >
              Yeni rezervasyon oluşturmak içi tikla
            </Button>
          </div>
        ))}
      </div>
    )}
  </div>
  
    
  )
}

export default Reservationpage

