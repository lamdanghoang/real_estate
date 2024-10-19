import Facebook from "@/assets/icons/facebook";
import Tiktok from "@/assets/icons/tiktok";
import Youtube from "@/assets/icons/youtube";
import Link from "next/link";

const navLinks = [
    {
        text: "Trang chủ",
        link: "#",
    },
    {
        text: "Liên hệ",
        link: "#",
    },
    {
        text: "Đăng nhập",
        link: "#",
    }
]

export default function Footer() {
    return <footer className="bg-[#999999] flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 px-9 py-2 text-neutral-500">
            <Youtube />
            <Facebook />
            <Tiktok />
        </div>
        <div className="text-center">
            <h3 className="text-gray-50 leading-8">REAL ESTATE</h3>
            <p className="text-xs text-gray-300">Lorem ipsum dolor sit amet consetetur</p>
        </div>
        <nav>
            {navLinks.map((item, index) => <Link className="px-5 text-xs text-gray-900 border-r border-gray-300 last:border-0 " key={index} href={item.link}>{item.text}</Link>)}
        </nav>
    </footer>
}
