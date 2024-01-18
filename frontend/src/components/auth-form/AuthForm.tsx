import { FC, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { IAuthInput } from '../../types/types';
import Container from '../container/Container';
import './auth-form.scss';

interface IAuthFormProps {
  title: string;
  inputs: IAuthInput[];
  buttonText: string;
  questionText: string;
  linkText: string;
  link: string;
  handleSubmit: (({ }: any) => void);
  apiError: string;
  isFormLoading: boolean;
  passwordCheck: boolean;
}

const AuthForm: FC<IAuthFormProps> = ({ title, inputs, buttonText, questionText, linkText, link, handleSubmit, apiError, isFormLoading, passwordCheck }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation({ passwordCheck });

  const handleForm: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(values);
  }

  return (
    <div className='auth'>
      <Container newClass='auth__container'>
        <h1 className='auth__title'>{title}</h1>
        <form className='auth__form' onSubmit={handleForm}>
          {inputs.map((input, i) => (
            <fieldset key={i} className="auth__row">
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                className='auth__input'
                onChange={handleChange}
                value={values[input.name] || ''}
                required
                placeholder={input.nameText}
                {...input.options}
              />
              {errors[input.name] && <span className="auth__error">{errors[input.name]}</span>}
            </fieldset>
          ))}
          {apiError && <p className='auth__api-error'>{apiError}</p>}
          <button className={`auth__btn${!isValid || isFormLoading ? ' auth__btn_disabled' : ''}`} type="submit" disabled={!isValid || isFormLoading}>{isFormLoading ? 'Загрузка...' : buttonText}</button>
        </form>
        <div className='auth__subtext'>
          <p className='auth__subtext-question'>{questionText}</p>
          <Link className='auth__subtext-link' to={link}>{linkText}</Link>
          <Link className='auth__subtext-to-main' to='/items'>На главную</Link>
        </div>
      </Container>
    </div>
  );
}

export default AuthForm;
