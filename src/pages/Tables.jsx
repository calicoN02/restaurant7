import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");
  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something Went Wrong!", { variant: "error" });
  }

  return (
    <section className="bg-[#FFFFFF] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-2 mt-2">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl font-bold tracking-wide">
            Orders
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#FFFFFF] rounded-lg px-4 py-2"
            } rounded-lg px-4 py-2
          font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("Available")}
            className={`text-[#ababab] text-lg ${
              status === "Available" && "bg-[#FFFFFF] rounded-lg px-4 py-2"
            } rounded-lg px-4 py-2
          font-semibold`}
          >
            Available
          </button>
          <button
            onClick={() => setStatus("Booked")}
            className={`text-[#ababab] text-lg ${
              status === "Booked" && "bg-[#FFFFFF] rounded-lg px-4 py-2"
            } rounded-lg px-4 py-2
          font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>
      <div className="">
        <div
          className="flex flex-wrap items-start justify-around gap-5 p-10 overflow-y-scroll no-scrollbar
      h-[calc(100vh-12rem)]"
        >
          {resData?.data.data
            .filter((table) => status === "all" || table.status === status)
            .sort((table1, table2) => table1.tableNo - table2.tableNo)
            .map((table) => {
              return (
                <TableCard
                  key={table._id}
                  id={table._id}
                  name={table.tableNo}
                  status={table.status}
                  initials={table?.currentOrder?.customerDetails.name}
                  seats={table.seats}
                />
              );
            })}
        </div>
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;
