import axios from "axios";

export const BaseURL = process.env.NEXT_PUBLIC_API_BASEURL;
const axiosInterceptorInstance = axios.create({
  baseURL: BaseURL, // Replace with your API base URL
});
axiosInterceptorInstance.defaults.withCredentials = true;

export const setAuthToken = (authToken?: string) => {
  try {
    const token =
      typeof window !== "undefined"
        ? (sessionStorage.getItem("Token") as string)
        : null;
    if (authToken) {
      axiosInterceptorInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
    if (token) {
      axiosInterceptorInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.log(err, "err");
  }
};
setAuthToken();
export const DeleteAuthToken = () => {
  delete axiosInterceptorInstance.defaults.headers.common.Authorization;
};
export const handleLogout = async () => {
  //Clear session and redirect

  if (typeof window !== "undefined") {
    sessionStorage.clear();
    localStorage.clear();

    // window.location.href = "/login";
  }
};
// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    if (error.response) {
      // Optionally handle different status codes
      if (error.response.status === 401 && typeof window !== "undefined") {
        if (window.location.pathname !== "/login") {
          handleLogout();
        }
        return Promise.reject(error);
      }
      // Pass the error message from the server to the promise rejection
      return Promise.reject(error.response.data);
    }
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
