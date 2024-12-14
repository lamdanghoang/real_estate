"use client";
import Image from "next/image";
import itemMap from "@/assets/item-map.png";
import itemImg from "@/assets/item.png";
import { Facebook, Mail, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { RealEstate } from "@/constants/types";
import { useParams } from "next/navigation";
import MultiGeometryMap from "@/components/Map/FinalMap";

export default function Info() {
  const [property, setProperty] = useState<RealEstate>();
  const params = useParams<{ id: string }>();
  console.log(params.id);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/batdongsan/thongtin/${params.id}`,
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

        setProperty(result);
      } catch (error) {
        console.error("Fetching property failed:", error);
      }
    };

    fetchProperty();
  }, [params.id]);
  return property ? (
    <div className="px-6 py-10 my-auto flex justify-between gap-4">
      <div className="w-1/2">
        <div className="px-16 py-4 ">
          <div className="mx-auto flex flex-col bg-[#DCDDD3] gap-3">
            <Image alt="Image" src={itemImg} className="mx-auto pt-5" />
            <div className="flex gap-1.5 px-3 py-1.5 justify-end">
              <button
                onClick={() => {
                  window.open("https://www.facebook.com/", "_blank");
                }}
              >
                <Facebook
                  width={22}
                  height={22}
                  fill="#DCDDD3"
                  strokeWidth="1"
                  className="p-0.5 bg-[#3c5b9b] rounded-full"
                />
              </button>
              <button
                onClick={() => {
                  const mailtoLink =
                    "mailto:recipient@example.com?subject=My Subject&body=My Message";
                  window.location.href = mailtoLink;
                }}
              >
                <Mail
                  width={22}
                  height={22}
                  fill="#DCDDD3"
                  strokeWidth="1"
                  className="p-0.5 bg-[#286711] rounded-full"
                />
              </button>
              <button onClick={() => window.print()}>
                <Printer
                  width={22}
                  height={22}
                  fill="#DCDDD3"
                  strokeWidth="1"
                  className="p-0.5 bg-[#55584e] rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 ">
          <h3 className="text-xl font-bold text-[#333333]">
            THÔNG TIN CHI TIẾT BẤT ĐỘNG SẢN
          </h3>

          <div className="flex flex-col p-4 gap-4">
            <div>
              <span>Loại bất động sản: </span>
              <span>{property?.LoaiBDS}</span>
            </div>
            <div>
              <div>
                <span>Địa chỉ: </span>
                <span>{property?.DiaChi}</span>
              </div>
              <div>
                <span>Diện tích: </span>
                <span>{property?.DienTich}m²</span>
              </div>
            </div>
            <div>
              <span>Đặc điểm: </span>
              <span>{property?.MoTa}</span>
            </div>
            <div>
              <div>
                <span>Giá thuê theo tháng: </span>
                <span>
                  {new Intl.NumberFormat("vi-VN").format(
                    property?.GiaThueTheoThang || 0
                  )}
                  VNĐ
                </span>
              </div>
              <div>
                <span>Trạng thái: </span>
                <span>{property?.TrangThai}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <MultiGeometryMap
          lon={property?.KinhDo}
          lat={property?.ViDo}
          zoom={17}
        />
      </div>
    </div>
  ) : (
    <h1 className="my-auto text-center font-bold">
      Không tìm thấy thông tin bất động sản. Vui lòng kiểm tra hoặc thử lại lần
      sau.
    </h1>
  );
}
