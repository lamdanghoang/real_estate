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
import { StaffManager } from "@/constants/types";
import toast from "react-hot-toast";

interface UpdateManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffData?: StaffManager; // Replace with proper type
}

export function UpdateManagerDialog({
  open,
  onOpenChange,
  staffData,
}: UpdateManagerDialogProps) {
  const [formData, setFormData] = useState({
    MaNQL: "",
    NgayKhoiTao: "",
    HoTen: "",
    SoDienThoai: "",
    Email: "",
    TenDangNhap: "",
    MatKhau: "",
    VaiTro: "",
    TrangThai: "",
  });

  useEffect(() => {
    if (staffData) {
      setFormData((prev) => {
        return { ...prev, ...staffData };
      });
    }
  }, [staffData]);

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
            CẬP NHẬT NGƯỜI QUẢN LÝ
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 overflow-y-auto pr-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="date">
              Ngày khởi tạo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              value={formData.NgayKhoiTao}
              onChange={(e) =>
                setFormData({ ...formData, NgayKhoiTao: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">
              Tên người quản lý <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.HoTen}
              onChange={(e) =>
                setFormData({ ...formData, HoTen: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">
              Điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              value={formData.SoDienThoai}
              onChange={(e) =>
                setFormData({ ...formData, SoDienThoai: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">
              Tên đăng nhập <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              value={formData.TenDangNhap}
              onChange={(e) =>
                setFormData({ ...formData, TenDangNhap: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="code">
              Mật khẩu <span className="text-red-500">*</span>
            </Label>
            <Input
              id="code"
              value={formData.MatKhau}
              onChange={(e) =>
                setFormData({ ...formData, MatKhau: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">
              Vai trò <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.VaiTro}
              onValueChange={(value) =>
                setFormData({ ...formData, VaiTro: value })
              }
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chủ sở hữu">Chủ sở hữu</SelectItem>
                <SelectItem value="Nhân viên quản lý">
                  Nhân viên quản lý
                </SelectItem>
              </SelectContent>
            </Select>
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
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                <SelectItem value="Ngừng hoạt động">Ngừng hoạt động</SelectItem>
                <SelectItem value="Bị khóa">Bị khóa</SelectItem>
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
  MaNQL: string;
  NgayKhoiTao: string;
  HoTen: string;
  SoDienThoai: string;
  Email: string;
  TenDangNhap: string;
  MatKhau: string;
  VaiTro: string;
  TrangThai: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3003/nguoiquanly/sua/${formData.MaNQL}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("Người quản lý đã được cập nhật thành công!");
      toast.success("Thông tin người quản lý đã được cập nhật thành công!");
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
