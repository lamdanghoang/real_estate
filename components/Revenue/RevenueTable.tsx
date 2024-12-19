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
import { Revenue, StaffManager } from "@/constants/types";
import { format } from "date-fns";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function RevenueTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [revenues, setRevenues] = useState<Revenue[] | []>([]);
  const [isReload, setIsReload] = useState(false);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = DATA.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch("http://localhost:3003/doanhthu", {
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
        setRevenues(result);
      } catch (error) {
        console.error("Fetching revenue failed:", error);
      }
    };

    fetchStaffs();
  }, [isReload]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const reload = () => {
    setIsReload(!isReload);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <h1 className="font-bold text-2xl text-center mb-4">BÁO CÁO DOANH THU</h1>
      <div className="p-1 flex-1 overflow-auto bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="min-w-[100px]">Năm</TableHead>
              <TableHead className="min-w-[200px]">Quận/Huyện</TableHead>
              <TableHead className="min-w-[150px]">Loại bất động sản</TableHead>
              <TableHead className="min-w-[150px]">Số lượng BĐS</TableHead>
              <TableHead className="min-w-[150px]">Số lượng hợp đồng</TableHead>
              <TableHead className="min-w-[200px]">Tổng doanh thu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenues.map((item: Revenue) => (
              <TableRow
                key={item.Nam}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
              >
                <TableCell>{item.Nam}</TableCell>
                <TableCell>{item.TenDVHC}</TableCell>
                <TableCell>{item.LoaiBDS}</TableCell>
                <TableCell>{item.SoLuongBDS}</TableCell>
                <TableCell>{item.SoLuongHopDong}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(+item.TongDoanhThu)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mx-auto p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={reload}
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
          >
            TẢI LẠI DANH SÁCH
          </Button>
        </div>
      </div>
    </div>
  );
}
