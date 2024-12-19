import { Facebook, Mail, Printer } from "lucide-react";
import MultiGeometryMap from "@/components/Map/FinalMap";
import SingleMap from "@/components/Map/SingleMap";

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
          <SingleMap
            lon={106.63036}
            lat={10.77549}
            zoom={17}
            selectedProperty={initialValue}
          />
        </div>
      </div>
    </div>
  );
}

const initialValue = {
  MaBDS: "BDS001",
  LoaiBDS: "Nhà ở",
  DiaChi: "61 Dương Khuê, Phường Hiệp Tân, Quận Tân Phú, TP. Hồ Chí Minh",
  DienTich: 75.46,
  GiaThueTheoThang: 18000000,
  TrangThai: "Đang cho thuê",
  MoTa: "Nhà phố 3 tầng, nhiều phòng ngủ cho gia đình có nhiều thành viên",
  MaNQL: "NQL001",
  MaDiem: "IDP001",
  MaDVHC: "DV0015",
  HoTen: "Huỳnh Văn A",
  TenDVHC: "Quận Tân Phú",
  KinhDo: 106.63036,
  ViDo: 10.77549,
};
