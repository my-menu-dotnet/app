import { forwardRef } from "react";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
  className?: PressableProps["className"];
  type?: "outline" | "filled";
};

const Button = forwardRef(
  (
    { title, onPress, className, type = "filled", ...rest }: ButtonProps,
    ref
  ) => {
    const style = {
      outline: "bg-transparent border border-primary",
      filled: "bg-primary",
    };

    return (
      <Pressable
        className={`${style[type]} text-white rounded h-12 px-2 flex justify-center items-center mb-4 ${className}`}
        onPress={onPress}
        {...rest}
      >
        <Text className="color-white font-bold">{title}</Text>
      </Pressable>
    );
  }
);

export default Button;
