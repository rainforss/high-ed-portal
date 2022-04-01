import axios from "axios";
import { LoginValues } from "../pages/login";
import { RegistrationValues } from "../pages/register";

export const submitRegistration = async (info: RegistrationValues) => {
  try {
    const { confirmPassword, ...user } = info;
    const result = await axios.post("/api/users/register", { user });
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const login = async (info: LoginValues) => {
  const { username, password } = info;
  try {
    const result = await axios.post("/api/users/authenticate", {
      username,
      password,
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};
