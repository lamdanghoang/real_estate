import { Button } from "@/components/ui/button";

export default function Admin() {
    return <div className="px-6 py-10 flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64">
            <nav className="px-4 space-y-2">
                <Button variant="ghost" className="w-full p-2 justify-start text-gray-700 hover:bg-gray-100 border border-[#999999] rounded-none">
                    Thêm bất động sản
                </Button>
                <Button variant="ghost" className="w-full p-2 justify-start text-gray-700 hover:bg-gray-100 border border-[#999999] rounded-none">
                    Cập nhật bất động sản
                </Button>
                <Button variant="ghost" className="w-full p-2 justify-start text-gray-700 hover:bg-gray-100 border border-[#999999] rounded-none">
                    Xóa bất động sản
                </Button>
                <Button variant="ghost" className="w-full p-2 justify-start text-gray-700 hover:bg-gray-100 border border-[#999999] rounded-none">
                    Xem báo cáo thống kê doanh thu
                </Button>
                <Button variant="ghost" className="w-full p-2 justify-start text-gray-700 hover:bg-gray-100 border border-[#999999] rounded-none">
                    Cập nhật thông tin cá nhân
                </Button>
            </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-white">
            <div className="bg-pink-100 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa dicta id, provident perferendis ipsam fuga impedit nemo sed earum quos architecto eos vero fugiat asperiores! Laudantium, laborum! Doloremque, voluptate unde?</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quod unde nobis facere corrupti distinctio possimus harum repellat quidem id tempore odit modi optio omnis quasi! In dolore iusto facere?
                    </li>
                    <li>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat vel odit itaque asperiores harum vitae autem sapiente, officia nihil quas iste ut at, temporibus, odio inventore reiciendis eveniet rerum quis.
                    </li>
                </ol>
            </div>
        </main>
    </div>
}