import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const DATA = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: 250.0 },
  { invoice: "INV002", status: "Pending", method: "Cash", amount: 150.0 },
  { invoice: "INV003", status: "Paid", method: "Bank Transfer", amount: 300.0 },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: 400.0 },
  { invoice: "INV005", status: "Pending", method: "Cash", amount: 175.0 },
  { invoice: "INV006", status: "Paid", method: "Bank Transfer", amount: 275.0 },
  { invoice: "INV007", status: "Pending", method: "Cash", amount: 220.0 },
  { invoice: "INV008", status: "Paid", method: "Credit Card", amount: 350.0 },
  { invoice: "INV009", status: "Paid", method: "Bank Transfer", amount: 290.0 },
  { invoice: "INV010", status: "Pending", method: "Cash", amount: 180.0 },
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: 250.0 },
  { invoice: "INV002", status: "Pending", method: "Cash", amount: 150.0 },
  { invoice: "INV003", status: "Paid", method: "Bank Transfer", amount: 300.0 },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: 400.0 },
  { invoice: "INV005", status: "Pending", method: "Cash", amount: 175.0 },
  { invoice: "INV006", status: "Paid", method: "Bank Transfer", amount: 275.0 },
  { invoice: "INV007", status: "Pending", method: "Cash", amount: 220.0 },
  { invoice: "INV008", status: "Paid", method: "Credit Card", amount: 350.0 },
  { invoice: "INV009", status: "Paid", method: "Bank Transfer", amount: 290.0 },
  { invoice: "INV010", status: "Pending", method: "Cash", amount: 180.0 },
];

const ITEMS_PER_PAGE = 10;

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = DATA.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-[400px]">
      <h1 className="font-bold text-2xl text-center mb-4">
        DANH SÁCH BẤT ĐỘNG SẢN
      </h1>
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.invoice}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.method}</TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(DATA.length / ITEMS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
      </div> */}
    </div>
  );
}
