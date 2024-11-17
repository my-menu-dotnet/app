import { forwardRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

type ButtonProps = PressableProps & {
  title: string;
  type?: "outline" | "filled";
  loading?: boolean;
  className?: PressableProps["className"];
  onPress: () => void;
};

const Button = forwardRef(
  (
    {
      title,
      onPress,
      className,
      loading,
      type = "filled",
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const style = {
      outline: "bg-transparent border border-primary",
      filled: "bg-primary",
    };
    const isDisabled = rest.disabled;

    return (
      <Pressable
        className={`
            text-white rounded h-12 px-2 flex justify-center items-center mb-4 
            ${isDisabled ? "opacity-50" : ""}
            ${style[type]}
            ${className}
            `}
        onPress={onPress}
        disabled={isDisabled}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="color-white font-bold">{title}</Text>
        )}
      </Pressable>
    );
  }
);

export default Button;
