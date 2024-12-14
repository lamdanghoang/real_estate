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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AddPropertyDialog } from "./AddRealEstate";
import { UpdatePropertyDialog } from "./UpdateRealEstate";
import { DeletePropertyDialog } from "./DeleteRealEstate";
import { District, RealEstate, StaffManager } from "@/constants/types";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function RealEstateTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false); // Add state for update dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [properties, setProperties] = useState<RealEstate[] | []>([]);
  const [selectedProperty, setSelectedProperty] = useState<RealEstate>();
  const [staffs, setStaffs] = useState<StaffManager[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
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

    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/donvihanhchinh/danhsach",
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
        setDistricts(result);
      } catch (error) {
        console.error("Fetching districts failed:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/batdongsan/danhsach",
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
        setProperties(result);
      } catch (error) {
        console.error("Fetching properties failed:", error);
      }
    };

    fetchProperties();
    fetchStaffs();
    fetchDistricts();
  }, [isReload]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clickHandler = (property: RealEstate) => {
    setSelectedProperty(property);
  };

  const updateClickHandler = () => {
    if (selectedProperty) {
      setIsUpdateDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a property to update");
    }
  };

  const deleteClickHandler = () => {
    if (selectedProperty) {
      setIsDeleteDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a property to delete");
    }
  };

  const deleteConfirmHandler = () => {
    // Handle the delete operation here
    console.log("Deleting property:", selectedProperty?.MaBDS);
    toast.success("Xóa thành công!");
    setSelectedProperty(undefined);
  };

  const reload = () => {
    setIsReload(!isReload);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <h1 className="font-bold text-2xl text-center mb-4">
        DANH SÁCH BẤT ĐỘNG SẢN
      </h1>
      <div className="p-1 flex-1 overflow-auto bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="min-w-[100px]">Mã BĐS</TableHead>
              <TableHead className="min-w-[100px]">Loại BĐS</TableHead>
              <TableHead className="min-w-[300px]">Địa chỉ</TableHead>
              <TableHead className="min-w-[100px]">Diện tích</TableHead>
              <TableHead className="min-w-[120px]">Giá thuê (VNĐ)</TableHead>
              <TableHead className="min-w-[300px]">Mô tả</TableHead>
              <TableHead className="min-w-[150px]">Trạng thái</TableHead>
              <TableHead className="min-w-[150px]">Nguời quản lý</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((item: RealEstate) => (
              <TableRow
                key={item.MaBDS}
                onClick={() => clickHandler(item)}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedProperty?.MaBDS === item.MaBDS ? "bg-blue-100" : ""
                }`}
              >
                <TableCell className="font-medium">{item.MaBDS}</TableCell>
                <TableCell>{item.LoaiBDS}</TableCell>
                <TableCell>{item.DiaChi}</TableCell>
                <TableCell>{item.DienTich}m²</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(item.GiaThueTheoThang)}
                </TableCell>
                <TableCell>{item.MoTa}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${
                      item.TrangThai === "Chưa cho thuê"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } text-center`}
                  >
                    {item.TrangThai}
                  </Badge>
                </TableCell>
                <TableCell>{item.HoTen}</TableCell>
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
            disabled={!selectedProperty}
          >
            CẬP NHẬT
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={deleteClickHandler}
            disabled={!selectedProperty}
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
      <AddPropertyDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        staffs={staffs}
        districts={districts}
      />
      <UpdatePropertyDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        propertyData={selectedProperty}
        staffs={staffs}
        districts={districts}
      />
      <DeletePropertyDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
}
