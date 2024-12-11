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
import { AddContractDialog } from "./AddContract";
import { UpdateContractDialog } from "./UpdateContract";
import { DeleteContractDialog } from "./DeleteContract";
import { Contract } from "@/constants/types";
import { Badge } from "../ui/badge";

const ITEMS_PER_PAGE = 10;

export default function ContractTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contracts, setContracts] = useState<Contract[] | []>([]);
  const [selectedContract, setSelectedContract] = useState<
    Contract | undefined
  >(undefined);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = DATA.slice(startIndex, endIndex);

  useEffect(() => {
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

    fetchContracts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clickHandler = (contract: Contract) => {
    setSelectedContract(contract);
  };

  const updateClickHandler = () => {
    if (selectedContract) {
      setIsUpdateDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a contract to update");
    }
  };

  const deleteClickHandler = () => {
    if (selectedContract) {
      setIsDeleteDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a contract to delete");
    }
  };

  const deleteConfirmHandler = () => {
    // Handle the delete operation here
    console.log("Deleting contract:", selectedContract?.MaHopDong);
    setSelectedContract(undefined);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <h1 className="font-bold text-2xl text-center mb-4">
        DANH SÁCH HỢP ĐỒNG THUÊ
      </h1>
      <div className="p-1 flex-1 overflow-auto bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="min-w-[100px]">Mã HĐ</TableHead>
              <TableHead className="min-w-[150px]">Ngày ký</TableHead>
              <TableHead className="min-w-[150px]">Ngày bắt đầu</TableHead>
              <TableHead className="min-w-[150px]">Ngày kết thúc</TableHead>
              <TableHead className="min-w-[150px]">Giá thuê</TableHead>
              <TableHead className="min-w-[150px]">Tiền đặt cọc</TableHead>
              <TableHead className="min-w-[100px]">Số lượng khách</TableHead>
              <TableHead className="min-w-[150px]">Tình trạng HĐ</TableHead>
              <TableHead className="min-w-[100px]">Mã BĐS</TableHead>
              <TableHead className="min-w-[100px]">Mã khách thuê</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((item: Contract) => (
              <TableRow
                key={item.MaHopDong}
                onClick={() => clickHandler(item)}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedContract?.MaHopDong === item.MaHopDong
                    ? "bg-blue-100"
                    : ""
                }`}
              >
                <TableCell className="font-medium">{item.MaHopDong}</TableCell>
                <TableCell>{item.NgayKyHopDong}</TableCell>
                <TableCell>{item.NgayBatDau}</TableCell>
                <TableCell>{item.NgayKetThuc}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(item.GiaThue)}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(item.TienDatCoc)}
                </TableCell>
                <TableCell>{item.SoLuongKhach}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${
                      item.TinhTrangHopDong === "Hiệu lực"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.TinhTrangHopDong}
                  </Badge>
                </TableCell>
                <TableCell>{item.MaBDS}</TableCell>
                <TableCell>{item.MaKhachThue}</TableCell>
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
            disabled={!selectedContract}
          >
            CẬP NHẬT
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={deleteClickHandler}
            disabled={!selectedContract}
          >
            XÓA
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
          >
            TẢI LẠI DANH SÁCH
          </Button>
        </div>
      </div>
      <AddContractDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <UpdateContractDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        contractData={selectedContract}
      />
      <DeleteContractDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
}
