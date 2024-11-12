import { forwardRef } from "react";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
  className?: PressableProps["className"];
};

const Button = forwardRef(
  ({ title, onPress, className, ...rest }: ButtonProps, ref) => {
    return (
      <Pressable
        className={`bg-blue-500 text-white rounded h-12 px-2 flex justify-center items-center mb-4 ${className}`}
        onPress={onPress}
        {...rest}
      >
        <Text className="color-white font-bold">{title}</Text>
      </Pressable>
    );
  }
);

export default Button;
