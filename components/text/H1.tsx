import { Text } from "react-native";

type H1Props = {
  children: string;
};

export default function H1({ children }: H1Props) {
  return <Text className="text-lg font-semibold">{children}</Text>;
}
