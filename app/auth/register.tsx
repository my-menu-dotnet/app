import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import api from "@/services/api";
import { ErrorReponse } from "@/types/error";
import yup from "@/validator/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

type RegisterFormInputs = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email é obrigatório"),
  confirmEmail: yup
    .string()
    .confirmEmail()
    .required("Confirmação de email é obrigatória"),
  password: yup.string().required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .confirmPassword()
    .required("Confirmação de senha é obrigatória"),
});

export default function Page() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterFormInputs) => api.post("/auth/register", data),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso",
        text2: "Faça login para acessar sua conta",
      });
      router.push("/auth/login");
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error.response?.data?.message ?? "",
      });
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    mutate(data);
  };

  return (
    <View className="flex-1 px-8 rounded-t-2xl elevation-md shadow bg-gray-50">
      <View className="w-full items-center mt-8">
        <Text className="text-2xl">Cadastre-se, é grátis!</Text>
        <Text className="text-gray-500">Preencha os campos abaixo</Text>
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
          name="confirmEmail"
          control={control}
          render={({ field }) => (
            <Input
              errorMessage={errors.confirmEmail}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Confirme seu email"
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
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              errorMessage={errors.confirmPassword}
              placeholder="Confirme sua senha"
              type="password"
              {...field}
            />
          )}
        />

        <Button
          title="Registrar"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View className="mb-6 items-center">
        <Text className="text-md text-gray-500">
          Já tem conta?{" "}
          <Link href={"/auth/login"}>
            <Text className="text-primary">Login</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
