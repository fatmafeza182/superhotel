"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Adiniz en az 2 karakter olmalidir.",
  }).max(50, {
    message: "Adiniz en fazla 50 karakter olabilir.",
  }),

  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),

  phone: z.string().regex(/^\+?\d{10,15}$/, {
    message: "Geçerli bir telefon numarasi giriniz. (+90 dahil edebilirsiniz)",
  }),

  message: z.string().min(10, {
    message: "Mesaj en az 10 karakter olmaiıdir.",
  }).max(500, {
    message: "Mesaj en fazla 500 karakter olabilir.",
  }),
});
function onSubmit(values: z.infer<typeof formSchema>,reset:()=> void) {
localStorage.setItem("contactForm",JSON.stringify(values))
reset();
  console.log(values)
}
const Contactpage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      phone:"",
      message:"",
    },
  })
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/6.jpg')", backgroundSize: "cover" }} 
    >
      <div className="text-center bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-white text-3xl font-bold">Ulaşmaniz İçin Buradayiz</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => {
              onSubmit(data, form.reset); 
            })} className="space-y-8 mt-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Adiniz Soyadiniz</FormLabel>
              <FormControl>
                <Input value={form.username || ""} placeholder="adiniz soyadiniz" {...field} />
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
              <FormLabel className="text-white">Email Adresiniz</FormLabel>
              <FormControl>
                <Input placeholder="example@hmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Telefon Numaraniz</FormLabel>
              <FormControl>
                <Input placeholder="+90" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Mesajiniz</FormLabel>
              <FormControl>
                <Input placeholder="mesajiniz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="myButton">Gönder</Button>
      </form>
    </Form>
      </div>
    </div>
  );
}

export default Contactpage;
