import { apiClient } from "@/helpers/api-client";

export type LOGIN_FORM_VALUES = {
  email: string;
  password: string;
};
export type REGISTER_FORM_VALUES = {
  username: string;
  email: string;
  password: string;
};
export const loginUser = async (data: LOGIN_FORM_VALUES) => {
  return apiClient.post("api/users/login", data);
};
export const registerUser = async (data: REGISTER_FORM_VALUES) => {
  return apiClient.post("api/users/signup", data);
};
export const verifyUserEmail = async (data: { token: string }) => {
  return apiClient.post("api/users/verifyEmail", data);
};
export const logoutUser = async () => {
  return apiClient.get("api/users/logout");
};
