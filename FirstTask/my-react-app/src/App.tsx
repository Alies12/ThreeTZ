import { useEffect, useState } from "react";
import "./App.css";
import lopIcon from "../public/Lop.png";
import phoneIcon from "../public/PhoneIcon.png";
import mailIcon from "../public/MailIcon.png";
import Popup from "./shared/components/Popup/popup.tsx";
import React from "react";
import User from "./shared/components/Interface/userInterface.tsx";
import fetchUsers from "./api/api.tsx";
import PopupState from "./shared/components/Interface/popupStateInterface.tsx";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [serchTerm, setSearchTerm] = useState<string>("");
  const [popupState, setPopupState] = useState<PopupState>({
    isOpen: false,
    selectedUser: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (serchTerm.trim() || serchTerm === "") {
        const getUsers = async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await fetchUsers(serchTerm);
            setUsers(data);
          } catch (error) {
            setError(
              error instanceof Error ? error.message : "Произошла ошибка"
            );
          } finally {
            setLoading(false);
          }
        };
        getUsers();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [serchTerm]);

  const handleDivClick = (user: User) => {
    setPopupState({ isOpen: true, selectedUser: user });
  };
  const handleClosePopup = () => {
    setPopupState({ isOpen: false, selectedUser: null });
  };

  return (
    <div className=" absolute min-w-[1200px] left-[180px] top-[50px] w-[1121] h-[314]">
      <div className="relative ">
        <i className="absolute top-[30%] left-[97%]">
          <img className="w-[19px] h-[19px] " src={lopIcon} />
        </i>
        <input
          id="seacrhInput"
          className=" indent-3 h-[48px] w-full border-gray-300  shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 gap-[24px] rounded-3xl "
          value={serchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className=" flex flex-col grid  md:grid-cols-3 pt-[24px] gap-[24px]">
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        {users.length === 0 && !loading && !error && serchTerm.length !== 0 && (
          <p>Пользователи не найдены</p>
        )}
        {users.map((user, i) => {
          return (
            <>
              <div
                key={user.name + i}
                onClick={() => handleDivClick(user)}
                className="flex flex-col  w-[auto] h-[314px]  bg-white  rounded-lg shadow-md  p-[24px]"
              >
                <h2
                  className="font-ProximaNova mb-4 w-[211px] h-[30px] font-bold text-[24px] leading-[30px] tracking-normal"
                  key={`user-name-${user.name}- ${i}`}
                >
                  {user.name}
                </h2>
                <p
                  className="flex mb-4 text-[#8189A3] mb-1 gap-[12px] text-[14px] ml-1"
                  key={`user-phone-${user.phone}- ${i}`}
                >
                  <img className="w-[14px] h-[24px] " src={phoneIcon} />
                  {user.phone}
                </p>
                <p
                  className="flex mb-4 text-[#8189A3] gap-[12px] text-[14px]"
                  key={`user-email-${user.email}- ${i}`}
                >
                  <img className="w-[24px] h-[14px] mt-1" src={mailIcon} />
                  {user.email}
                </p>
              </div>
            </>
          );
        })}

        <Popup
          isOpen={popupState.isOpen}
          onClose={handleClosePopup}
          data={popupState.selectedUser || null}
        />
      </div>
    </div>
  );
}
export default App;
