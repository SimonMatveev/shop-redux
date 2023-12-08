import { FC } from 'react'
import { REG_EXP_EMAIL, REG_EXP_NAME } from '../../utils/constants';
import { EInputType, ISignup } from '../../types/types';
import { useSignInMutation, useSignUpMutation } from '../../store/api/users.storeApi';
import AuthForm from '../auth-form/AuthForm';

const inputs = [
  {
    name: 'name',
    nameText: 'Имя',
    type: EInputType.TEXT,
    options: {
      pattern: REG_EXP_NAME,
      minLength: '2',
      maxLength: '30',
      autoComplete: 'name',
    },
  }, {
    name: 'email',
    nameText: 'E-mail',
    type: EInputType.EMAIL,
    options: {
      pattern: REG_EXP_EMAIL,
      autoComplete: 'email',
    },
  }, {
    name: 'password',
    nameText: 'Пароль',
    type: EInputType.PASSWORD,
    options: {
      minLength: '2',
      maxLength: '30',
      autoComplete: 'new-password'
    },
  }, {
    name: 'password_2',
    nameText: 'Введите пароль повторно',
    type: EInputType.PASSWORD,
    options: {
      autoComplete: 'new-password'
    },
  },
];

const Signup: FC = () => {
  const [signUp, { error: signUpError, isLoading: signUpIsLoading }] = useSignUpMutation();
  const [signIn, { isLoading: signInIsLoading }] = useSignInMutation();

  const handleSignup = ({ name, email, password }: ISignup) => {
    signUp({ name, email, password }).unwrap()
      .then(() => signIn({ email, password }))
      .catch(err => console.log(err))
  }

  return (
    <AuthForm
      handleSubmit={handleSignup}
      apiError={signUpError as string}
      buttonText='Войти'
      isFormLoading={signUpIsLoading && signInIsLoading}
      linkText='Войти'
      link='/signin'
      questionText='Уже зарегистрированы?'
      title='Добро пожаловать'
      inputs={inputs}
      passwordCheck={true}
    />
  )
}

export default Signup