import axios from "axios";
import { useAuthStore } from "@/store";

const validateStatus = (status: number) => {
  if (status === 401) {
    logout();
  }
  return status >= 200 && status < 300;
};

const baseURL = import.meta.env.VITE_API_URL;

const axiosInst = axios.create({
  baseURL,
  timeout: 50_000,
  validateStatus,
});

axiosInst.interceptors.request.use((config) => {
  const token = useAuthStore.getState().creds.token;
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return { ...config };
});

axiosInst.interceptors.response.use(
  (config) => config.data,
  (err) => Promise.reject(err.response.data),
);

const logout = () => {
  console.log("logout Called axiosConfig.ts:31");
  useAuthStore.getState().resetCreds();
  window.location.reload();
};

export { axiosInst, logout };
