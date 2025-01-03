"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contract, Invoice } from "@/constants/types";
import toast from "react-hot-toast";

interface UpdateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceData?: Invoice; // Replace with proper type
  contracts: Contract[];
}

export function UpdateInvoiceDialog({
  open,
  onOpenChange,
  invoiceData,
  contracts,
}: UpdateInvoiceDialogProps) {
  const [formData, setFormData] = useState({
    MaHoaDon: "",
    NgayLapHoaDon: "",
    NgayHetHan: "",
    SoTien: 0,
    NgayThanhToanThucTe: "",
    TrangThaiThanhToan: "",
    PhuongThucThanhToan: "",
    MaHopDong: "",
  });

  useEffect(() => {
    if (invoiceData) {
      setFormData((prev) => {
        return { ...prev, ...invoiceData };
      });
    }
  }, [invoiceData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    updateData(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            CẬP NHẬT HÓA ĐƠN THANH TOÁN
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 overflow-y-auto pr-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="date">
              Ngày lập <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              value={formData.NgayLapHoaDon}
              onChange={(e) =>
                setFormData({ ...formData, NgayLapHoaDon: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="end">
              Ngày hết hạn <span className="text-red-500">*</span>
            </Label>
            <Input
              id="end"
              value={formData.NgayHetHan}
              onChange={(e) =>
                setFormData({ ...formData, NgayHetHan: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Số tiền</Label>
            <Input
              id="price"
              value={formData.SoTien}
              onChange={(e) =>
                setFormData({ ...formData, SoTien: +e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dep">Ngày thanh toán thực tế</Label>
            <Input
              id="dep"
              value={formData.NgayThanhToanThucTe}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  NgayThanhToanThucTe: e.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">
              Trạng thái thanh toán <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.TrangThaiThanhToan}
              onValueChange={(value) =>
                setFormData({ ...formData, TrangThaiThanhToan: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder={formData.TrangThaiThanhToan} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={0} value="Đã thanh toán">
                  Đã thanh toán
                </SelectItem>
                <SelectItem key={1} value="Chưa thanh toán">
                  Chưa thanh toán
                </SelectItem>
                <SelectItem key={2} value="Quá hạn">
                  Quá hạn
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="method">Phương thức thanh toán</Label>
            <Input
              id="method"
              value={formData.PhuongThucThanhToan}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  PhuongThucThanhToan: e.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contract">
              Mã hợp đồng <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.MaHopDong}
              onValueChange={(value) =>
                setFormData({ ...formData, MaHopDong: value })
              }
            >
              <SelectTrigger id="contract">
                <SelectValue placeholder={formData.MaHopDong} />
              </SelectTrigger>
              <SelectContent>
                {contracts.map((con: Contract) => (
                  <SelectItem key={con.MaHopDong} value={con.MaHopDong}>
                    {con.MaHopDong}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const updateData = async (formData: {
  MaHoaDon: string;
  NgayLapHoaDon: string;
  NgayHetHan: string;
  SoTien: number;
  NgayThanhToanThucTe: string;
  TrangThaiThanhToan: string;
  PhuongThucThanhToan: string;
  MaHopDong: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3003/hoadon/sua/${formData.MaHoaDon}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      toast.success("Thông tin hóa đơn đã được cập nhật thành công!");
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
