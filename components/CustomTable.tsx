import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

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
    location: "123 Đường Phạm Phú Thứ, Phường Hiệp Tân...",
    price: 1750000,
    area: 120,
    status: "Đang bán",
    owner: "Nguyễn Văn A",
  },
  {
    id: "BDS0002",
    location: "456 Đường Lê Trọng Tấn, Phường Sơn Kỳ...",
    price: 2500000,
    area: 150,
    status: "Đang bán",
    owner: "Nguyễn Văn B",
  },
  // Add more sample data as needed
];

export default function RealEstateTable() {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <div className="rounded-lg border bg-card">
        <div className="bg-[#4CAF50] text-white p-3 rounded-t-lg flex items-center justify-between">
          <h1 className="text-lg font-semibold">DANH SÁCH BẤT ĐỘNG SẢN</h1>
          <Badge variant="secondary" className="bg-white text-[#4CAF50]">
            8
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mã BĐS</TableHead>
                <TableHead className="min-w-[300px]">Địa chỉ</TableHead>
                <TableHead className="w-[120px]">Giá (VNĐ)</TableHead>
                <TableHead className="w-[100px]">Diện tích</TableHead>
                <TableHead className="w-[120px]">Trạng thái</TableHead>
                <TableHead className="w-[150px]">Chủ sở hữu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {realEstateData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("vi-VN").format(item.price)}
                  </TableCell>
                  <TableCell>{item.area}m²</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <Button className="bg-[#4CAF50] hover:bg-[#45a049]">THÊM</Button>
            <Button
              variant="outline"
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
            >
              CẬP NHẬT
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              XÓA
            </Button>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
