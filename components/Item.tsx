import Image from "next/image";
import itemImg from "@/assets/item.png";

export default function Item() {
    return <div className="p-1.5 bg-[#DCDDD3]">
        <Image alt="Image" src={itemImg} className="mx-auto" />
        <div className="mt-1 p-1 bg-[#F2EFEC] text-wrap	">
            <h3 className="text-[#702F0C] text-md">Lorem ipsum dolor sit amet consetetur </h3>
            <p className="text-[#666666] text-sm">Lorem ipsum dolor sit amet consetetur. Lorem ipsum dolor sit amet consetetur</p>
        </div>
    </div>
}