import Input from "@/components/form/Input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/form/Button";

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Page() {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <View className="w-[90vw] max-w-[300px]">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input label="Email" placeholder="Digite seu email" {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            textContentType="password"
            secureTextEntry
            {...field}
          />
        )}
      />
      <View className="flex items-end">
        <Button
          className="w-[50%]"
          title="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <Link href="/auth/register">Register</Link>
    </View>
  );
}
