import { Facebook, Mail, Printer } from "lucide-react";
import MultiGeometryMap from "@/components/Map/FinalMap";

export default function Contact() {
  return (
    <div className="px-6 py-10 my-auto flex justify-between gap-5">
      <div className="w-full p-6 bg-[#dcddd3] flex justify-between">
        <div className="w-1/2">
          <h3 className="text-xl font-bold text-[#333333]">
            THÔNG TIN LIÊN HỆ
          </h3>
          <div className="flex flex-col p-4 gap-2">
            <h1 className="mb-3 text-[#9B7000] text-xl font-bold">
              REAL ESTATE
            </h1>
            <div>
              <span>
                61 Dương Khuê, Phường Hiệp Tân, Quận Tân Phú, Thành phố Hồ Chí
                Minh
              </span>
            </div>
            <div>
              <span>Điện thoại: </span>
              <span>(+84) 568 331 490</span>
            </div>
            <div>
              <span>Email: </span>
              <span>kpvrbh@gmail.com</span>
            </div>
            <div>
              <span>Người liên hệ: </span>
              <span>Nguyễn Văn A</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <MultiGeometryMap lon={106.63036} lat={10.77549} zoom={17} />
        </div>
      </div>
    </div>
  );
}
