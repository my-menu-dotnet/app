import Input from "@/components/form/Input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/form/Button";
import yup from "@/validator/yup";

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email é obrigatório"),
  password: yup.string().password().required("Senha é obrigatória"),
});

export default function Page() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <View className="flex-1 px-8 rounded-t-2xl elevation-md shadow bg-gray-50">
      <View className="w-full items-center mt-8">
        <Text className="text-2xl">Bem vindo de volta</Text>
        <Text className="text-gray-500">Faça login para continuar</Text>
      </View>

      <View className="flex-1 justify-center">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              errorMessage={errors.email}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Digite seu email"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              errorMessage={errors.password}
              placeholder="Digite sua senha"
              type="password"
              {...field}
            />
          )}
        />

        <View className="mt-[-4px] mb-4">
          <Link href={"/auth/login"}>
            <Text className="text-md text-gray-500">Esqueci minha senha</Text>
          </Link>
        </View>

        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>

      <View className="mb-12 items-center">
        <Text className="text-md text-gray-500">
          Não tem uma conta?{" "}
          <Link href={"/auth/register"}>
            <Text className="text-primary">Registre-se</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
