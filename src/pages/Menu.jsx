import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Menu = () => {

  const customerData = useSelector(state => state.customer);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("payment-status");
  // console.log(customerData);
  const navigate = useNavigate();
  useEffect(() => {
    if(customerData.orderId === '' && customerData.customerName === ''
      && customerData.customerPhone === '' && customerData.guests == 0
      && !status && status !== ('success' || 'cancel' || 'failure')
    ) {
      enqueueSnackbar("Order and Customer Inforamtion Missing", {variant: 'error'});
      navigate('/');
    }
  }, [])
  return (
    <section className="bg-[#1a1a1a] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      <div className="flex-[3]">
        <div className="flex items-center justify-between px-10 py-2 mt-2">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-xl font-bold tracking-wide">
              Menu
            </h1>
          </div>
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  Table: {customerData.table?.tableNo || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <MenuContainer />
      </div>
      {/* Right Div */}
      <div className="flex-[1] bg-[#1a1a1a] mt-4 mr-3 h-[640px] rounded-lg pt-2">
        {/* Customer Info */}
        <CustomerInfo/>
        <hr className="border-[#2a2a2a] border-t-2" />
        {/* Cart  Items*/}
        <CartInfo/>
        <hr className="border-[#2a2a2a] border-t-2" />
        {/* Bills */}
        <Bill/>
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
