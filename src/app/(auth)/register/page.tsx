"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { MdOutlineHotelClass } from "react-icons/md";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(2, "İsim en az 2 karakter olmalidir."),
    username: z.string().min(2, "İsim en az 2 karakter olmalidir."),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
    passwordConfirm: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirm"],
  });

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State yönetimi eklendi

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      username:"",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Butonu devre dışı bırak
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const token = data.accessToken;
        if(token){
          localStorage.setItem("accessToken",token)
        }
        alert("Kayit başarili! Giriş sayfasina yönlendiriliyorsunuz.");
        router.push("login/"); // Kayıt başarılıysa login sayfasına yönlendir
      } else {
        alert(data.error || "Kayit başarisiz!");
      }
    } catch (error) {
      console.error("Kayit sirasinda hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false); // Butonu tekrar aktif hale getir
    }
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center mt-10 w-full">
      <h1 className="font-serif font-bold flex flex-row text-orange-500 text-2xl mb-10">
        <MdOutlineHotelClass size={30} />
        <span>HOTELGLORY</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orange-500 text-2xl">
                  İsminizi giriniz
                </FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="İsim" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orange-500 text-2xl">
                 Kullanici adinizi giriniz
                </FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="kullanici" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orange-500 text-2xl">
                  Email adresinizi giriniz
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[500px]"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orange-500 text-2xl">
                  Şifrenizi giriniz
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orange-500 text-2xl">
                  Şifrenizi tekrar giriniz
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full justify-center text-center bg-orange-500 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Loading
              </>
            ) : (
              <>Register</>
            )}
          </Button>
        </form>
        <div className="mt-8">
          <Label className="flex flex-col items-center">
            Zaten bir hesabiniz var mi?
          </Label>
          <Link href="/auth/login" className="mt-2 text-slate-500">
            Tiklayip giriş yapabilirsiniz
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
