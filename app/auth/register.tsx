import yup from "@/validator/yup";
import { Link } from "expo-router";
import { Text } from "react-native";

type RegisterFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email é obrigatório"),
  confirmEmail: yup.string().confirmEmail(),
  password: yup.string().required("Senha é obrigatória"),
});

export default function Page() {
  return (
    <>
      <Text>Register</Text>
      <Link href="/auth/login">Login</Link>
    </>
  );
}
