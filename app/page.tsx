"use client";
import SelectForm from "@/components/Search";
import Item from "@/components/Item";
import FinalMap from "@/components/Map/FinalMap";
import { useEffect, useState } from "react";
import { RealEstate, SelectType } from "@/constants/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<RealEstate[] | []>([]);
  const [selections, setSelections] = useState<SelectType>({
    MaDVHC: "",
    LoaiBDS: "",
    DienTich: "",
    GiaThueTheoThang: "",
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <div className="px-6">
      <SelectForm onSelection={setSelections} />
      <FinalMap selection={selections} />
      <div className="mx-28 my-7 ">
        {properties.length > 0 ? (
          <Slider {...sliderSettings} className="h-full" arrows={false}>
            {properties.map((house) => (
              <Link key={house.MaBDS} href={`/info/${house.MaBDS}`}>
                <div className="h-72 max-h-[500px] px-2">
                  <div className="h-full">
                    <Item property={house} />
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        ) : (
          <h1 className="my-auto text-center font-bold">
            Không có dữ liệu. Vui lòng kiểm tra lại.
          </h1>
        )}
      </div>
    </div>
  );
}
