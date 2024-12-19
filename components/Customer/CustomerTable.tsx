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
import { AddCustomerDialog } from "./AddCustomer";
import { UpdateCustomerDialog } from "./UpdateCustomer";
import { DeleteCustomerDialog } from "./DeleteCustomer";
import { Customer, StaffManager } from "@/constants/types";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[] | []>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const [isReload, setIsReload] = useState(false);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = DATA.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/khachthue/danhsach",
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
        setCustomers(result);
      } catch (error) {
        console.error("Fetching customers failed:", error);
      }
    };

    fetchCustomers();
  }, [isReload]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clickHandler = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const updateClickHandler = () => {
    if (selectedCustomer) {
      setIsUpdateDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a customer to update");
    }
  };

  const deleteClickHandler = () => {
    if (selectedCustomer) {
      setIsDeleteDialogOpen(true);
    } else {
      // You might want to show an alert or notification here
      console.log("Please select a customer to delete");
    }
  };

  const deleteConfirmHandler = () => {
    // Handle the delete operation here
    console.log("Deleting property:", selectedCustomer?.MaKhachThue);
    if (selectedCustomer) {
      deleteData(selectedCustomer.MaKhachThue);
    }
    setSelectedCustomer(undefined);
  };

  const reload = () => {
    setIsReload(!isReload);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <h1 className="font-bold text-2xl text-center mb-4">
        DANH SÁCH KHÁCH THUÊ
      </h1>
      <div className="p-1 flex-1 overflow-auto bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="min-w-[100px]">Mã khách</TableHead>
              <TableHead className="min-w-[200px]">Tên khách</TableHead>
              <TableHead className="min-w-[150px]">Số CCCD</TableHead>
              <TableHead className="min-w-[150px]">Điện thoại</TableHead>
              <TableHead className="min-w-[150px]">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((item: Customer) => (
              <TableRow
                key={item.MaKhachThue}
                onClick={() => clickHandler(item)}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedCustomer?.MaKhachThue === item.MaKhachThue
                    ? "bg-blue-100"
                    : ""
                }`}
              >
                <TableCell className="font-medium">
                  {item.MaKhachThue}
                </TableCell>
                <TableCell>{item.TenKhachThue}</TableCell>
                <TableCell>{item.SoCCCD}</TableCell>
                <TableCell>{item.SoDienThoai}</TableCell>
                <TableCell>{item.Email}</TableCell>
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
            disabled={!selectedCustomer}
          >
            CẬP NHẬT
          </Button>
          <Button
            variant="outline"
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
            onClick={deleteClickHandler}
            disabled={!selectedCustomer}
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
      <AddCustomerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <UpdateCustomerDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        customerData={selectedCustomer}
      />
      <DeleteCustomerDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
}

const deleteData = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3003/khachthue/xoa/${id}`, {
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
