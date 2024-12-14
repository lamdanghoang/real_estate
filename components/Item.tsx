import Image from "next/image";
import itemImg from "@/assets/item.png";
import { RealEstate } from "@/constants/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
  property: RealEstate;
}

export default function Item({ property }: Props) {
  return (
    <div className="p-1.5 bg-[#DCDDD3] flex flex-col h-full">
      <Image alt="Image" src={itemImg} className="w-full" />
      <ScrollArea className="mt-1 p-1 bg-[#F2EFEC] flex flex-col flex-grow">
        <h3 className="px-2 text-[#702F0C] text-md leading-5 font-semibold">
          {property.LoaiBDS}{" "}
          <span className="font-medium text-xs italic">
            ({property.TenDVHC})
          </span>
        </h3>
        <p className="mt-4 flex-grow px-2 text-[#666666] text-xs">
          {new Intl.NumberFormat("vi-VN").format(property.GiaThueTheoThang)} VNĐ
        </p>
        <p className="mt-4 flex-grow px-2 text-[#666666] text-sm">
          {property.MoTa}
        </p>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}
