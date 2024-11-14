import { Slot, Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <Toast />
      </QueryClientProvider>
    </AuthProvider>
  );
}
