import React from "react";
import { popularDishes } from "../../constants/index";
const PopularDishes = () => {
  return (
    <div className="mt-3 pr-6">
      <div className="bg-[#1f1f1f] w-full rounded-lg pb-4">
        <div className="flex justify-between px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            view all
          </a>
        </div>

        <div className="overflow-y-scroll h-[555px] no-scrollbar">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 mt-3 bg-[#1a1a1a] rounded-[15px]
                        px-6 py-4 mx-6"
            >
              <h1 className="text-[#f5f5f5] font-bold text-xl
              mr-3">{dish.id < 10 ? `0${dish.id}` : `${dish.id}`}</h1>
              <img
                src={dish.image}
                alt={dish.name}
                className="w-[50px] h-[50px]
                            rounded-full"
              />
              <div>
                <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{dish.name}</h1>
                <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                  <span className = 'text-[#ababab]'>Orders: </span>
                  {dish.numberOfOrders}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
