import { useAuth } from "@/hooks/useAuth";
import { UserProvider } from "@/hooks/useUser";
import { Redirect, Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          header: () => null,
          tabBarActiveTintColor: "#FFC303",
        }}
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
