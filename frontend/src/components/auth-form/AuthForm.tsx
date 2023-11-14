import { Link } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { FC, FormEventHandler, useEffect } from 'react';
import { IAuthInput } from '../../types/types';

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
}

const AuthForm: FC<IAuthFormProps> = ({ title, inputs, buttonText, questionText, linkText, link, handleSubmit, apiError, isFormLoading, }) => {
  const { resetForm, values, handleChange, errors, isValid } = useFormAndValidation();

  const handleForm: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(values);
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className='auth'>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form' onSubmit={handleForm}>
        {inputs.map((input, i) => (
          <fieldset key={i} className="auth__row">
            <p className='auth__input-name'>{input.nameText}</p>
            <input
              type={input.type}
              name={input.name}
              id={input.name}
              className='auth_input'
              onChange={handleChange}
              value={values[input.name] || ''}
              required
              {...input.options}
            />
            {errors[input.name] && <span className="auth__error">{errors[input.name]}</span>}
          </fieldset>
        ))}
        {apiError && <p className='auth__api-error'>{apiError}</p>}
        <button className={`auth__btn${!isValid || isFormLoading ? ' auth__btn_disabled' : ''}`} type="submit" disabled={!isValid || isFormLoading}>{isFormLoading ? 'Загрузка...' : buttonText}</button>
      </form>
      <div className='auth__subtext'>
        <p className='auth__question'>{questionText}</p>
        <Link className='auth__link' to={link}>{linkText}</Link>
      </div>
    </div>
  );
}

export default AuthForm;
