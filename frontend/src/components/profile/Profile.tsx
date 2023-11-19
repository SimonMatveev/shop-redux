import { FC, FormEvent, useState, useEffect } from 'react'
import Container from '../container/Container'
import './profile.scss'
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { useGetCurrentUserQuery, useSignOutMutation, useUpdateUserMutation } from '../../store/api/users.storeApi';
import { REG_EXP_EMAIL, REG_EXP_NAME, REG_EXP_PASSWORD } from '../../utils/constants';
import { useDispatch } from 'react-redux';

const Profile: FC = () => {
  const [isEditing, setEditing] = useState(false);
  const { resetForm, values, handleChange, errors, isValid, setErrors, setIsValid } = useFormAndValidation();
  const { data } = useGetCurrentUserQuery(null, {});
  const [updateUser, { error: serverError, isSuccess: isSubmitSuccess }] = useUpdateUserMutation();
  const [signOut] = useSignOutMutation();

  const getDataForSubmit = () => {
    const res: { [key: string]: string } = {};
    if (values.name !== data?.name && values.name !== '') res.name = values.name;
    if (values.email !== data?.email && values.email !== '') res.email = values.email;
    if (values.password !== '') res.password = values.password;
    return res;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser(getDataForSubmit());
  }

  const handleSignOut = () => {
    signOut(null);
  }

  useEffect(() => {
    resetForm({
      name: data?.name,
      email: data?.email,
      password: '',
      password_2: '',
    }, {}, true)
  }, [isEditing, data])

  useEffect(() => {
    if (isSubmitSuccess) setEditing(false)
  }, [isSubmitSuccess])

  useEffect(() => {
    if (values.password !== values.password_2) {
      setIsValid(false);
      if (values.password_2 !== '') {
        setErrors(prev => {
          return {
            ...prev,
            password_2: 'Пароли должны совпадать'
          }
        })
      } else {
        setErrors(prev => {
          return {
            ...prev,
            password_2: ''
          }
        })
      }
    }
  }, [values])

  return (
    <section className='profile'>
      <Container newClass='profile__container'>
        <h1 className='profile__greeting'>Ваши данные</h1>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <label className='profile__label' htmlFor='name'>Имя</label>
            <input
              className='profile__input'
              type='text' name='name' id='name'
              placeholder='Имя' disabled={!isEditing}
              value={values.name || ''} onChange={handleChange}
              pattern={REG_EXP_NAME}
              minLength={2} maxLength={30}
              autoComplete='username' />
            {errors.name && <p className='profile__error'>{errors.name}</p>}
          </fieldset>
          <fieldset className='profile__fieldset'>
            <label className='profile__label' htmlFor='email'>Email</label>
            <input
              className='profile__input'
              type='email' name='email' id='email'
              placeholder='Email' disabled={!isEditing}
              value={values.email || ''} onChange={handleChange}
              pattern={REG_EXP_EMAIL}
              autoComplete='email' />
            {errors.email && <p className='profile__error'>{errors.email}</p>}
          </fieldset>
          {isEditing && <fieldset className='profile__fieldset'>
            <label className='profile__label' htmlFor='password'>Новый пароль</label>
            <input
              className='profile__input'
              type='password' name='password' id='password'
              placeholder='Пароль'
              pattern={REG_EXP_PASSWORD}
              onChange={handleChange}
              value={values.password || ''}
              minLength={2} maxLength={30}
              autoComplete='new-password' />
            {errors.password && <p className='profile__error profile__error_second'>{errors.password}</p>}
            <input
              className='profile__input'
              type='password' name='password_2' id='password_2'
              placeholder='Введите пароль повторно'
              onChange={handleChange}
              value={values.password_2 || ''}
              autoComplete='new-password' />
            {errors.password_2 && <p className='profile__error'>{errors.password_2}</p>}
          </fieldset>}
          {serverError && <p className='profile__error-api'>{serverError as string}</p>}
          {isEditing &&
            <>
              <button type='submit' className='profile__submit' onClick={handleSubmit} disabled={!isValid}>Сохранить изменения</button>
              <button type='button' className='profile__cancel' onClick={() => setEditing(false)} >Отмена</button>
            </>
          }
        </form>
        {!isEditing && <button type='button' className='profile__edit' onClick={() => setEditing(true)} onSubmit={handleSubmit}>Редактировать</button>}
        <button type='button' className='profile__exit' onClick={handleSignOut} >Выйти из аккаунта</button>
      </Container>
    </section>
  )
}

export default Profile
