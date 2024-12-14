"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Item from "@/components/Item";
import { RealEstate } from "@/constants/types";
import Link from "next/link";

export default function List() {
  const [properties, setProperties] = useState<RealEstate[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHouses = properties.slice(startIndex, endIndex);

  useEffect(() => {
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
  }, [properties]);

  return (
    <div className="container mx-auto py-8">
      {currentHouses.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
          {currentHouses.map((house) => (
            <Link href={`/info/${house.MaBDS}`}>
              <Item property={house} />
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="my-auto text-center font-bold">
          Không có dữ liệu. Vui lòng kiểm tra lại.
        </h1>
      )}

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
              className={
                currentPage === i + 1
                  ? "bg-[#ECDC9B] hover:bg-[#ECDC9B]/80 text-gray-800"
                  : ""
              }
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
