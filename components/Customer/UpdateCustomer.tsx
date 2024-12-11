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
import { Customer } from "@/constants/types";

interface UpdateCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerData?: Customer; // Replace with proper type
}

export function UpdateCustomerDialog({
  open,
  onOpenChange,
  customerData,
}: UpdateCustomerDialogProps) {
  const [formData, setFormData] = useState({
    MaKhachThue: "",
    TenKhachThue: "",
    SoCCCD: "",
    SoDienThoai: "",
    Email: "",
  });

  useEffect(() => {
    if (customerData) {
      setFormData(customerData);
    }
  }, [customerData]);

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
            CẬP NHẬT KHÁCH THUÊ
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 overflow-y-auto pr-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">
              Tên khách <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.TenKhachThue}
              onChange={(e) =>
                setFormData({ ...formData, TenKhachThue: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cccd">
              Số CCCD <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cccd"
              value={formData.SoCCCD}
              onChange={(e) =>
                setFormData({ ...formData, SoCCCD: e.target.value })
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
