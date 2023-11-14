import { FC } from 'react'
import AuthForm from '../auth-form/AuthForm'
import { useSignInMutation } from '../../store/api/users.storeApi'
import { EInputType } from '../../types/types';
import { REG_EXP_EMAIL } from '../../utils/constants';

const inputs = [
  {
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
      autoComplete: 'current-password',
    },
  },
];

const Signin: FC = () => {
  const [signIn, { isLoading, error }] = useSignInMutation();
  return (
    <AuthForm
      handleSubmit={signIn}
      apiError={error as string}
      buttonText='Войти'
      isFormLoading={isLoading}
      linkText='Зарегистрироваться'
      link='/signup'
      questionText='Ещё нет аккаунта?'
      title='Мы по вам соскучились'
      inputs={inputs}
    />
  )
}

export default Signin