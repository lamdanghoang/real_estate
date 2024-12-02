import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AddPropertyDialog } from "./AddRealEstate";
import { UpdatePropertyDialog } from "./UpdateRealEstate";
import { DeletePropertyDialog } from "./DeleteRealEstate";

// Sample data structure
interface RealEstate {
  id: string;
  location: string;
  price: number;
  area: number;
  status: string;
  owner: string;
}

// Sample data
const realEstateData: RealEstate[] = [
  {
    id: "BDS0001",
    location: "123 Đường Phạm Phú Thứ, Phường Hiệp Tân",
    price: 1750000,
    area: 120,
    status: "Đang bán",
    owner: "Nguyễn Văn A",
  },
  {
    id: "BDS0002",
    location: "456 Đường Lê Trọng Tấn, Phường Sơn Kỳ",
    price: 2500000,
    area: 150,
    status: "Đang bán",
    owner: "Nguyễn Văn B",
  },
  {
    id: "BDS0003",
    location: "100 Đường 3/2, Phường 14, Quân 10",
    price: 1500000,
    area: 50,
    status: "Đang bán",
    owner: "Nguyễn Văn C",
  },
  {
    id: "BDS0004",
    location: "22 Đường CMT8, Phường 5, Quân 3",
    price: 1900000,
    area: 70,
    status: "Đang bán",
    owner: "Nguyễn Văn D",
  },
  {
    id: "BDS0005",
    location: "44 Đường Nguyên Thị Minh Khai, Phường Đa Kao, Quân 1",
    price: 4000000,
    area: 100,
    status: "Đang bán",
    owner: "Nguyễn Văn E",
  },
  // Add more sample data as needed
];

const ITEMS_PER_PAGE = 10;

export default function RealEstateTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false); // Add state for update dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<RealEstate | null>(
    null
  ); // Add state for selected property

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = DATA.slice(startIndex, endIndex);

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
    console.log("Deleting property:", selectedProperty);
    setSelectedProperty(null);
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
              <TableHead className="w-[100px]">Mã BĐS</TableHead>
              <TableHead className="min-w-[100px]">Loại BĐS</TableHead>
              <TableHead className="min-w-[300px]">Địa chỉ</TableHead>
              <TableHead className="w-[100px]">Diện tích</TableHead>
              <TableHead className="w-[120px]">Giá thuê (VNĐ)</TableHead>
              <TableHead className="min-w-[300px]">Mô tả</TableHead>
              <TableHead className="min-w-[120px]">Trạng thái</TableHead>
              <TableHead className="min-w-[150px]">Chủ sở hữu</TableHead>
              <TableHead className="min-w-[150px]">Nguời quản lý</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {realEstateData.map((item: RealEstate) => (
              <TableRow
                key={item.id}
                onClick={() => clickHandler(item)}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedProperty?.id === item.id ? "bg-blue-100" : ""
                }`}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>Nhà ở</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.area}m²</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(item.price)}
                </TableCell>
                <TableCell>
                  Nhà phố 3 tầng, nhiều phòng ngủ cho gia đình đông con.
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.owner}</TableCell>
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
            className="bg-[#ECDC9B] border-[#ECDC9B] text-[#333] hover:bg-[#ECDC9B]/50"
          >
            TẢI LẠI DANH SÁCH
          </Button>
        </div>
      </div>
      <AddPropertyDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <UpdatePropertyDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        propertyData={selectedProperty}
      />
      <DeletePropertyDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
}
