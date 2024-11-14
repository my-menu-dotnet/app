import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function AuthLayout() {
  const [current, setCurrent] = useState<"login" | "register">("login");

  return (
    <>
      <SafeAreaView className="bg-primary">
        <View className="w-full justify-center items-center h-[25vh] py-4">
          <Logo width={"100%"} height={"100%"} />
        </View>
      </SafeAreaView>

      <Stack
        screenOptions={{
          header: () => null,
          contentStyle: {
            backgroundColor: "#FFC303",
          },
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          listeners={{
            focus: () => setCurrent("login"),
          }}
          name="login"
        />
        <Stack.Screen
          listeners={{
            focus: () => setCurrent("register"),
          }}
          name="register"
        />
      </Stack>
    </>
  );
}
