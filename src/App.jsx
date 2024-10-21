import { useState } from "react";
import cart from "./asset/icon-add-to-cart.svg";
import illustration from "./asset/illustration-empty-cart.svg";
import data from "./data.json";

function App() {
  return (
    <div className=" bg-[#fcf9f7] absolute inset-0 font-redhat px-5 py-5 flex flex-col items-center h-fit">
      <h1 className=" text-[40px] font-bold text-[#260f08] self-start ">
        Desserts
      </h1>
      <div>
        {data.map((dessert) => (
          <>
            <div className="  relative flex justify-center items-center w-fit h-[310px]">
              <img
                src={dessert.image.mobile}
                alt=""
                srcset=""
                className=" rounded-xl my-5 w-[375px]"
              />
              <button className="absolute bottom-0 flex justify-center items-center border border-[#87635a] bg-[#fcf9f7] w-[200px] h-[60px] rounded-full p-[10px] ">
                <img src={cart} alt="" srcset="" className="m-2" />
                <span className=" text-[18px] font-semibold">
                  Add to cart
                </span>{" "}
              </button>
            </div>
            <div className="">
              <h4 className=" text-[#87635a] text-[14px]">{dessert.category}</h4>
              <h3 className=" text-[20px] font-semibold">
                {dessert.name}
              </h3>
              <p className=" text-[#c73a0f] font-semibold ">${dessert.price}</p>
            </div>{" "}
          </>
        ))}
      </div>
      <div className=" h-fit bg-white rounded-2xl p-10  pt-7 my-10">
        <h2 className=" text-[30px] text-[#c73a0f] font-bold ">
          Your Cart (0){" "}
        </h2>
        <div className="  flex flex-col justify-center items-center m-5">
          <img src={illustration} alt="" srcset="" />
          <span className=" text-[#87635a] mt-4">
            Your added items will appear here
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
