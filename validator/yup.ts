import * as yup from 'yup';


yup.setLocale({
  string: {
    email: 'O campo email deve ser um email válido',
  }
})

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=-])(?=\S+$).{8,}$/;
yup.addMethod(yup.string, 'password', function (message?: string) {
  return this.matches(
    passwordRegex,
    message || 'Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
  );
});

yup.addMethod(yup.string, 'confirmPassword', function (message?: string) {
  return this.test('password-match', message || 'Senhas não são iguais', function (value) {
    return this.parent.password === value;
  });
});

yup.addMethod(yup.string, 'confirmEmail', function (message?: string) {
  return this.test('email-match', message || 'Emails não são iguais', function (value) {
    return this.parent.email === value;
  });
});

export default yup;
