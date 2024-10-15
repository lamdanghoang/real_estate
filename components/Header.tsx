import Image from "next/image"
import logo from "@/assets/logo.svg"
import Link from "next/link"
import { CircleUserRound } from "lucide-react"

const navLinks = [
    {
        text: "Trang chủ",
        link: "#",
    },
    {
        text: "Liên hệ",
        link: "#",
    }
]

export default function Header() {
    return <header className="px-16 py-5 flex items-center gap-24">
        <Image src={logo} alt="logo" width={90} height={90} className="" />
        <div className="w-full flex justify-between items-center">
            <nav className="flex gap-2">
                {navLinks.map((item, index) => <Link key={index} href={item.link} className="px-4 leading-10 hover:bg-[#ECDC9B]">{item.text.toUpperCase()}</Link>)}
            </nav>
            <CircleUserRound className="text-gray-50 bg-[#414143] rounded-full" strokeWidth={0.75} width={40} height={40} />
        </div>
    </header>
}