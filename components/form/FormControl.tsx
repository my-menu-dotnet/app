import { Text, View, ViewProps } from "react-native";

type FormControlProps = ViewProps & {
  children: React.ReactNode;
  errorMessage?: string;
  label?: string;
};

const FormControl = ({
  children,
  errorMessage,
  label,
  ...rest
}: FormControlProps) => {
  return (
    <View className="mb-4" {...rest}>
      <Label message={label} />
      {children}
      <ErrorMessage message={errorMessage} />
    </View>
  );
};

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <>
      {message && (
        <Text className="mt-[2px] text-danger text-sm">{message}</Text>
      )}
    </>
  );
};

type LabelProps = {
  message?: string;
};

const Label = ({ message }: LabelProps) => {
  return (
    <>{message && <Text className="mb-2 color-gray-600">{message}</Text>}</>
  );
};

FormControl.Label = Label;
FormControl.ErrorMessage = ErrorMessage;

export default FormControl;
