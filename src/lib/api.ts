import axios from "axios";
import { logResponse, logError } from "./debug";

//API Config
const api = axios.create({
  baseURL: "https://techtest.youapp.ai",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
});

//Valid Token Checker
export const isValidToken = (token: string): boolean => {
  try {
    // Token harus memiliki 3 bagian
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Header harus berisi alg
    const header = JSON.parse(atob(parts[0]));
    if (!header.alg) return false;

    // Payload harus berisi exp
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;

    // Cek expiry
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

//Protected with token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    const cleanedToken = token.replace(/\s+/g, "").trim();

    // Gunakan header khusus x-access-token
    config.headers["x-access-token"] = cleanedToken; // 🚀 PERUBAHAN PENTING

    // Hapus header Authorization lama
    delete config.headers.Authorization;
  }
  return config;
});

//Protected with token
api.interceptors.response.use(
  (response) => {
    logResponse(response);
    return response;
  },
  (error) => {
    logError(error);

    // Deteksi khusus 'No token provided'
    if (error.response?.data?.message === "No token provided") {
      console.warn("🔑 Token Validation Issue Detected");
      console.log("Stored Token:", localStorage.getItem("token"));

      // Cek apakah token ada di localStorage
      if (!localStorage.getItem("token")) {
        console.error("Critical: Token is missing in localStorage");
      }
    }

    return Promise.reject(error);
  }
);

//API
export const authAPI = {
  login: (email: string, password: string, username: string) =>
    api.post("/api/login", { email, password, username }),

  register: (email: string, username: string, password: string) =>
    api.post("/api/register", { email, username, password }),
};

export const profileAPI = {
  getProfile: () => api.get("/api/getProfile"),

  updateProfile: (data: any) => api.put("/api/updateProfile", data),

  createProfile: (data: any) => api.post("/api/createProfile", data),
};
