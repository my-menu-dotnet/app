import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
