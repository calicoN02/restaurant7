import React, { useEffect, useRef } from "react";
import { FaNotesMedical, FaUserCircle } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";
const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrollRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [cartData])

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId))
  }
  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div className="mt-4 overflow-scroll no-scrollbar h-[340px]" ref={scrollRef}>
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm flex justify-center items-center h-[340px]">Your Car is Empty. Start addings items!</p>
        ) : (
          cartData &&
          cartData.map((item) => {
            return (
              <div key={item.id}>
                <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[#ababab] font-semibold tracking-wide text-[1.30rem]">
                      {item.name}
                    </h1>
                    <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-3">
                      <RiDeleteBin2Fill
                        onClick={() => handleRemove(item.id)}
                        className="text-[#ababab] cursor-pointer"
                        size={20}
                      />
                      <FaNotesMedical
                        className="text-[#ababab] cursor-pointer"
                        size={20}
                      />
                    </div>
                    <p className="text-[#f5f5f5] text-sm font-bold">${item.price}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
