"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import GlobalContext from "@/context/store";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Vui lòng nhập tên người dùng.",
  }),
  password: z.string().min(2, {
    message: "Vui lòng nhập mật khẩu.",
  }),
});

export default function Login() {
  const { setIsConnected } = useContext(GlobalContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
    router.push("/");
    setIsConnected(true);
  }
  return (
    <div className="m-auto p-5 w-1/3 bg-[#DCDDD3] flex flex-col items-center border">
      <h3 className="mb-5 text-[#333333] text-xl font-bold">ĐĂNG NHẬP</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="w-72 h-7" />
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="w-72 h-7" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 justify-end">
            <Button
              type="submit"
              className="bg-[#DCAE43] text-[#333333] hover:bg-[#DCAE43]/80"
            >
              ĐĂNG NHẬP
            </Button>
            <Button
              type="reset"
              onClick={() => {
                router.push("/");
              }}
              className="bg-[#ECDC9B] text-[#333333] hover:bg-[#DCAE43]/60"
            >
              HỦY
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
