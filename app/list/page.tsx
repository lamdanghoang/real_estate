"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Item from "@/components/Item";

// Sample data array - replace text with your actual content
const houses = [
  { id: 1, text: "Nhà ở" },
  { id: 2, text: "Căn hộ" },
  { id: 3, text: "Nhà ở" },
  { id: 4, text: "Nhà vương" },
  { id: 5, text: "Nhà phòng" },
  { id: 6, text: "Nhà ở" },
  { id: 7, text: "Nhà vương" },
  { id: 8, text: "Mua ở" },
  { id: 9, text: "Nhà vương" },
  { id: 10, text: "Nhà ở" },
  { id: 11, text: "Nhà thu" },
];

export default function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(houses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHouses = houses.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentHouses.map((house) => (
          <Item />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
