"use client";

import { useState } from "react";
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

interface AddContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddContractDialog({
  open,
  onOpenChange,
}: AddContractDialogProps) {
  const [formData, setFormData] = useState({
    MaHopDong: "",
    NgayKyHopDong: "",
    NgayBatDau: "",
    NgayKetThuc: "",
    GiaThue: 0,
    TienDatCoc: 0,
    SoLuongKhach: 0,
    TinhTrangHopDong: "",
    MaBDS: "",
    MaKhachThue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData((prev) => {
      return {
        MaHopDong: "",
        NgayKyHopDong: "",
        NgayBatDau: "",
        NgayKetThuc: "",
        GiaThue: 0,
        TienDatCoc: 0,
        SoLuongKhach: 0,
        TinhTrangHopDong: "",
        MaBDS: "",
        MaKhachThue: "",
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            THÊM HỢP ĐỒNG THUÊ
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 overflow-y-auto pr-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="date">
              Ngày ký hợp đồng <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              value={formData.NgayKyHopDong}
              onChange={(e) =>
                setFormData({ ...formData, NgayKyHopDong: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="start">
              Ngày bắt đầu <span className="text-red-500">*</span>
            </Label>
            <Input
              id="start"
              value={formData.NgayBatDau}
              onChange={(e) =>
                setFormData({ ...formData, NgayBatDau: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="end">
              Ngày kết thúc <span className="text-red-500">*</span>
            </Label>
            <Input
              id="end"
              value={formData.NgayKetThuc}
              onChange={(e) =>
                setFormData({ ...formData, NgayKetThuc: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Giá thuê</Label>
            <Input
              id="price"
              value={formData.GiaThue}
              onChange={(e) =>
                setFormData({ ...formData, GiaThue: +e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dep">Tiền đặt cọc</Label>
            <Input
              id="dep"
              value={formData.TienDatCoc}
              onChange={(e) =>
                setFormData({ ...formData, TienDatCoc: +e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="no">Số lượng khách</Label>
            <Input
              id="no"
              value={formData.SoLuongKhach}
              onChange={(e) =>
                setFormData({ ...formData, SoLuongKhach: +e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">
              Tình trạng hợp đồng <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.TinhTrangHopDong}
              onValueChange={(value) =>
                setFormData({ ...formData, TinhTrangHopDong: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Chọn tình trạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="0" value="Hiệu lực">
                  Hiệu lực
                </SelectItem>
                <SelectItem key="1" value="Hết hạn">
                  Hết hạn
                </SelectItem>
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
      </DialogContent>
    </Dialog>
  );
}
