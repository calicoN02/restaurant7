import React from "react";
import { FaCheckDouble, FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import { formateDateAndTime, getAvatarName } from "../../utils";

const OrderCard = ({ order }) => {
  // console.log(order);
  return (
    <div className="w-[500px] bg-[#262626] py-4 px-5 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <button className="bg-[#f6b100] p-2 text-xl font-bold rounded-lg">
          {getAvatarName(order.customerDetails.name)}
        </button>
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start">
            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>
            <p className="text-[#ababab] text-sm">#{Math.floor(new Date(order.orderDate).getTime())}/ Dine in</p>
            <p className="text-[#ababab] text-sm">
              <FaLongArrowAltRight
                      className="text-[#ababab] ml-2 inline"/>
              Table {order.table?.tableNo}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] p-2 rounded-lg">
                  <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] p-2 rounded-lg">
                  <FaCircle className="inline mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-yellow-600" /> Preparing
                  Your Order
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-[#ababab]">
        <p>{formateDateAndTime(order.createdAt)}</p>
        <p>{order.items.length}</p>
      </div>
      <hr className="w-full mt-4 border-t-1 border-gray-500" />
      <div className="flex justify-between mt-2">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">tk/-{order.bills.totalWithTax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderCard;
