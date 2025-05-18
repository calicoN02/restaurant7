import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getAvatarName, getRandomBg } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { enqueueSnackbar } from 'notistack'

const TableCard = ({ id, name, status, initials }) => {
  const custInfo = useSelector(state => state.customer);
  // console.log(custInfo);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = (name) => {
    if(status === 'Booked') {
      enqueueSnackbar("Select Available Table", {variant: "warning"});
      return;
    };

    if(custInfo.orderId === '' || custInfo.customerName === '' ||
      custInfo.customerPhone === '' || custInfo.guests === 0
    ) {
      enqueueSnackbar("Customer Information Required before creating order!", {variant: 'warning'});
      return;
    }
    const table = {
      tableId: id, tableNo: name
    }
    dispatch(updateTable({table}));
    navigate(`/menu`)
  }
  return (
    <div
      onClick={() => handleClick(name)}
      key={id}
      className="w-[300px] bg-[#262626] hover:bg-[#353535] py-4 px-5 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">Table <FaLongArrowAltRight
        className="text-[#ababab] ml-2 inline"/>{name}</h1>
        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          } p-2 rounded-lg`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center my-5">
        <h1
          className={` flex justify-center items-center text-slate-300 h-16 w-16 rounded-full p-4 text-xl font-bold`}
          style={{ backgroundColor: initials ? getRandomBg() : '#1f1f1f' }}
        >
          {getAvatarName(initials) || 'N/A'}
        </h1>
      </div>
    </div>
  );
};

export default TableCard;
