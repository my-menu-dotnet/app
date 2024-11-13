import { StringSchema } from "yup";

declare module 'yup' {
  interface StringSchema {
    password(message?: string): StringSchema;
    confirmPassword(message?: string): StringSchema;
    confirmEmail(message?: string): StringSchema;
  }
}
