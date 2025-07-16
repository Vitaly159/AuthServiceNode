import axios from "axios";
import { userApiPath } from "./api";
import { IUser } from "../models/userModel";

export const getUserByEmail = async (email: string): Promise<IUser> => {
  const { data: user } = await axios.get(userApiPath + "/users/email/" + email);
  return user;
};
