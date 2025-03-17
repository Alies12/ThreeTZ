import User from "../shared/components/Interface/userInterface";
import axios from "axios";

const fetchUsers = async (term: string): Promise<User[]> => {
  let url = "http://[::1]:3000/";
  try {
    if (term.trim()) {
      url += `?term=${encodeURIComponent(term.trim())}`;
    }
    const response = await axios.get<User[]>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Произошла неизвестная ошибка");
    }
  }
};
export default fetchUsers;
