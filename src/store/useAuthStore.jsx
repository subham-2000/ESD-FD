import { create } from "zustand";
import instance from "../api/axios";
import axios from "axios";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  token: localStorage.getItem("token") || "", // Check localStorage on initial load
  courseId: null,
  branches: [],
  courses: [],
  students: [],

  login: async (data) => {
    try {
      const res = await axios.post("http://localhost:8083/api/login", data);
  
      // Extract token and email
      const token = res.data.jwt;
      const email = res.data.email;
  
      // Update Zustand state
      set({ authUser: email, token });
  
      // Store the token in localStorage
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      return true; // Login successful
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      return false; // Login failed
    }
  },

  logout: () => {
    set({ authUser: "", token: "" });
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },

  // Set token from localStorage (for page reload or initial load)
  setToken: (token) => {
    set({ token });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  setBranches: async () => {
    try {
      const res = await instance.get("/domain");
      set({ branches: res.data });
    } catch (error) {
      console.error(error.response.data.message);
    }
  },

  setCourseId: (data) => {
    set({ courseId: data });
  },

  setCourses: async () => {
    try {
      const domainId = get().courseId; // Retrieve domainId from the state
      if (!domainId) {
        console.error("Domain ID is not set!");
        return;
      }
      const res = await instance.get(`/domain/domainid/${domainId}`);
      set({ courses: res.data });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },

  fetchStudentsByCourseId: async (courseId) => {
    try {
      const res = await instance.get(`/studentcourse/${courseId}`);
      set({ students: res.data });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  },
  
}));
