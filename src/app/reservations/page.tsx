"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "path";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {  useState } from "react";
import Image from "next/image";
import { Reservation, Room } from "../../../types/types";
import { useRouter } from "next/navigation";

const today = new Date();
today.setHours(0, 0, 0, 0);

const formSchema = z
  .object({
    guestFullname: z
      .string()
      .min(2, { message: "Guest Fullname must be at least 2 characters." }),
    guestEmail: z.string().email({ message: "Invalid email address." }),
    arrivalDate: z
      .date()
      .min(today, { message: "Arrival date must be after today." }),
      departureDate: z
      .date()
      .min(today, { message: "Departure date must be after today." }),
    adults: z.string().nonempty({ message: "Select number of adults" }),
    children: z.string().nonempty({ message: "Select number of children" }),
  })
  .refine((data) => data.arrivalDate < data.departureDate, {
    message: "Arrival date must be before departure date",
    path: ["departureDate"],
  });

const Reservationpage = () => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [selectedRoom,setSelectedRoom]=useState<Room|null>(null)
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arrivalDate: undefined,
      departureDate: undefined,
      adults: "1",
      children: "0",
      guestEmail: "",
      guestFullname: "",
    },
  });
  interface RoomProps {
    data: Reservation;
    adults:number;
    children:number;
  }
const fetchAvailableRooms = async ( data : RoomProps) => {
  const token = localStorage.getItem("accessToken");

  if (!data.arrivalDate || !data.departureDate) {
    console.error("Tarih seçilmedi!");
    return;
  }


  const formattedArrivalDate = new Date(data.arrivalDate).toISOString().split("T")[0];
  const formattedDepartureDate = new Date(data.departureDate).toISOString().split("T")[0];

  try {
    const response = await fetch("http://127.0.0.1:8000/api/available-rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        arrivalDate: formattedArrivalDate,
        departureDate: formattedDepartureDate,
        adults: data.adults,
        children: data.children,
      }),
    });

    if (response.ok) {
      const rooms = await response.json();
      console.log("Oda bilgileri alindi:", rooms);
      setAvailableRooms(rooms.rooms);
    } else {
      console.log("Uygun odalar getirilemedi");
    }
  } catch (error) {
    console.error("Hata", error);
  }
};

  const makeReservation  = async (room:Room)=>{
    if(!room) return;
    const token = localStorage.getItem("accessToken");
    const reservationData = {
      guestFullname: form.getValues("guestFullname"),
      guestEmail: form.getValues("guestEmail"),
      arrivalDate: form.getValues("arrivalDate").toISOString(),
      departureDate: form.getValues("departureDate").toISOString(),
      adults: form.getValues("adults"),
      children: form.getValues("children"),
      roomId: room.id,
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations/',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body:JSON.stringify(reservationData)
      });
      if(response.ok){
        const result = await response.json();
        console.log('Rezervasyon Oluşturuldu:', result);
        router.push('reservationPage/')
      }else{
      const error = await response.json();
      console.error('Rezervasyon oluşturulmadi:', error);
      }
    } catch (error) {
      console.error('Giriş yapan kullanici bulunamadi:', error);
    } 
  };
  const onSubmit = async (data:unknown)=>{
    await fetchAvailableRooms(data)
    console.log("Available rooms:", availableRooms);
  }

  return (
    <div className="mt-10 flex justify-center items-center">
      <div className="  flex justify-center items-center p-10">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 "
            >
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="guestFullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="validationLabel">İsminiz</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-orange-400 text-white"
                          placeholder="Guest Fullname"
                          {...field}
                          
                        />
                      </FormControl>

                      <FormMessage className="validationError" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="guestEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="validationLabel">
                        E-posta hesabiniz
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Guest Email"
                          {...field}
                          className="bg-orange-400 text-white"
                        />
                      </FormControl>

                      <FormMessage className="validationError" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="arrivalDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="validationLabel">
                      Giriş Tarihi
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                          onChange={(e) => setArrivalDate(e.target.value)}
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-orange-400 text-white",
                              field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {field.value ? (
                              format(field.value)
                            ) : (
                              <span>Bir gün seç</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="validationLabel">
                      Çikiş Tarihi
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                          onChange={(e) => setDepartureDate(e.target.value)}
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-orange-400 text-white",
                              field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value)
                            ) : (
                              <span>Bir gün seç</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Adults */}
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="validationLabel">Yetişkin</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={(val) => field.onChange(String(val))}
                      >
                        <SelectTrigger className="w-full bg-orange-400 text-white">
                          <SelectValue placeholder="Adults" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(6)].map((_, i) => (
                            <SelectItem key={i} value={String(i + 1)}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Children */}
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="validationLabel">Çocuk</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full bg-orange-400 text-white ">
                          <SelectValue placeholder="Children" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(7)].map((_, i) => (
                            <SelectItem key={i} value={String(i)}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="submit"
                className="col-span-1 md:col-span-4 bg-orange-400 text-white "
              >
                Uygun oda bul
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {availableRooms.length > 0 && (
  <div className="lg:mt-32 mt-10 w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold text-center mb-4">
      Uygun Odalar
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {availableRooms.map((room) => (
        <div
          key={room.id}
          className="border p-4 rounded-lg shadow-md bg-gray-100"
        >
          <Image
            src={`http://127.0.0.1:8000${room.image}`}
            alt={room.name}
            width={500}
            height={400}
            className="h-60 w-full object-cover"
          />
          <h3 className="text-lg font-bold mt-2">{room.name}</h3>
          <p className="text-sm text-gray-700">{room.description}</p>
          <p className="text-md font-semibold mt-1">
            {room.price}₺ / gece
          </p>
          <Button
            onClick={() => makeReservation(room)}
            className="mt-2 bg-orange-500 text-white w-full"
          >
            Rezervasyon Yap
          </Button>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default Reservationpage;
