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
import { AddManagerDialog } from "./AddManager";
import { UpdateManagerDialog } from "./UpdateManager";
import { DeleteManagerDialog } from "./DeleteManager";
import { StaffManager } from "@/constants/types";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 10;

export default function ManagerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [staffs, setStaffs] = useState<StaffManager[] | []>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffManager | undefined>(
    undefined
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = DATA.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/nguoiquanly/danhsach",
          {
            method: "GET", // Explicitly set method
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json", // Add Accept header
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setStaffs(result);
      } catch (error) {
        console.error("Fetching staffs failed:", error);
      }
    };

    fetchStaffs();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clickHandler = (staff: StaffManager) => {
    setSelectedStaff(staff);
  };

  const updateClickHandler = () => {
    if (selectedStaff) {
      setIsUpdateDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a staff to update");
    }
  };

  const deleteClickHandler = () => {
    if (selectedStaff) {
      setIsDeleteDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a staff to delete");
    }
  };

  const deleteConfirmHandler = () => {
    // Handle the delete operation here
    console.log("Deleting property:", selectedStaff?.MaNQL);
    setSelectedStaff(undefined);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <h1 className="font-bold text-2xl text-center mb-4">
        DANH SÁCH NGƯỜI QUẢN LÝ
      </h1>
      <div className="p-1 flex-1 overflow-auto bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="min-w-[100px]">Mã NQL</TableHead>
              <TableHead className="min-w-[150px]">Ngày khởi tạo</TableHead>
              <TableHead className="min-w-[150px]">Tên NQL</TableHead>
              <TableHead className="min-w-[150px]">Điện thoại</TableHead>
              <TableHead className="min-w-[150px]">Email</TableHead>
              <TableHead className="min-w-[150px]">Tên đăng nhập</TableHead>
              <TableHead className="min-w-[100px]">Mật khẩu</TableHead>
              <TableHead className="min-w-[150px]">Vai trò</TableHead>
              <TableHead className="min-w-[150px]">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((item: StaffManager) => (
              <TableRow
                key={item.MaNQL}
                onClick={() => clickHandler(item)}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedStaff?.MaNQL === item.MaNQL ? "bg-blue-100" : ""
                }`}
              >
                <TableCell className="font-medium">{item.MaNQL}</TableCell>
                <TableCell>
                  {format(new Date(item.NgayKhoiTao), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{item.HoTen}</TableCell>
                <TableCell>{item.SoDienThoai}</TableCell>
                <TableCell>{item.Email}</TableCell>
                <TableCell>{item.TenDangNhap}</TableCell>
                <TableCell>{item.MatKhau}</TableCell>
                <TableCell>{item.VaiTro}</TableCell>
                <TableCell>{item.TrangThai}</TableCell>
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
            disabled={!selectedStaff}
          >
            CẬP NHẬT
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={deleteClickHandler}
            disabled={!selectedStaff}
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
      <AddManagerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <UpdateManagerDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        staffData={selectedStaff}
      />
      <DeleteManagerDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
}
