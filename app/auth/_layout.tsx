import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => null,
        contentStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
