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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

const FormSchema = z.object({
  TenKhachThue: z.string().min(1, "Vui lòng nhập tên khách thuê."),
  SoCCCD: z.string().min(1, "Vui lòng nhập số CCCD."),
  SoDienThoai: z.string().min(1, "Vui lòng nhập số điện thoại."),
  Email: z
    .string()
    .email("Vui lòng nhập email hợp lệ.")
    .optional()
    .or(z.literal("")),
});

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCustomerDialog({
  open,
  onOpenChange,
}: AddCustomerDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      TenKhachThue: "",
      SoCCCD: "",
      SoDienThoai: "",
      Email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Handle form submission
    // toast.success("Khách thuê mới đã được thêm thành công!");
    console.log(data);
    postData(data);
    onOpenChange(false);
  };
  console.log("Sending data:", postData);

  const handleReset = () => {
    form.reset(undefined, { keepValues: false });
  };

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
            THÊM KHÁCH THUÊ
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 overflow-y-auto pr-2"
          >
            <FormField
              control={form.control}
              name="TenKhachThue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="TenKhachThue">
                    Tên khách <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="TenKhachThue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SoCCCD"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="SoCCCD">
                    Số CCCD <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="SoCCCD" {...field} />
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
                  <FormLabel htmlFor="SoDienThoai">
                    Điện thoại <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="SoDienThoai" {...field} />
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
                  <FormLabel htmlFor="Email">Email</FormLabel>
                  <FormControl>
                    <Input id="Email" {...field} />
                  </FormControl>
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

const postData = async (formData: z.infer<typeof FormSchema>) => {
  try {
    const response = await fetch("http://localhost:3003/khachthue/them", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Khách thuê đã được thêm thành công");
      toast.success("Khách thuê mới đã được thêm thành công!");
    }
  } catch (error) {
    console.error("Error", error);
  }
};
