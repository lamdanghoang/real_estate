"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

const FormSchema = z.object({
  NgayKhoiTao: z.string().min(2, {
    message: "Vui lòng nhập ngày khởi tạo.",
  }),
  HoTen: z.string().min(2, {
    message: "Vui lòng nhập họ tên.",
  }),
  SoDienThoai: z.string().min(2, {
    message: "Vui lòng nhập số điện thoại.",
  }),
  Email: z
    .string()
    .email({
      message: "Vui lòng nhập email hợp lệ.",
    })
    .optional()
    .or(z.literal("")),
  TenDangNhap: z.string().min(2, {
    message: "Vui lòng nhập tên đăng nhập.",
  }),
  MatKhau: z.string().min(2, {
    message: "Vui lòng nhập mật khẩu.",
  }),
  VaiTro: z.string().min(2, {
    message: "Vui lòng chọn vai trò.",
  }),
  TrangThai: z.string().min(2, {
    message: "Vui lòng chọn trạng thái.",
  }),
});

interface AddManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddManagerDialog({
  open,
  onOpenChange,
}: AddManagerDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      NgayKhoiTao: "",
      HoTen: "",
      SoDienThoai: "",
      Email: "",
      TenDangNhap: "",
      MatKhau: "",
      VaiTro: "",
      TrangThai: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Handle form submission
    console.log(data);
    postData(data);
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            THÊM NGƯỜI QUẢN LÝ
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 overflow-y-auto pr-2"
          >
            <FormField
              control={form.control}
              name="NgayKhoiTao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ngày khởi tạo <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="HoTen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên người quản lý <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SoDienThoai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Điện thoại <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TenDangNhap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>
                    Mật khẩu <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="VaiTro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vai trò <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Chủ sở hữu">Chủ sở hữu</SelectItem>
                      <SelectItem value="Nhân viên quản lý">
                        Nhân viên quản lý
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TrangThai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Trạng thái <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                      <SelectItem value="Không hoạt động">
                        Không hoạt động
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-2 mt-4 sticky bottom-0 bg-background pt-2">
              <Button
                type="submit"
                variant="outline"
                className="bg-[#DCAE43] hover:bg-[#DCAE43]/80"
              >
                Lưu lại
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-[#ECDC9B] hover:bg-[#ECDC9B]/50"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-[#F1E7CB] hover:bg-[#F1E7CB]/50"
                onClick={() => form.reset(undefined, { keepValues: false })}
              >
                Làm mới
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const postData = async (formData: z.infer<typeof FormSchema>) => {
  try {
    const response = await fetch("http://localhost:3003/nguoiquanly/them", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Người quản lý đã được thêm thành công");
      toast.success("Người quản lý mới đã được thêm thành công!");
    }
  } catch (error) {
    console.error("Error", error);
  }
};
