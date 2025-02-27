"use client";
import React from "react";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const today = new Date();
today.setHours(0, 0, 0, 0);

const formSchema = z
  .object({
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

const HeroForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arrivalDate: undefined,
      departureDate: undefined,
      adults: "1",
      children: "0",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...data,
      adults: Number(data.adults), 
      children: Number(data.children),
    };
    console.log("Form Data:", formattedData);
  };
  
  return (
    <div className="absolute w-full -bottom-56  flex justify-center">
        <div className="flex container mx-auto justify-center "> 
        <div className="sticky bottom-0 w-full bg-gray-700 p-6 shadow-lg bg-opacity-50"> 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {/* Arrival Date */}
          <FormField
            control={form.control}
            name="arrivalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="validationLabel">Arrival Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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

          {/* Departure Date */}
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="validationLabel">Departure Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                <FormLabel className="validationLabel">Adults</FormLabel>
                <FormControl>
                  <Select value={String(field.value)}  onValueChange={(val) => field.onChange(String(val))}>
                    <SelectTrigger className="w-full">
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
                <FormLabel className="validationLabel">Children</FormLabel>
                <FormControl>
                  <Select value={field.value } onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
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

          <Button onClick={(()=>router.push('/rooms'))} variant="outline" type="submit" className="col-span-1 md:col-span-4">
            Oda Ara
          </Button>
        </form>
      </Form>
      
    </div>
    </div>
    </div>
  );
};

export default HeroForm;
