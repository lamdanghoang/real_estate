"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useContext } from "react";
import GlobalContext from "@/context/store";
import Logout from "@/assets/icons/logout";

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

export default function Header() {
  const { isConnected, setIsConnected } = useContext(GlobalContext);
  return (
    <header className="px-16 py-4 flex items-center gap-24 border border-b-[#B28326]">
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={90} height={90} className="" />
      </Link>
      <div className="w-full flex justify-between items-center">
        <nav className="flex gap-2">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="px-4 py-1 leading-10 hover:bg-btnHover"
            >
              {item.text.toUpperCase()}
            </Link>
          ))}
          {isConnected && (
            <Link
              key="quanly"
              href="/manage"
              className="px-4 py-1 leading-10 hover:bg-btnHover"
            >
              QUẢN LÝ
            </Link>
          )}
        </nav>
        {!isConnected ? (
          <Link href={"/login"}>
            <CircleUserRound
              className="text-gray-50 bg-[#414143] rounded-full"
              strokeWidth={0.75}
              width={40}
              height={40}
            />
          </Link>
        ) : (
          <button
            onClick={() => {
              setIsConnected(false);
            }}
          >
            <Logout />
          </button>
        )}
      </div>
    </header>
  );
}
