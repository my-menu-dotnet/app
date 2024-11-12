import { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  errorMessage?: string;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <View className="mb-4">
        {label && <Text className="mb-2 color-gray-600">{label}</Text>}
        <View className="border border-gray-300 rounded px-2 h-14 justify-center">
          <TextInput className="h-full w-full" ref={ref} {...rest} />
        </View>
        {errorMessage && <Text>{errorMessage}</Text>}
      </View>
    );
  }
);

export default Input;
