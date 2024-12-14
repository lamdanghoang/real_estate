"use client";

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
import { useEffect, useState } from "react";
import { Customer, RealEstate } from "@/constants/types";
import toast from "react-hot-toast";

const FormSchema = z.object({
  NgayKyHopDong: z.string().min(1, "Vui lòng nhập ngày ký hợp đồng."),
  NgayBatDau: z.string().min(1, "Vui lòng nhập ngày bắt đầu."),
  NgayKetThuc: z.string().min(1, "Vui lòng nhập ngày kết thúc."),
  GiaThue: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return !isNaN(parseFloat(value));
      },
      {
        message: "Giá thuê phải là một số hợp lệ.",
      }
    ),
  TienDatCoc: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return !isNaN(parseFloat(value));
      },
      {
        message: "Tiền đặt cọc phải là một số hợp lệ.",
      }
    ),
  SoLuongKhach: z
    .number()
    .nonnegative("Số lượng khách không được âm.")
    .int("Số lượng khách phải là số nguyên."),
  TinhTrangHopDong: z.string().min(1, "Vui lòng chọn tình trạng hợp đồng."),
  MaBDS: z.string().min(1, "Vui lòng chọn mã bất động sản."),
  MaKhachThue: z.string().min(1, "Vui lòng chọn mã khách thuê."),
});

interface AddContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddContractDialog({
  open,
  onOpenChange,
}: AddContractDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      NgayKyHopDong: "",
      NgayBatDau: "",
      NgayKetThuc: "",
      GiaThue: "",
      TienDatCoc: "",
      SoLuongKhach: 0,
      TinhTrangHopDong: "",
      MaBDS: "",
      MaKhachThue: "",
    },
    resetOptions: {
      keepDirtyValues: false,
    },
  });
  const [properties, setProperties] = useState<RealEstate[] | []>([]);
  const [customers, setCustomers] = useState<Customer[] | []>([]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Handle form submission
    toast.success("Hợp đồng mới đã được thêm thành công!");
    console.log(data);
    onOpenChange(false);
  };

  const handleReset = () => {
    form.reset(undefined, { keepValues: false });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/batdongsan/danhsach",
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
        setProperties(result);
      } catch (error) {
        console.error("Fetching properties failed:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/khachthue/danhsach",
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
        setCustomers(result);
      } catch (error) {
        console.error("Fetching customers failed:", error);
      }
    };

    fetchCustomers();
    fetchProperties();
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          handleReset();
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            THÊM HỢP ĐỒNG THUÊ
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 overflow-y-auto pr-2"
          >
            <FormField
              control={form.control}
              name="NgayKyHopDong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NgayKyHopDong">
                    Ngày ký hợp đồng <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="NgayKyHopDong" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="NgayBatDau"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NgayBatDau">
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="NgayBatDau" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="NgayKetThuc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NgayKetThuc">
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="NgayKetThuc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GiaThue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="GiaThue">Giá thuê</FormLabel>
                  <FormControl>
                    <Input id="GiaThue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TienDatCoc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="TienDatCoc">Tiền đặt cọc</FormLabel>
                  <FormControl>
                    <Input id="TienDatCoc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SoLuongKhach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="SoLuongKhach">Số lượng khách</FormLabel>
                  <FormControl>
                    <Input
                      id="SoLuongKhach"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TinhTrangHopDong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="TinhTrangHopDong">
                    Tình trạng hợp đồng <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="TinhTrangHopDong">
                        <SelectValue placeholder="Chọn tình trạng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hiệu lực">Hiệu lực</SelectItem>
                      <SelectItem value="Hết hạn">Hết hạn</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="MaBDS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="MaBDS">
                    Mã bất động sản <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="MaBDS">
                        <SelectValue placeholder="Chọn mã bất động sản" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((item) => (
                        <SelectItem key={item.MaBDS} value={item.MaBDS || ""}>
                          {item.MaBDS}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="MaKhachThue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="MaKhachThue">
                    Mã khách thuê <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="MaKhachThue">
                        <SelectValue placeholder="Chọn mã khách thuê" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((item) => (
                        <SelectItem
                          key={item.MaKhachThue}
                          value={item.MaKhachThue}
                        >
                          {item.MaKhachThue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-2 mt-4 sticky bottom-0 bg-background pt-2 border-t">
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
                onClick={handleReset}
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
