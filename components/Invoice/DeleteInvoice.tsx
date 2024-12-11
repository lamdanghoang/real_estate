"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteInvoiceDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            XÓA HÓA ĐƠN THANH TOÁN
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-center text-muted-foreground">
            Bạn có thật sự muốn xóa hóa đơn thanh toán này?
          </p>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            className="bg-[#DCAE43] hover:bg-[#DCAE43]/80 px-10"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Có
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-8 bg-[#ECDC9B] hover:bg-[#ECDC9B]/50"
          >
            Không
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
