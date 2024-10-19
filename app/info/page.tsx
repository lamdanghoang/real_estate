import Image from "next/image"
import itemMap from "@/assets/item-map.png"
import itemImg from "@/assets/item.png"
import { Mail, Printer } from "lucide-react"

export default function Info() {
    return <div className="px-6 py-10 my-auto flex justify-between gap-4">
        <div className="w-1/2 bg-[#EBEBEB]">
            <div className="px-16 py-4 ">
                <div className="mx-auto flex flex-col bg-[#DCDDD3] gap-3">
                    <Image alt="Image" src={itemImg} className="mx-auto pt-5" />
                    <div className="flex gap-1.5 px-3 py-1.5 justify-end">
                        <button>
                            <Mail width={22} height={22} fill="#DCDDD3" strokeWidth="1" className="p-0.5 bg-[#595A50] rounded-full" />
                        </button>
                        <button>
                            <Printer width={22} height={22} fill="#DCDDD3" strokeWidth="1" className="p-0.5 bg-[#595A50] rounded-full" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-4 ">
                <h3 className="text-xl font-bold text-[#333333]">THÔNG TIN CHI TIẾT BẤT ĐỘNG SẢN</h3>
            </div>
        </div>
        <Image src={itemMap} alt="map" />
    </div>
}