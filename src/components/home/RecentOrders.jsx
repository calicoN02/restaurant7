import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from 'notistack'
import { getOrders } from "../../https";

const RecentOrders = () => {

  const {data: resData, isError} = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
     return await getOrders();
    },
    placeholderData: keepPreviousData
 });

 if(isError) {
   enqueueSnackbar("Something went wrong", {variant: "error"});
 }

  return (
    <div className="px-8 mt-4">
      <div className="bg-[#1f1f1f] w-full h-[430px] rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        <div className="flex items-center gap-4 bg-[#1a1919] rounded-[15px] px-5 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search Recent Orders"
            className="bg-[#1a1919] outline-none text-[#f5f5f5]"
          />
        </div>
        {/* Order List */}
        <div className="mt-4 px-6 overflow-y-scroll h-[280px] no-scrollbar">
            {
          resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderList key={order._id} order = {order}/>
            })
          ): <p className="col-span-3 text-gray-500">No orders available</p>
        }
        </div>

      </div>
    </div>
  );
};

export default RecentOrders;
