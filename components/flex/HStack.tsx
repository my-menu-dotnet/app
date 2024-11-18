import { View, ViewProps } from "react-native";

type HStackProps = ViewProps & {
  children: React.ReactNode;
};

export default function HStack({ children, className, ...rest }: HStackProps) {
  return (
    <View className={`flex flex-row space-x-4 ${className}`} {...rest}>
      {children}
    </View>
  );
}
