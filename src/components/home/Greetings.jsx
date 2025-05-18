import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const userData = useSelector(state => state.user)
  const [dataTime, setDateTime] = useState(new Date())
  
  useEffect(()=> {
    const time = setInterval(() => setDateTime(new Date()), 1000)
    return () => clearInterval(time)
  }, [])

  const formateDate = (date) => {
    const months = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
    ]

    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')},${date.getFullYear()}`
  }

  const formateTime = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    
  return (
    <div className="flex justify-between items-center px-8 mt-1">
      <div>
        <h1 className="text-red-500 text-2xl font-semibold tracking-wide">
          HELLO, {userData.name || 'Test User'}
        </h1>
        <p className="text-[#ababab] text-sm">
          Give your best services for customers 😃
        </p>
      </div>
      <div>
        <h1 className="text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]">{formateTime(dataTime)}</h1>
        <p className="text-[#ababab] text-sm">{formateDate(dataTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
