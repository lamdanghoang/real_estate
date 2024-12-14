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
import { Contract } from "@/constants/types";
import toast from "react-hot-toast";

const FormSchema = z.object({
  NgayLapHoaDon: z.string().min(1, "Vui lòng nhập ngày lập hóa đơn."),
  NgayHetHan: z.string().min(1, "Vui lòng nhập ngày hết hạn."),
  SoTien: z
    .string()
    .min(1, {
      message: "Vui lòng nhập số tiền.",
    })
    .refine(
      (value) => {
        if (!value) return true;
        return !isNaN(parseFloat(value));
      },
      {
        message: "Số tiền không hợp lệ.",
      }
    ),
  NgayThanhToanThucTe: z.string().optional(),
  TrangThaiThanhToan: z.string().min(1, "Vui lòng chọn trạng thái thanh toán."),
  PhuongThucThanhToan: z.string().optional(),
  MaHopDong: z.string().min(1, "Vui lòng chọn mã hợp đồng."),
});

interface AddContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contracts: Contract[];
}

export function AddContractDialog({
  open,
  onOpenChange,
  contracts,
}: AddContractDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      NgayLapHoaDon: "",
      NgayHetHan: "",
      SoTien: "",
      NgayThanhToanThucTe: "",
      TrangThaiThanhToan: "",
      PhuongThucThanhToan: "",
      MaHopDong: "",
    },
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Handle form submission
    toast.success("Hóa đơn mới đã được thêm thành công!");
    console.log(data);
    onOpenChange(false);
  };

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
            THÊM HÓA ĐƠN THANH TOÁN
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 overflow-y-auto pr-2"
          >
            <FormField
              control={form.control}
              name="NgayLapHoaDon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NgayLapHoaDon">
                    Ngày lập <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="NgayLapHoaDon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="NgayHetHan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NgayHetHan">
                    Ngày hết hạn <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="NgayHetHan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SoTien"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="SoTien">
                    Số tiền <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="SoTien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="NgayThanhToanThucTe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NgayThanhToanThucTe">
                    Ngày thanh toán thực tế
                  </FormLabel>
                  <FormControl>
                    <Input id="NgayThanhToanThucTe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TrangThaiThanhToan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="TrangThaiThanhToan">
                    Trạng thái thanh toán{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="TrangThaiThanhToan">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Đã thanh toán">
                        Đã thanh toán
                      </SelectItem>
                      <SelectItem value="Chưa thanh toán">
                        Chưa thanh toán
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="PhuongThucThanhToan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="PhuongThucThanhToan">
                    Phương thức thanh toán
                  </FormLabel>
                  <FormControl>
                    <Input id="PhuongThucThanhToan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="MaHopDong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="MaHopDong">
                    Mã hợp đồng <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="MaHopDong">
                        <SelectValue placeholder="Chọn hợp đồng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contracts.map((con: Contract) => (
                        <SelectItem key={con.MaHopDong} value={con.MaHopDong}>
                          {con.MaHopDong}
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
