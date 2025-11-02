// src/api/Authapi.tsx
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";  // ✅ corrected port

export const signupUser = async (userData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Signup Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};
