"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AddContractDialog } from "./AddInvoice";
import { UpdateInvoiceDialog } from "./UpdateInvoice";
import { DeleteInvoiceDialog } from "./DeleteInvoice";
import { Contract, Invoice } from "@/constants/types";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function ContractTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[] | []>([]);
  const [contracts, setContracts] = useState<Contract[] | []>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>(
    undefined
  );
  const [isReload, setIsReload] = useState(false);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = DATA.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:3003/hoadon/danhsach", {
          method: "GET", // Explicitly set method
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Add Accept header
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setInvoices(result);
      } catch (error) {
        console.error("Fetching invoice failed:", error);
      }
    };
    const fetchContracts = async () => {
      try {
        const response = await fetch("http://localhost:3003/hopdong/danhsach", {
          method: "GET", // Explicitly set method
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Add Accept header
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setContracts(result);
      } catch (error) {
        console.error("Fetching contract failed:", error);
      }
    };

    fetchInvoices();
    fetchContracts();
  }, [isReload]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clickHandler = (inv: Invoice) => {
    setSelectedInvoice((prev) => {
      return {
        ...prev,
        ...inv,
        NgayLapHoaDon: format(new Date(inv.NgayLapHoaDon), "dd/MM/yyyy"),
        NgayHetHan: format(new Date(inv.NgayHetHan), "dd/MM/yyyy"),
        NgayThanhToanThucTe: format(
          new Date(inv.NgayThanhToanThucTe),
          "dd/MM/yyyy"
        ),
      };
    });
  };

  const updateClickHandler = () => {
    if (selectedInvoice) {
      setIsUpdateDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a invoice to update");
    }
  };

  const deleteClickHandler = () => {
    if (selectedInvoice) {
      setIsDeleteDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a invoice to delete");
    }
  };

  const deleteConfirmHandler = () => {
    // Handle the delete operation here
    console.log("Deleting invoice:", selectedInvoice?.MaHoaDon);
    if (selectedInvoice) {
      deleteData(selectedInvoice.MaHoaDon);
    }
    setSelectedInvoice(undefined);
  };

  const reload = () => {
    setIsReload(!isReload);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <h1 className="font-bold text-2xl text-center mb-4">
        DANH SÁCH HÓA ĐƠN THANH TOÁN
      </h1>
      <div className="p-1 flex-1 overflow-auto bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="min-w-[120px]">Mã hóa đơn</TableHead>
              <TableHead className="min-w-[120px]">Ngày lập</TableHead>
              <TableHead className="min-w-[120px]">Ngày hết hạn</TableHead>
              <TableHead className="min-w-[150px]">Số tiền (VNĐ)</TableHead>
              <TableHead className="min-w-[150px]">
                Ngày thanh toán thực tế
              </TableHead>
              <TableHead className="min-w-[180px]">
                Trạng thái thanh toán
              </TableHead>
              <TableHead className="min-w-[150px]">
                Phương thức thanh toán
              </TableHead>
              <TableHead className="min-w-[120px]">Mã hợp đồng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((item: Invoice) => (
              <TableRow
                key={item.MaHoaDon}
                onClick={() => clickHandler(item)}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedInvoice?.MaHoaDon === item.MaHoaDon
                    ? "bg-blue-100"
                    : ""
                }`}
              >
                <TableCell className="font-medium">{item.MaHoaDon}</TableCell>
                <TableCell>
                  {format(new Date(item.NgayLapHoaDon), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(item.NgayHetHan), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(item.SoTien)}
                </TableCell>
                <TableCell>
                  {format(new Date(item.NgayThanhToanThucTe), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${
                      item.TrangThaiThanhToan === "Đã thanh toán"
                        ? "bg-green-100 text-green-800"
                        : item.TrangThaiThanhToan === "Quá hạn"
                        ? "bg-gray-600 text-gray-200"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.TrangThaiThanhToan}
                  </Badge>
                </TableCell>
                <TableCell>{item.PhuongThucThanhToan}</TableCell>
                <TableCell>{item.MaHopDong}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mx-auto p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={() => setIsAddDialogOpen(true)}
          >
            THÊM
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={updateClickHandler}
            disabled={!selectedInvoice}
          >
            CẬP NHẬT
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={deleteClickHandler}
            disabled={!selectedInvoice}
          >
            XÓA
          </Button>
          <Button
            variant="outline"
            onClick={reload}
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
          >
            TẢI LẠI DANH SÁCH
          </Button>
        </div>
      </div>
      <AddContractDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        contracts={contracts}
      />
      <UpdateInvoiceDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        invoiceData={selectedInvoice}
        contracts={contracts}
      />
      <DeleteInvoiceDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
}

const deleteData = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3003/hoadon/xoa/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Xóa thành công!");
      toast.success("Xóa thành công!");
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
