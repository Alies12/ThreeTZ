import "./popup.css";
import React from "react";

const Popup = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  return (
    <div
      id="popup-overlay"
      onClick={(e) => {
        if (e.target.id === "popup-overlay") onClose();
      }}
      className="Popup"
    >
      <div className="bg-white w-[500px] rounded-2xl -full  p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="">
          <h1 className="text-[24px] font-bold mb-4 text-[#262C40] ">
            {data.name}
          </h1>
          <div class="flex flex-col space-y-2 max-w-md mx-auto rounded-lg">
            <div class="flex ">
              <p class="text-[18px] w-32 text-[#262C40] font-semibold">
                Телефон:
              </p>
              <p class="text-[16px] text-[#8189A3] ml-8">{data.phone}</p>
            </div>

            <div class="flex ">
              <p class=" text-[18px] w-32 text-[#262C40] font-semibold">
                Почта:
              </p>
              <p class=" text-[16px] text-[#8189A3] ml-8">{data.email}</p>
            </div>

            <div class="flex ">
              <p class=" text-[18px] w-32 text-[#262C40] font-semibold">
                Дата приема:
              </p>
              <p class=" text-[16px] text-[#8189A3] ml-8">{data.hire_date}</p>
            </div>

            <div class="flex ">
              <p class="text-[18px] w-32 text-[#262C40] font-semibold">
                Должность:
              </p>
              <p class=" text-[16px] text-[#8189A3] ml-14">
                {data.position_name}
              </p>
            </div>

            <div class="flex">
              <p class=" text-[18px] w-32 text-[#262C40] font-semibold">
                Подразделение:
              </p>
              <p class=" text-[16px] text-[#8189A3] ml-8">{data.department}</p>
            </div>
            <div class="flex">
              <p class=" text-[18px] w-32 text-[#262C40] font-semibold">
                Адресс:
              </p>
              <p class=" text-[16px] text-[#8189A3] ml-8">{data.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
