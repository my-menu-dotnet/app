import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function CompanyLayout() {  
  return (
    <Stack
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: "#fff",
        },
        animation: "simple_push"
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
