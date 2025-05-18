import React from "react";
import { FaCheckDouble, FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import { getAvatarName } from "../../utils";

const OrderList = ({ order }) => {
  return (
    <div className="flex itmes-center gap-4 mb-2">
      <button className="bg-[#f6b100] p-2 text-xl font-bold rounded-lg">
        {getAvatarName(order.customerDetails.name)}
      </button>
      <div className="flex items-center justify-between w-[100%]">
        <div className="flex flex-col items-start">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            {order.customerDetails.name}
          </h1>
          <p className="text-[#ababab] text-sm">{order.items.length} Items</p>
        </div>

        <div>
          <h1
            className="text-[#f6b100] font-semibold border border-[#f6b100]
              rounded-lg p-1"
          >
            Table
            <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
            {order.table?.tableNo}
          </h1>
        </div>

        <div className="flex flex-col items-end gap-1">
          {order.orderStatus === "Ready" ? (
            <>
              <p className="text-green-600 bg-[#2e4a40] p-2 rounded-lg">
                <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
              </p>
            </>
          ) : (
            <>
              <p className="text-yellow-600 bg-[#4a452e] p-2 rounded-lg">
                <FaCircle className="inline mr-2" /> {order.orderStatus}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
