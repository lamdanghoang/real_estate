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
import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/store";
import { StaffManager } from "@/constants/types";
import toast from "react-hot-toast";

const FormSchema = z.object({
  TenDangNhap: z.string().min(2, {
    message: "Vui lòng nhập tên người dùng.",
  }),
  MatKhau: z.string().min(2, {
    message: "Vui lòng nhập mật khẩu.",
  }),
});

export default function Login() {
  const { setIsConnected, setIsOwner } = useContext(GlobalContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      TenDangNhap: "",
      MatKhau: "",
    },
  });
  const router = useRouter();
  const [staffs, setStaffs] = useState<StaffManager[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/nguoiquanly/danhsach",
          {
            method: "GET", // Explicitly set method
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json", // Add Accept header
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setStaffs(result);
      } catch (error) {
        console.error("Fetching districts failed:", error);
      }
    };

    fetchData();
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const role = checkValid(staffs, data);
    if (role) {
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        router.push("/manage");
        setIsConnected(true);
        role.VaiTro === "Chủ sở hữu" && setIsOwner(true);
      }, 500);
    } else {
      toast.error("Sai thông tin đăng nhập. Vui lòng thử lại!");
    }
  }
  return (
    <div className="m-auto p-5 w-1/3 bg-[#DCDDD3] flex flex-col items-center border">
      <h3 className="mb-5 text-[#333333] text-xl font-bold">ĐĂNG NHẬP</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="TenDangNhap"
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
            name="MatKhau"
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
          <div className="flex gap-2 justify-end">
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
            <Button
              type="button"
              variant="outline"
              className="bg-[#F1E7CB] hover:bg-[#F1E7CB]/50"
              onClick={() => form.reset(undefined, { keepValues: false })}
            >
              LÀM MỚI
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function checkValid(
  list: StaffManager[],
  info: { TenDangNhap: string; MatKhau: string }
) {
  const staff = list.find((item) => {
    return (
      item.TenDangNhap === info.TenDangNhap && item.MatKhau === info.MatKhau
    );
  });

  return staff;
}
