import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import secureStore from "./secureStore";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default api;
