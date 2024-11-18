import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FormControl from "./FormControl";

type InputProps = TextInputProps & {
  label?: string;
  errorMessage?: FieldError | undefined;
  type?: "text" | "password";
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  onChange?: (text: string) => void;
};

const Input = forwardRef<TextInput, InputProps>(
  (
    { label, errorMessage, type = "text", rightIcon, leftIcon, ...rest },
    ref
  ) => {
    const isPassword = type === "password";
    const hasError = !!errorMessage;
    const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

    return (
      <FormControl errorMessage={errorMessage?.message} label={label}>
        <View
          className={`relative border rounded-lg px-4 h-12 items-center flex-row
            ${!hasError ? "border-gray-300" : "border-danger"}`}
        >
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <TextInput
            className="h-full flex-1"
            placeholderTextColor={"#d1d5db"}
            secureTextEntry={!isPasswordVisible}
            ref={ref}
            onChangeText={rest.onChange}
            {...rest}
          />
          {rightIcon && (
            <View className="absolute right-4 justify-center h-full">
              {rightIcon}
            </View>
          )}
          {isPassword && (
            <Pressable
              className="absolute right-4 justify-center h-full"
              onPress={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? (
                <Feather name="eye" size={18} color="black" />
              ) : (
                <Feather name="eye-off" size={18} color="black" />
              )}
            </Pressable>
          )}
        </View>
      </FormControl>
    );
  }
);

export default Input;
