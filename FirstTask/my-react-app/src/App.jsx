import { useEffect, useState } from "react";
import "./App.css";
import lopIcon from "../public/lop.png";
import phoneIcon from "../public/PhoneIcon.png";
import mailIcon from "../public/MailIcon.png";
import Popup from "./shared/components/popup.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [serchTerm, setSearchTerm] = useState("");
  const [popupState, setPopupState] = useState({
    isOpen: false,
    selectedUser: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = "http://[::1]:3000/";
      if (serchTerm.trim()) {
        url += `?term=${encodeURIComponent(serchTerm.trim())}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers(serchTerm);
  }, [serchTerm]);

  const handleDivClick = (user) => {
    setPopupState({ isOpen: true, selectedUser: user });
  };
  const handleClosePopup = () => {
    setPopupState({ isOpen: false, selectedUser: null });
  };

  return (
    <div className=" absolute left-[180px] top-[50px] w-[1121] h-[314]">
      <div className="relative ">
        <i className="absolute top-[30%] left-[97%]">
          <img className="w-[19px] h-[19px] " src={lopIcon} />
        </i>
        <input
          className=" indent-3 h-[48px] w-full border-gray-300  shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 gap-[24px] rounded-3xl "
          value={serchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className=" flex flex-col grid  md:grid-cols-3 pt-[24px] gap-[24px]">
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}

        {users.map((user, i) => {
          return (
            <>
              <div
                key={user.name + i}
                onClick={() => handleDivClick(user)}
                className="flex flex-col  w-[auto] h-[314px]  bg-white  rounded-lg shadow-md  p-[24px]"
              >
                <h2 className="font-ProximaNova mb-4 w-[211px] h-[30px] font-bold text-[24px] leading-[30px] tracking-normal">
                  {user.name}
                </h2>
                <p className="flex mb-4 text-[#8189A3] mb-1 gap-[12px] text-[14px] ml-1">
                  <img className="w-[14px] h-[24px] " src={phoneIcon} />
                  {user.phone}
                </p>
                <p className="flex mb-4 text-[#8189A3] gap-[12px] text-[14px]">
                  <img className="w-[24px] h-[14px] mt-1" src={mailIcon} />
                  {user.email}
                </p>
              </div>
            </>
          );
        })}
        <ul className="mx-auto mt-2">
          <Popup
            isOpen={popupState.isOpen}
            onClose={handleClosePopup}
            data={popupState.selectedUser || {}}
          />
        </ul>
      </div>
    </div>
  );
}
export default App;
