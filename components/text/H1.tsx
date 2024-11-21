import { Text, TextProps } from "react-native";

type H1Props = TextProps & {
  children: React.ReactNode;
};

export default function H1({ children, className, ...rest }: H1Props) {
  return (
    <Text className={`text-lg font-semibold ${className}`} {...rest}>
      {children}
    </Text>
  );
}
