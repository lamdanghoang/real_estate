"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tab_list } from "@/constants/constants";
import RealEstateTable from "@/components/RealEstate/RealEstateTable";

export default function Manage() {
  const [activeTab, setActiveTab] = useState("batdongsan");

  return (
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
                w-full 
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
            <div className="p-4 bg-white rounded-lg shadow">
              Khách Thuê Content
            </div>
          </TabsContent>
          <TabsContent value="hopdong">
            <div className="p-4 bg-white rounded-lg shadow">
              Hợp Đồng Content
            </div>
          </TabsContent>
          <TabsContent value="hoadon">
            <div className="p-4 bg-white rounded-lg shadow">
              Hóa Đơn Content
            </div>
          </TabsContent>
          <TabsContent value="baocao">
            <div className="p-4 bg-white rounded-lg shadow">
              Báo Cáo Content
            </div>
          </TabsContent>
          <TabsContent value="nguoiquanly">
            <div className="p-4 bg-white rounded-lg shadow">
              Người Quản Lý Content
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
