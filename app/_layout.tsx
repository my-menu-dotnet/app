import { Slot, Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
