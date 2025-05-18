import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, removeAllItmes } from "../../redux/slices/cartSlice";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addOrder, updateTable } from "../../https";
import { removeCustomer } from "../../redux/slices/customerSlice";
import Invoince from "../invoince/Invoince";

const Bill = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("payment-status");
  const cartData = useSelector((state) => state.cart);
  const customerData = useSelector((state) => state.customer);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const [totalPriceWithTax, setTotalPriceWithTax] = useState(0);

  const [paymentMethod, setPyamentMethod] = useState();
  const [showInvoince, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    setTotalPriceWithTax(total + tax);
    if (status && status === "success") {
      //place order
      const getCustData = JSON.parse(localStorage.getItem("customerData"));
      const getCartData = JSON.parse(localStorage.getItem("cartData"));
      const getCustBillInfo = JSON.parse(localStorage.getItem("custBillInfo"));
      if (getCustData && getCartData && getCustBillInfo) {
        enqueueSnackbar("Payment Successfull", { variant: "success" });
        const orderData = {
          customerDetails: {
            name: getCustData.customerName,
            phone: getCustData.customerPhone,
            guests: getCustData.guests,
          },
          orderStatus: "In Progress",
          bills: getCustBillInfo, //Object
          items: getCartData,
          table: getCustData.table?.tableId,
          paymentMethod: paymentMethod,
        };

        setTimeout(() => {
          orderMutation.mutate(orderData);
        }, 1500);
      }
    }
    if (status && status === "cancel") {
      enqueueSnackbar("Payment Cancelled", { variant: "error" });
    }
    if (status && status === "failure") {
      enqueueSnackbar("Payment Failed", { variant: "error" });
    }
  }, [total]);

  const handlePlaceOrder = async () => {
    // console.log("code came here!");

    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });
      return;
    }
    if (!total) {
      enqueueSnackbar("Please Select some item to continue", {
        variant: "warning",
      })
      return;
    }

    //handle bill
    try {
      // console.log("Bhai ene to thik ei ache: ", totalPriceWithTax);
      const custBillInfo = {
        total: total,
        tax: tax,
        totalWithTax: totalPriceWithTax,
      };
      localStorage.setItem("custBillInfo", JSON.stringify(custBillInfo));
      localStorage.setItem("customerData", JSON.stringify(customerData));
      localStorage.setItem("cartData", JSON.stringify(cartData));
      if (paymentMethod === "Online") {
        const { data } = await axios.post(
          `http://localhost:8000/api/payment/bkash/create-order`,
          {
            amount: totalPriceWithTax.toFixed(2),
          }
        );

        window.location.href = data.data?.bkashURL;
        // console.log(data, totalPriceWithTax);
      } else {
        const getCustData = JSON.parse(localStorage.getItem("customerData"));
        const getCartData = JSON.parse(localStorage.getItem("cartData"));
        const getCustBillInfo = JSON.parse(
          localStorage.getItem("custBillInfo")
        );

        const orderData = {
          customerDetails: {
            name: getCustData.customerName,
            phone: getCustData.customerPhone,
            guests: getCustData.guests,
          },
          orderStatus: "In Progress",
          bills: getCustBillInfo, //Object
          items: getCartData,
          table: getCustData.table?.tableId,
          paymentMethod: paymentMethod,
        };

        orderMutation.mutate(orderData);
      }
    } catch (error) {
      console.log(error);
      // console.log("Here")
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      // console.log(data);

      setOrderInfo(data);

      //Upadate table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed", { variant: "success" });
      setShowInvoice(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData);
      dispatch(removeCustomer());
      localStorage.removeItem("customerData");
      dispatch(removeAllItmes());
      localStorage.removeItem("cartData");
      localStorage.removeItem("custBillInfo");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ${total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">${tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPyamentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab]
        font-semibold ${paymentMethod === "Cash" ? "bg-[#383737]" : ""}`}
        >
          Cash
        </button>
        <button
          onClick={() => setPyamentMethod("Online")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab]
        font-semibold ${paymentMethod === "Online" ? "bg-[#383737]" : ""}`}
        >
          Online
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5]
        font-semibold text-lg"
        >
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f]
        font-semibold text-lg"
        >
          Place Order
        </button>
      </div>
      {showInvoince && (
        <Invoince orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
