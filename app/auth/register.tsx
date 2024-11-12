import { Link } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  return (
    <>
      <Text>Register</Text>
      <Link href="/auth/login">Login</Link>
    </>
  );
}
