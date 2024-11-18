import { Slot } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationProvider } from "@/hooks/useLocation";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
        <QueryClientProvider client={queryClient}>
          <Slot />
          <Toast />
        </QueryClientProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
