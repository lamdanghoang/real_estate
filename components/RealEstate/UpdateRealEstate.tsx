"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
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

interface UpdatePropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyData?: any; // Replace with proper type
}

export function UpdatePropertyDialog({
  open,
  onOpenChange,
  propertyData,
}: UpdatePropertyDialogProps) {
  const [formData, setFormData] = useState({
    propertyType: "house",
    address:
      "123 Đường Phạm Phú Thứ, Phường Hiệp Tân, Quận Tân Phú, TP. Hồ Chí Minh",
    area: "70 m2",
    price: "15.000.000",
    status: "Đang cho thuê",
    code: "BDS0001",
    location: "Khu phố 2 (Đây chính là thông tin địa chỉ giá BĐS chi tiết)",
    size: "10.775m²",
    district: "Quận Tân Phú",
    sector: "Ngành Văn A",
  });

  useEffect(() => {
    if (propertyData) {
      setFormData(propertyData);
    }
  }, [propertyData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
            <Label htmlFor="code">Mô tả</Label>
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
              Vĩ độ <span className="text-red-500">*</span>
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
              Kinh độ <span className="text-red-500">*</span>
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
                <SelectItem value="district1">Quận Tân Phú</SelectItem>
                <SelectItem value="district2">Quận 2</SelectItem>
                <SelectItem value="district3">Quận 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sector">
              Tên người quản lý <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.sector}
              onValueChange={(value) =>
                setFormData({ ...formData, sector: value })
              }
            >
              <SelectTrigger id="sector">
                <SelectValue placeholder="Chọn nguời quản lý" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sector1">Ng. Văn A</SelectItem>
                <SelectItem value="sector2">Ng. 2</SelectItem>
                <SelectItem value="sector3">Ng. 3</SelectItem>
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
