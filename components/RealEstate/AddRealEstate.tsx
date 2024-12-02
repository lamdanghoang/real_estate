"use client";

import { useState } from "react";
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

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPropertyDialog({
  open,
  onOpenChange,
}: AddPropertyDialogProps) {
  const [formData, setFormData] = useState({
    propertyType: "",
    address: "",
    area: "",
    price: "",
    status: "",
    code: "",
    location: "",
    size: "",
    district: "",
    sector: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      propertyType: "",
      address: "",
      area: "",
      price: "",
      status: "",
      code: "",
      location: "",
      size: "",
      district: "",
      sector: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            THÊM BẤT ĐỘNG SẢN
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
              value={formData.propertyType}
              onValueChange={(value) =>
                setFormData({ ...formData, propertyType: value })
              }
            >
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Chọn loại bất động sản" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">Nhà ở</SelectItem>
                <SelectItem value="apartment">Căn hộ</SelectItem>
                <SelectItem value="land">Đất nền</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">
              Địa chỉ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="area">
              Diện tích <span className="text-red-500">*</span>
            </Label>
            <Input
              id="area"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Giá thuê</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">
              Trạng thái <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Đang bán</SelectItem>
                <SelectItem value="rented">Đã cho thuê</SelectItem>
                <SelectItem value="sold">Đã bán</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="code">Mã số</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">
              Vị trí <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="size">
              Kích đô <span className="text-red-500">*</span>
            </Label>
            <Input
              id="size"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="district">
              Tên quận/huyện <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.district}
              onValueChange={(value) =>
                setFormData({ ...formData, district: value })
              }
            >
              <SelectTrigger id="district">
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="district1">Quận 1</SelectItem>
                <SelectItem value="district2">Quận 2</SelectItem>
                <SelectItem value="district3">Quận 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sector">
              Tên ngành/quận lý <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.sector}
              onValueChange={(value) =>
                setFormData({ ...formData, sector: value })
              }
            >
              <SelectTrigger id="sector">
                <SelectValue placeholder="Chọn ngành/quận lý" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sector1">Ngành 1</SelectItem>
                <SelectItem value="sector2">Ngành 2</SelectItem>
                <SelectItem value="sector3">Ngành 3</SelectItem>
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
