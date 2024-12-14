"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { District, RealEstate, StaffManager } from "@/constants/types";
import toast from "react-hot-toast";

interface UpdatePropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyData?: RealEstate;
  districts: District[];
  staffs: StaffManager[];
}

export function UpdatePropertyDialog({
  open,
  onOpenChange,
  propertyData,
  districts,
  staffs,
}: UpdatePropertyDialogProps) {
  const [formData, setFormData] = useState<RealEstate>({
    LoaiBDS: "",
    DiaChi: "",
    DienTich: 0,
    GiaThueTheoThang: 0,
    TrangThai: "",
    MoTa: "",
    MaNQL: "",
    MaDiem: "",
    MaDVHC: "",
    HoTen: "",
    TenDVHC: "",
    KinhDo: 0,
    ViDo: 0,
  });

  useEffect(() => {
    if (propertyData) {
      setFormData((prev) => {
        return { ...propertyData };
      });
    }
  }, [propertyData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast.success("Thông tin bất động sản đã được cập nhật thành công!");
    console.log(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            CẬP NHẬT BẤT ĐỘNG SẢN
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 overflow-y-auto pr-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="propertyType">
              Loại bất động sản <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.LoaiBDS}
              onValueChange={(value) =>
                setFormData({ ...formData, LoaiBDS: value })
              }
            >
              <SelectTrigger id="propertyType">
                <SelectValue placeholder={formData.LoaiBDS} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nhà ở">Nhà ở</SelectItem>
                <SelectItem value="Kho xưởng">Kho xưởng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">
              Địa chỉ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={formData.DiaChi}
              onChange={(e) =>
                setFormData({ ...formData, DiaChi: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="area">
              Diện tích <span className="text-red-500">*</span>
            </Label>
            <Input
              id="area"
              value={formData.DienTich}
              onChange={(e) =>
                setFormData({ ...formData, DienTich: +e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Giá thuê (VNĐ)</Label>
            <Input
              id="price"
              value={formData.GiaThueTheoThang}
              onChange={(e) =>
                setFormData({ ...formData, GiaThueTheoThang: +e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">
              Trạng thái <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.TrangThai}
              onValueChange={(value) =>
                setFormData({ ...formData, TrangThai: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder={formData.TrangThai} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Đã cho thuê">Đã cho thuê</SelectItem>
                <SelectItem value="Chưa cho thuê">Chưa cho thuê</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desc">Mô tả</Label>
            <Input
              id="desc"
              value={formData.MoTa}
              onChange={(e) =>
                setFormData({ ...formData, MoTa: e.target.value })
              }
            />
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="location">
              Vĩ độ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={formData.x}
              onChange={(e) => setFormData({ ...formData, x: +e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="size">
              Kinh độ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="size"
              value={formData.y}
              onChange={(e) => setFormData({ ...formData, y: +e.target.value })}
            />
          </div> */}

          <div className="grid gap-2">
            <Label htmlFor="district">
              Tên quận/huyện <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.MaDVHC}
              onValueChange={(value) =>
                setFormData({ ...formData, MaDVHC: value })
              }
            >
              <SelectTrigger id="district">
                <SelectValue placeholder={formData.TenDVHC} />
              </SelectTrigger>
              <SelectContent>
                {districts.map((dis) => (
                  <SelectItem key={dis.MaDVHC} value={dis.MaDVHC}>
                    {dis.TenDVHC}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sector">
              Tên người quản lý <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.MaNQL}
              onValueChange={(value) =>
                setFormData({ ...formData, MaNQL: value })
              }
            >
              <SelectTrigger id="sector">
                <SelectValue placeholder={formData.HoTen} />
              </SelectTrigger>
              <SelectContent>
                {staffs.map((staff) => (
                  <SelectItem key={staff.MaNQL} value={staff.MaNQL}>
                    {staff.HoTen}
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
