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
} from "../ui/select";

interface AddManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddManagerDialog({
  open,
  onOpenChange,
}: AddManagerDialogProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData((prev) => {
      return {
        MaNQL: "",
        NgayKhoiTao: "",
        HoTen: "",
        SoDienThoai: "",
        Email: "",
        TenDangNhap: "",
        MatKhau: "",
        VaiTro: "",
        TrangThai: "",
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            THÊM NGƯỜI QUẢN LÝ
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
                <SelectItem value="Không hoạt động">Không hoạt động</SelectItem>
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
