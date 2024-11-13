import { Stack } from "expo-router";
import { View } from "react-native";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <>
      <SafeAreaView className="bg-primary">
        <View className="w-full justify-center items-center h-[30vh] bg-primary">
          <Logo width={120} height={120} />
        </View>
      </SafeAreaView>

      <Stack
        screenOptions={{
          header: () => null,
          contentStyle: {
            backgroundColor: "#FFC303",
          },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
}
