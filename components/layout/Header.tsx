"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useContext, useEffect } from "react";
import GlobalContext from "@/context/store";
import Logout from "@/assets/icons/logout";
import { usePathname, useRouter } from "next/navigation";

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
  const { isConnected, setIsConnected, setIsOwner } = useContext(GlobalContext);
  const router = usePathname();
  const route = useRouter();

  return (
    <header className="px-16 py-4 flex items-center gap-24 border border-b-[#B28326]">
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={90} height={90} className="" />
      </Link>
      <div className="w-full flex justify-between items-center">
        <nav className="flex">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`px-4 py-1 leading-10 hover:bg-[#ECDC9B]/50 ${
                router === item.link ? "bg-[#ECDC9B]" : ""
              }`}
            >
              {item.text.toUpperCase()}
            </Link>
          ))}
          {isConnected && (
            <Link
              key="quanly"
              href="/manage"
              className={`px-4 py-1 leading-10 hover:bg-[#ECDC9B]/50 ${
                router === "/manage" ? "bg-[#ECDC9B]" : ""
              }`}
            >
              QUẢN LÝ
            </Link>
          )}
        </nav>
        {!isConnected ? (
          <Link href={"/login"}>
            <CircleUserRound
              className={`text-gray-50 bg-[#414143] hover:bg-[#ECDC9B]/80 ${
                router === "/login" ? "bg-[#ECDC9B]" : ""
              } rounded-full`}
              strokeWidth={0.75}
              width={40}
              height={40}
            />
          </Link>
        ) : (
          <button
            onClick={() => {
              route.push("/");
              setIsConnected(false);
              setIsOwner(false);
            }}
            className="text-[#414143] hover:text-[#414143]/50"
          >
            <Logout />
          </button>
        )}
      </div>
    </header>
  );
}
