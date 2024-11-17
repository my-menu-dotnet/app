import { Redirect, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

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
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
}
