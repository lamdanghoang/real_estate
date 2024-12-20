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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { District, StaffManager } from "@/constants/types";
import { useEffect } from "react";
import toast from "react-hot-toast";

const FormSchema = z.object({
  LoaiBDS: z.string().min(2, {
    message: "Vui lòng chọn loại bất động sản.",
  }),
  DiaChi: z.string().min(1, {
    message: "Vui lòng nhập địa chỉ.",
  }),
  DienTich: z.string().refine(
    (value) => {
      if (!value) return true;
      return !isNaN(parseFloat(value));
    },
    {
      message: "Diện tích phải là một số hợp lệ.",
    }
  ),
  GiaThueTheoThang: z.string().refine(
    (value) => {
      if (!value) return true;
      return !isNaN(parseFloat(value));
    },
    {
      message: "Giá thuê phải là một số hợp lệ.",
    }
  ),
  TrangThai: z.string().min(2, {
    message: "Vui lòng chọn trạng thái.",
  }),
  MoTa: z.string().optional(),
  ViDo: z
    .string()
    .min(1, {
      message: "Vui lòng nhập vĩ độ.",
    })
    .refine(
      (value) => {
        if (!value) return true;
        return !isNaN(parseFloat(value));
      },
      {
        message: "Vĩ độ không hợp lệ.",
      }
    ),
  KinhDo: z
    .string()
    .min(1, {
      message: "Vui lòng nhập kinh độ.",
    })
    .refine(
      (value) => {
        if (!value) return true;
        return !isNaN(parseFloat(value));
      },
      {
        message: "Kinh độ không hợp lệ.",
      }
    ),
  MaNQL: z.string().min(2, {
    message: "Vui lòng chọn người quản lý.",
  }),
  MaDVHC: z.string().min(2, {
    message: "Vui lòng chọn quận/huyện.",
  }),
});

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  districts: District[];
  staffs: StaffManager[];
}

export function AddPropertyDialog({
  open,
  onOpenChange,
  districts,
  staffs,
}: AddPropertyDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      LoaiBDS: "",
      DiaChi: "",
      DienTich: "",
      GiaThueTheoThang: "",
      TrangThai: "Chưa cho thuê",
      MoTa: "",
      MaNQL: "",
      MaDVHC: "",
      ViDo: "",
      KinhDo: "",
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
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          form.reset(undefined, { keepValues: false });
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            THÊM BẤT ĐỘNG SẢN
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 overflow-y-auto pr-2"
          >
            <FormField
              control={form.control}
              name="LoaiBDS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Loại bất động sản <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại bất động sản" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Nhà ở">Nhà ở</SelectItem>
                      <SelectItem value="Kho xưởng">Kho xưởng</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="DiaChi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Địa chỉ <span className="text-red-500">*</span>
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
              name="DienTich"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Diện tích (m²) <span className="text-red-500">*</span>
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
              name="GiaThueTheoThang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Giá thuê (VNĐ) <span className="text-red-500">*</span>
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
                      <SelectItem value="Chưa cho thuê">
                        Chưa cho thuê
                      </SelectItem>
                      <SelectItem value="Đang cho thuê">
                        Đang cho thuê
                      </SelectItem>
                      <SelectItem value="Không hoạt động">
                        Không hoạt động
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="MoTa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ViDo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vĩ độ <span className="text-red-500">*</span>
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
              name="KinhDo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Kinh độ <span className="text-red-500">*</span>
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
              name="MaDVHC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên quận/huyện <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((dis) => (
                        <SelectItem key={dis.MaDVHC} value={dis.MaDVHC}>
                          {dis.TenDVHC}
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
              name="MaNQL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên người quản lý <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn người quản lý" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {staffs.map((staff: StaffManager) => (
                        <SelectItem key={staff.MaNQL} value={staff.MaNQL}>
                          {staff.HoTen}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-2 mt-4 sticky bottom-0 bg-background pt-2 ">
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
    const response = await fetch("http://localhost:3003/batdongsan/them", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Bất động sản mới đã được thêm thành công!");
    }
  } catch (error) {
    console.error("Error", error);
  }
};
