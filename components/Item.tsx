import Image from "next/image";
import itemImg from "@/assets/item.png";
import { RealEstate } from "@/constants/types";

interface Props {
  property: RealEstate;
}

export default function Item({ property }: Props) {
  return (
    <div className="p-1.5 bg-[#DCDDD3] flex flex-col h-full">
      <Image alt="Image" src={itemImg} className="w-full" />
      <div className="mt-1 p-1 bg-[#F2EFEC] flex flex-col flex-grow">
        <h3 className="px-2 text-[#702F0C] text-md leading-5">
          {property.LoaiBDS}
        </h3>
        <p className="flex-grow px-2 pt-4 text-[#666666] text-sm">
          {property.MoTa}
        </p>
      </div>
    </div>
  );
}
