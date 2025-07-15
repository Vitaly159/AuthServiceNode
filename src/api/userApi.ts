import axios from "axios";
import { userApiPath } from "./api";

export const getUserByEmail = async (email: string) => {
  const { data: user } = await axios.get(userApiPath + "/users/email/" + email);
  return user;
};
