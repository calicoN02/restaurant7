import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="bg-[#1f1f1f] py-3 px-5 rounded-lg w-[50%]">
      <div className="flex items-start justify-between">
        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
          {title}
        </h1>
        <button
          className={`${
            title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f6b100]"
          } p-1 rounded-lg text-[#f5f5f5] text-2xl`}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className="text-[#f5f5f5] text-2xl font-bold">{
          title === 'Total Earnings' ? `Tk/-${number}` : number}</h1>
        <h1 className="text-[#f5f5f5] text-lg">
          <span className="text-[#02ca3a]">{footerNum}%</span> then yesterday
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
