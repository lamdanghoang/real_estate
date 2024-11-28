"use client";
import Facebook from "@/assets/icons/facebook";
import Tiktok from "@/assets/icons/tiktok";
import Youtube from "@/assets/icons/youtube";
import GlobalContext from "@/context/store";
import Link from "next/link";
import { useContext } from "react";

const navLinks = [
  {
    text: "Trang chủ",
    link: "/",
  },
  {
    text: "Bất động sản",
    link: "/list",
  },
  {
    text: "Liên hệ",
    link: "/contact",
  },
];

export default function Footer() {
  const { isConnected, setIsConnected } = useContext(GlobalContext);
  return (
    <footer className="bg-[#999999] flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 px-9 py-2 text-neutral-500">
        <Youtube />
        <Facebook />
        <Tiktok />
      </div>
      <div className="text-center">
        <h3 className="text-[#F9E48E] leading-8">REAL ESTATE</h3>
        <p className="text-xs text-white">
          61 Dương Khuê, Phường Hiệp Tân, Quận Tân Phú, Thành phố Hồ Chí Minh
          <br />
          <span className="space-x-5">
            <span>Điện thoại: (+84) 568 331 490</span>
            <span>Email: kpvrbh@gmail.com</span>
          </span>
        </p>
      </div>
      <nav>
        {navLinks.map((item, index) => (
          <Link
            className="px-5 text-xs text-gray-900 border-r border-gray-300 last:border-0 "
            key={index}
            href={item.link}
          >
            {item.text}
          </Link>
        ))}
        {!isConnected ? (
          <Link
            className="px-5 text-xs text-gray-900 border-r border-gray-300 last:border-0 "
            key="login"
            href="/login"
          >
            Đăng nhập
          </Link>
        ) : (
          <Link
            className="px-5 text-xs text-gray-900 border-r border-gray-300 last:border-0 "
            key="logout"
            href="/"
            onClick={() => setIsConnected(false)}
          >
            Đăng xuất
          </Link>
        )}
      </nav>
    </footer>
  );
}
