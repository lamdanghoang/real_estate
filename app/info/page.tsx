import Image from "next/image";
import itemMap from "@/assets/item-map.png";
import itemImg from "@/assets/item.png";
import { Facebook, Mail, Printer } from "lucide-react";

export default function Info() {
  return (
    <div className="px-6 py-10 my-auto flex justify-between gap-4">
      <div className="w-1/2">
        <div className="px-16 py-4 ">
          <div className="mx-auto flex flex-col bg-[#DCDDD3] gap-3">
            <Image alt="Image" src={itemImg} className="mx-auto pt-5" />
            <div className="flex gap-1.5 px-3 py-1.5 justify-end">
              <button>
                <Facebook
                  width={22}
                  height={22}
                  fill="#DCDDD3"
                  strokeWidth="1"
                  className="p-0.5 bg-[#3c5b9b] rounded-full"
                />
              </button>
              <button>
                <Mail
                  width={22}
                  height={22}
                  fill="#DCDDD3"
                  strokeWidth="1"
                  className="p-0.5 bg-[#286711] rounded-full"
                />
              </button>
              <button>
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
              <span>Nhà ở</span>
            </div>
            <div>
              <span>Địa chỉ: </span>
              <span>
                63 Dương Khuê, Phường Hiệp Tân, Quận Tân Phú, TP. Hồ Chí Minh
              </span>
            </div>
            <div>
              <span>Đặc điểm: </span>
              <span>
                Nhà phố 2 tầng, mặt tiền, giao thông thuận tiện, gần chợ và
                trường học
              </span>
            </div>
            <div>
              <span>Giá thuê theo tháng: </span>
              <span>15,000,000 vnd</span>
            </div>
            <div>
              <span>Trạng thái: </span>
              <span>Còn trống</span>
            </div>
          </div>
        </div>
      </div>
      <Image src={itemMap} alt="map" />
    </div>
  );
}
