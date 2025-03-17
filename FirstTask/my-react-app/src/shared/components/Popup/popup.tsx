import "./popup.css";
import React from "react";
import PopupProps from "../Interface/popupInterface";

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div
      key="popup-overlay"
      onClick={(el: React.MouseEvent<HTMLDivElement>) => {
        if (
          el.target instanceof HTMLDivElement &&
          el.target.id === "popup-overlay"
        )
          onClose();
      }}
      className="Popup"
    >
      <div
        className="bg-white w-[500px] rounded-2xl -full  p-6 relative"
        key="button-detail"
      >
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

        <div key={"popup-body"}>
          <h1
            className="text-[24px] font-bold mb-4 text-[#262C40]"
            key="popup-title"
          >
            {data.name}
          </h1>
          <div
            className="flex flex-col space-y-2 max-w-md mx-auto rounded-lg"
            key="popup-detail"
          >
            <div className="flex" key="phone-detail">
              <p className="text-[18px] w-32 text-[#262C40] font-semibold">
                Телефон:
              </p>
              <p className="text-[16px] text-[#8189A3] ml-8">{data.phone}</p>
            </div>

            <div className="flex" key="email-detail">
              <p className=" text-[18px] w-32 text-[#262C40] font-semibold">
                Почта:
              </p>
              <p className=" text-[16px] text-[#8189A3] ml-8">{data.email}</p>
            </div>

            <div className="flex" key="hire_date-detail">
              <p className=" text-[18px] w-32 text-[#262C40] font-semibold">
                Дата приема:
              </p>
              <p className=" text-[16px] text-[#8189A3] ml-8">
                {data.hire_date}
              </p>
            </div>

            <div className="flex" key="position-detail">
              <p className="text-[18px] w-32 text-[#262C40] font-semibold">
                Должность:
              </p>
              <p className=" text-[16px] text-[#8189A3] ml-14">
                {data.position_name}
              </p>
            </div>

            <div className="flex" key="department-detal">
              <p className=" text-[18px] w-32 text-[#262C40] font-semibold">
                Подразделение:
              </p>
              <p className=" text-[16px] text-[#8189A3] ml-8">
                {data.department}
              </p>
            </div>
            <div className="flex">
              <p
                className=" text-[18px] w-32 text-[#262C40] font-semibold"
                key="addres-detal"
              >
                Адресс:
              </p>
              <p className=" text-[16px] text-[#8189A3] ml-8">{data.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
