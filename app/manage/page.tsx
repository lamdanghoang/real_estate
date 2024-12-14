"use client";
import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tab_list } from "@/constants/constants";
import RealEstateTable from "@/components/RealEstate/RealEstateTable";
import GlobalContext from "@/context/store";
import ManagerTable from "@/components/Manager/ManagerTable";
import CustomerTable from "@/components/Customer/CustomerTable";
import ContractTable from "@/components/Contract/ContractTable";
import InvoiceTable from "@/components/Invoice/InvoiceTable";

export default function Manage() {
  const { isConnected, isOwner } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState("batdongsan");

  return isConnected ? (
    <div className="container mx-auto px-6 py-5">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col lg:flex-row gap-4"
      >
        <TabsList className="flex flex-col w-full h-full lg:w-1/5 rounded-lg p-2 space-y-2.5 bg-transparent">
          {tab_list.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="
                min-w-60 
                bg-[#F1EFE9] 
                border 
                data-[state=active]:bg-[#DCAE43] 
                text-gray-900 
                rounded-md 
                transition-colors 
                duration-200
                text-left
                px-4
                py-2
                hover:bg-[#DCAE43]/50
              "
              disabled={tab.value === "nguoiquanly" && !isOwner}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full lg:w-4/5">
          <TabsContent value="batdongsan">
            <RealEstateTable />
          </TabsContent>
          <TabsContent value="khachthue">
            <CustomerTable />
          </TabsContent>
          <TabsContent value="hopdong">
            <ContractTable />
          </TabsContent>
          <TabsContent value="hoadon">
            <InvoiceTable />
          </TabsContent>
          <TabsContent value="baocao">
            <div className="p-4 bg-white rounded-lg shadow">
              Báo Cáo Content
            </div>
          </TabsContent>
          <TabsContent value="nguoiquanly">
            <ManagerTable />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ) : (
    <h1 className="my-auto text-center font-bold">Bạn phải đăng nhập trước.</h1>
  );
}
