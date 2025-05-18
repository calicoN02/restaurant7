import React, { useState } from "react";
import { BiSolidDish } from "react-icons/bi";
import { MdCategory, MdTableBar } from "react-icons/md";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];
const Dashboard = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if(action === 'table') setIsTableModalOpen(true);
  }

  return (
    <div className="bg-[red-500] h-[calc(100vh-4rem)]">
      <div
        className="container mx-auto flex items-center justify-between 
        py-14 px-6 md:px-4"
      >
        <div className="flex items-center gap-3">
          {buttons.map(({ label, icon, action }, idx) => {
            return (
              <button
                key={idx}
                onClick={() => handleOpenModal(action)}
                className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3
                            rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center
                            gap-2"
              >
                {label} {icon}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          {tabs.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`px-8 py-3
                            rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center
                            gap-2 ${
                              activeTab === tab
                                ? "bg-[red-500]"
                                : "bg-[#1a1a1a] hover:bg-[#FFFFFF]"
                            }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
      {activeTab === "Metrics" && <Metrics />}
      {activeTab === "Orders" && <RecentOrders />}
       {isTableModalOpen && <Modal setIsTableModalOpen = {setIsTableModalOpen}/>}
    </div>
  );
};

export default Dashboard;
